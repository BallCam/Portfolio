import requests
from bs4 import BeautifulSoup
import os
import time
import re
from urllib.parse import urljoin
from tqdm import tqdm
import traceback

# Directory to store downloads
download_dir = './maryland_pensions'
os.makedirs(download_dir, exist_ok=True)

# Sanitize file names for saving
def sanitize_filename(filename):
    return re.sub(r'[^A-Za-z0-9_\-\.]+', '_', filename)

# Decide whether a file should be downloaded (updated version)
def should_download(file_path):
    base_filename = os.path.basename(file_path)

    # Check root and all subdirectories
    for root, dirs, files in os.walk(download_dir):
        if base_filename in files:
            return False
    return True

# Check if URL is valid
def is_url_valid(url):
    try:
        resp = requests.head(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=30)
        return resp.status_code == 200
    except Exception as e:
        print(f"Error checking URL {url}: {e}")
        return False

# Download a file with retries and logging
def download_file(file_url, file_path):
    for attempt in range(3):
        try:
            print(f"Downloading: {file_url}")
            resp = requests.get(file_url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=30)
            if resp.status_code == 200:
                with open(file_path, 'wb') as f:
                    f.write(resp.content)
                print(f"Saved to {file_path}")
                return True
            else:
                print(f"Error: Received status code {resp.status_code} for {file_url}")
        except Exception as e:
            print(f"Error downloading {file_url}: {e}")
            traceback.print_exc()
        time.sleep(3)
    print(f"Failed to download after retries: {file_url}")
    return False

# Recursively extract and download files from HTML pages
def crawl_and_download(url, visited):
    if url in visited:
        return
    visited.add(url)

    print(f"Scraping HTML page: {url}")
    try:
        resp = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=30)
        soup = BeautifulSoup(resp.content, 'html.parser')

        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            full_url = urljoin(url, href)

            if full_url in visited:
                continue

            if href.endswith('.pdf') or href.endswith('.gif'):
                filename = sanitize_filename(full_url.split('/')[-1])
                file_path = os.path.join(download_dir, filename)
                if should_download(file_path):
                    download_file(full_url, file_path)
                else:
                    print(f"Already downloaded: {file_path}")

            elif href.endswith('.html') and 'msa_sc4126' in full_url:
                crawl_and_download(full_url, visited)  # Recurse into next page

    except Exception as e:
        print(f"Error processing HTML page {url}: {e}")
        traceback.print_exc()

# Starting points (index/listing pages)
known_starting_urls = [
    "https://mdhistory.msa.maryland.gov/msa_sc4126/msa_sc4126_02/html/msa_sc4126_19-0001.html",
    "https://mdhistory.msa.maryland.gov/msa_sc4126/msa_sc4126_13/html/msa_sc4126_226-0001.html",
    "https://mdhistory.msa.maryland.gov/msa_sc4126/msa_sc4126_17/html/msa_sc4126_325-0001.html",
    "https://mdhistory.msa.maryland.gov/msa_sc4126/msa_sc4126_21/html/msa_sc4126_439-0001.html",
    "https://mdhistory.msa.maryland.gov/msa_sc4126/msa_sc4126_25/html/msa_sc4126_527-0001.html",
]

visited_pages = set()

print("\nStarting recursive crawl through known URLs...")
for start_url in known_starting_urls:
    crawl_and_download(start_url, visited_pages)

print("\nDownload complete.")
