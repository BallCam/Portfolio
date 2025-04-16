using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelSelection : MonoBehaviour
{
    public GameObject LevelSelect;

    // Start is called before the first frame update
    void Start()
    {
        
    }

public void Level1Button()
{
    UnityEngine.SceneManagement.SceneManager.LoadScene("MiniGame");
}

public void Level2Button()
{
    UnityEngine.SceneManagement.SceneManager.LoadScene("level2");
}

public void Level3Button()
{
    UnityEngine.SceneManagement.SceneManager.LoadScene("level3");
}

public void Level4Button()
{
    UnityEngine.SceneManagement.SceneManager.LoadScene("level4");
}
public void BackButton()
{
    UnityEngine.SceneManagement.SceneManager.LoadScene("main_menu");
}
}
