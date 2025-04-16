using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SC_MainMenu : MonoBehaviour
{

    public GameObject MainMenu;
    public GameObject CreditsMenu;

    // Start is called before the first frame update
    void Start()
    {
        MainMenuButton();
    }

    public void PlayNowButton()
    {
        UnityEngine.SceneManagement.SceneManager.LoadScene("MiniGame");
        }

        public void CreditsButton()
        {
            // Show Credits menu
            MainMenu.SetActive(false);
            CreditsMenu.SetActive(true);
        }

        public void MainMenuButton()
        {
            // Show Main menu
            MainMenu.SetActive(true);
            CreditsMenu.SetActive(false);
        }

        public void ExitButton()
        {
            // Quit Game
            Application.Quit();
        }

          public void LevelSelectButton()
        {
            UnityEngine.SceneManagement.SceneManager.LoadScene("LevelSelection");
        }
    
    }

