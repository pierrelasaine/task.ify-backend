# task.ify-backend
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Takeoff-Tec/task.ify-backend">
    <img src="https://i.imgur.com/rMdsZcE.png" alt="Logo" width="800" height="300">
  </a>

  <p align="center">
    Task.ify: Streamlining your tasks with AI-curated playlists in a click.
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

The backend of this project is built using Node.js and Express.js, two popular frameworks for building server-side applications in Typescript. It serves as the server-side component responsible for handling incoming requests from clients, processing data, interacting with the database, and sending back appropriate responses.
The backend serves as the backbone of the application, allowing the frontend and other client applications to communicate with the database and external services seamlessly alongside the security provided by the Spotify OAuthentication. It plays a crucial role in providing a reliable and efficient service to users, managing data, and enabling the main features of the application to function smoothly.

Take a Look @ Task.ify: https://taskify-frontendhost-2277661894f3.herokuapp.com/

### Built With

*[![npm](https://img.shields.io/npm/v/task.ifybackend.svg)](https://www.npmjs.com/package/task.ifybackend)

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

<div align="center" style="margin-top: 30px;">
  <a href="https://github.com/Takeoff-Tec/task.ify-backend">
    <img src="https://i.imgur.com/xv7Y678.png" alt="Spotify OAuth Screenshot" width="500" height="500">
  </a>
</div>

<p style="margin-top: 30px;">Spotify OAuth and Redis Implementation</p>
<ul style="text-align:left;">
    <li><strong>Spotify OAuth:</strong> Leveraged to authenticate users, this integration gave us direct access to users' Spotify profiles. This allowed us to craft a personalized experience based on users' musical preferences and listening histories.</li>
    <li><strong>Redis Integration:</strong> Incorporated as our choice of in-memory data structure store, Redis was pivotal in caching user session data. This ensured rapid application interactions, drastically reducing latency during recurring data access operations.</li>
</ul>

<div align="center" style="margin-top: 30px;">
  <a href="https://github.com/Takeoff-Tec/task.ify-backend">
    <img src="https://i.imgur.com/HhA1QIS.png" alt="User Model Sequilize Code Screenshot" width="500" height="500">
  </a>
</div>

<p style="margin-top: 30px;">Sequilize Implementation</p>
<ul style="text-align:left;">
    <li><strong>Object-Relational Mapping (ORM):</strong> Tables were effortlessly defined as objects for each model, enabling a clear representation of our database structure.</li>
    <li><strong>TypeScript Compatibility:</strong> Seamless integration with TypeScript ensured that our models were strongly typed, enhancing code reliability and predictability.</li>
    <li><strong>Relationships Made Easy:</strong> Defining the relationships between tables became intuitive, as evident in the associations between the 'User', 'Playlist', and 'Task' models.</li>
    <li><strong>Simplifying Queries:</strong> Gone are the days of lengthy SQL queries. With Sequelize, common tasks are abstracted into straightforward functions, streamlining database operations.</li>
</ul>

<div align="center" style="margin-top: 30px;">
    <img src="https://i.imgur.com/xFT0mhW.png" alt="Screenshot of playlistRoute code displaying Spotify Playlist Creation" width="500" height="500" style="margin-right:20px;">
    <img src="https://i.imgur.com/J2SpgQK.png" alt="Screenshot of playlistRoute code displaying Spotify Playlist Creation with Tracks" width="500" height="500">
</div>

<p style="margin-top: 30px;">Playlist and Track Creation Process</p>
<ul style="text-align:left;">
    <li><strong>GPT API Response</strong>: The initial response from the GPT API provides crucial information, which includes a suggested playlist name and an array of track details.</li>
    <li><strong>Extraction Process</strong>: From this GPT API response, we extract the recommended playlist name and the associated array of tracks.</li>
    <li><strong>Playlist Creation with Spotify API</strong>: Using the extracted playlist name, we make a request to the Spotify API to create a new playlist directly within the user's Spotify account.</li>
    <li><strong>Mapping Through Tracks</strong>: Post playlist creation, we iterate or map through the provided array of tracks.</li>
    <li><strong>Track Insertion</strong>: For each track in the array, we utilize the Spotify API again to add (or insert) these tracks into the newly created playlist on the user's Spotify account.</li>
</ul>




<!-- ROADMAP -->
## Roadmap

- [x] Spotify OAuthentication API
- [x] OpenAI API Generated Playlist Name and Tracks
- [x] Creation of Playlist with Tracks inserted in Spotify API
- [x] Task CRUD operations
    - [x] Retrieves Spotify Cover

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

Pierre Johnson - [linkedin](https://www.linkedin.com/in/pierrelasaine) - pierrelasaine@gmail.com 

Camila Naranjo - [linkedin](https://www.linkedin.com/in/camilavnaranjo) - camilavnaranjoa@gmail.com 

Maria Fernanda Palacios Martinez - [linkedin](https://www.linkedin.com/in/maria-fernanda-palacios-14998518a?trk=contact-info) - 03fernanda.palacios@gmail.com

## Project Links

Backend Project Link: [https://github.com/Takeoff-Tec/task.ify-backend](https://github.com/Takeoff-Tec/task.ify-backend) 

Frontend Project Link: [https://github.com/Takeoff-Tec/task.ify-frontend](https://github.com/Takeoff-Tec/task.ify-frontend)

Deployed Site Link: https://taskify-frontendhost-2277661894f3.herokuapp.com/




<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [A'shuan Thomas](https://github.com/lasagnamassage)
* [Sammy Au](https://github.com/samau3)
* [Paige Godfrey](https://github.com/paigegodfrey)
* Nilesh Patel (Salesforce Mentor)
* Samuel Paramar (Salesforce Mentor)
* Ryan Warnock (Salesforce Mentor)
* Salesforce FTL Cohort 2023




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

[product-screenshot]: images/screenshot.png
