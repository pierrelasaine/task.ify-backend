# task.ify-backend
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Takeoff-Tec/task.ify-backend">
    <img src="https://imgur.com/a/daJMhLz" alt="Logo" width="100" height="100">
  </a>

  <p align="center">
    Task.ify your new Task manager accompanoed by an ai generated playlist based on your task's vibe
    <br />
</div>



<!-- TABLE OF CONTENTS -->
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
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`



### Built With

* [![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue)](https://expressjs.com/)
* [![typescript](https://img.shields.io/badge/typescript-4.5.4-blue)](https://www.typescriptlang.org/)
* [![PostgreSQL](https://img.shields.io/badge/pg-8.11.1-blue)](https://www.postgresql.org/)
* [![Sequelize](https://img.shields.io/badge/Sequelize-6.32.1-orange)](https://sequelize.org/)
* [![Jest](https://img.shields.io/badge/Jest-29.6.1-critical)](https://jestjs.io/)
* [![supertest](https://img.shields.io/badge/supertest-6.3.3-blue)](https://github.com/visionmedia/supertest)
* [![ts-jest](https://img.shields.io/badge/ts--jest-29.1.1-blue)](https://github.com/kulshekhar/ts-jest)
* [![sequelize-mock](https://img.shields.io/badge/sequelize--mock-0.10.2-brightgreen)](https://github.com/BlinkUX/sequelize-mock)
* [![jest-mock-axios](https://img.shields.io/badge/jest--mock--axios-4.7.2-brightgreen)](https://github.com/knee-cola/jest-mock-axios)
* [![Axios](https://img.shields.io/badge/Axios-0.21.1-blueviolet)](https://github.com/axios/axios)
* [![nodemon](https://img.shields.io/badge/nodemon-3.0.1-red)](https://nodemon.io/)
* [![dotenv](https://img.shields.io/badge/dotenv-16.3.1-brightgreen)](https://github.com/motdotla/dotenv)
* [![cors](https://img.shields.io/badge/cors-2.8.5-brightgreen)](https://github.com/expressjs/cors)
* [![SQLite](https://img.shields.io/badge/sqlite3-5.1.6-lightgrey)](https://www.sqlite.org/)




<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Get a OpenAI API Key at [https://platform.openai.com/docs/api-reference/introduction)
2. Get a Spotify API Key at [https://developer.spotify.com/documentation/web-api)
3. Clone the repo
   ```sh
   git clone https://github.com/Takeoff-Tec/task.ify-backend
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Create and Enter your Open AI API KEY and Spotify Client Secret/ID in `.env`
   ```
   GPT_SECRETKEY = 'ENTER YOUR API';
   CLIENT_ID = 'ENTER YOUR API';
   CLIENT_SECET = 'ENTER YOUR API';
   ```
6. Setup Database and Backend Server URL in `.env`
   ```
   DB_USER = 'ENTER YOUR LOCAL DB USERNAME';
   DB_HOST = 'ENTER YOUR LOCAL DB HOST';
   DB_NAME = 'ENTER YOUR LOCAL DB NAME';
   DB_PASSWORD = 'ENTER YOUR LOCAL DB PASSWORD';
   BACKEND_BASE_URL = 'ENTER YOUR LOCAL SERVER';
   FRONTEND_ASE_URL = 'ENTER YOUR LOCAL FRONTEND HOST';
   ```


<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.




<!-- ROADMAP -->
## Roadmap

- [ ] OpenAI API Generated Playlist Name and Tracks
- [ ] Creation of Playlist with Tracks inserted in Spotify API
- [ ] Task CRUD operations
    - [ ] Retrieves Spotify Cover

See the [open issues](https://github.com/Takeoff-Tec/task.ify-backend/issues) for a full list of proposed features (and known issues).




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Pierre Johnson - [@linkedin handle](https://www.linkedin.com/in/pierrelasaine) - pierrelasaine@gmail.com \n
Camila Naranjo - [@linkedin_handle](https://www.linkedin.com/in/camilavnaranjo) - camilavnaranjoa@gmail.com \n
Maria Fernanda Palacios Martinez - [@linkedin_handle](https://twitter.com/twitter_handle) - email@email_client.com \n

Backend Project Link: [https://github.com/Takeoff-Tec/task.ify-backend](https://github.com/Takeoff-Tec/task.ify-backend) \n
Frontend Project Link: [https://github.com/Takeoff-Tec/task.ify-frontend](https://github.com/Takeoff-Tec/task.ify-frontend)




<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Takeoff-Tec/task.ify-backend.svg?style=for-the-badge
[contributors-url]: https://github.com/Takeoff-Tec/task.ify-backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Takeoff-Tec/task.ify-backend.svg?style=for-the-badge
[forks-url]: https://github.com/Takeoff-Tec/task.ify-backend/network/members
[stars-shield]: https://img.shields.io/github/stars/Takeoff-Tec/task.ify-backend.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/Takeoff-Tec/task.ify-backend.svg?style=for-the-badge
[issues-url]: https://github.com/Takeoff-Tec/task.ify-backend/issues
[license-shield]: https://img.shields.io/github/license/Takeoff-Tec/task.ify-backend.svg?style=for-the-badge
[license-url]: https://github.com/Takeoff-Tec/task.ify-backend/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
