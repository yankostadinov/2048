<a name="readme-top"></a>

<br />

  <h2 align="center">2048</h3>

  <p align="center">
    <a href="https://2048.github.io.">View Demo</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#config">Config</a></li>
  </ol>
</details>



## About The Project

A web implementation of the hit 2048 game where you have to combine tiles until you reach a specific number.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Vite][vite]][vite-url]
* [![chakra-ui][chakra-ui]][chakra-ui-url]
* [Zustand][zustand-url]
* [framer-motion][framer-motion-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Getting Started

To get a local copy up and running follow these simple example steps.


1. Clone the repo
   ```sh
   git clone https://github.com/yankostadinov/2048.github.io
   ```
2. Install NPM packages
   ```sh
   yarn
   ```
3. Build and run the project
   ```sh
   yarn dev
   ```

You should now be able to load the game here: http://127.0.0.1:5173/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Config

Edit *src/config.js* to configure different aspects of the game:
* **size**: The square grid size. Size 6 creates a grid with 6 rows and 6 columns for a total of 36 tiles.
* **obstacles**: Number of obstacles placed on the grid to increase difficulty by blocking the movement of tiles.
* **targetPower**: The power of 2 that you must reach to win the game. A targetPower of 11 means you need to create a tile of value 2048.
* **keyboardShortcutsEnabled**: Disables keyboard arrow shortcuts to move the tiles.
* **powerColors**: Colors for different powers of tiles. Make sure to add more colors if increasing the targetPower.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Yan Kostadinov - yankostadinov@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[chakra-ui]: https://shields.io/badge/chakra--ui?logo=chakraui
[chakra-ui-url]: https://zustand-demo.pmnd.rs/
[vite]: https://img.shields.io/npm/dependency-version/v-image/dev/vite?logo=vite
[vite-url]: https://vitejs.dev/
[zustand-url]: https://zustand-demo.pmnd.rs/
[framer-motion-url]: https://www.framer.com/motion/
