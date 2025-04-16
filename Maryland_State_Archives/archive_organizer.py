import os
import re
import shutil

# Directory containing the downloaded PDFs
download_dir = './maryland_pensions'

# Patter to extract prefix like msa_sc4126_202
pattern = re.compile(r'^(msa_sc4126_\d+)-\d{4}\.pdf$', re.IGNORECASE)

# Go throught files in the directory
for filename in os.listdir(download_dir):
    if filename.lower().endswith('.pdf'):
        match = pattern.match(filename)
        if match:
            prefix = match.group(1)
            subfolder_path = os.path.join(download_dir, prefix)
            os.makedirs(subfolder_path, exist_ok=True)

            src_path = os.path.join(download_dir, filename)
            dest_path = os.path.join(subfolder_path, filename)

            # Move file


            print(f"Moving {filename} → {prefix}/")
            shutil.move(src_path, dest_path)

print("Organization complete.")