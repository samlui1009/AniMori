# AniMori - Your One-Stop Desktop Anime Tracker
AniMori (アニ森) is a cross-platform desktop application that serves as a Japanese animation tracker. Once officially complete and deployed, I hope that this can serve as an aesthetic and cozy app for global anime watchers to use.

## Inspiration for Project
As an avid Japanese animation fan, I have relied on external websites to keep track of shows that I've been following. However, I often found that many of these platforms lacked the personal functionalities that I would've liked to have included, such as personal comments, ratings (Out of 5 stars) or S-Tier flags for the top-rated.

As such, I then came up with the idea to prototype a personal application for my own usage that could not only track interesting anime shows based off watch status (Currently Watching, Watched, S-Tiers, Dropped, To Be Watched). Given that there are unofficial APIs (More specifically, the Jikan API) that can also fetch back show metadata from a popular anime social networking and cataloging website, MyAnimeList, I aimed to integrate this to reduce manual data entry and typing from the end-users' side so that they can automatically search for shows using the designated API, and add them into their designated libraries.

## Project Structure
This project was built entirely on Electron.js, bundled with React and Vite. The benefits of utilizing Electron.js is that it permits the creation of a "bundled" application without requiring cloud deployment. Electron.js projects typically have the following:

<ol>
  <li>main.js - The applications' main entry point, which operates and runs on a Node.js environment. Its responsibility is to create and manage the browser window that the application will be displayed on. It is also used to access the file system, making it suitable for tasks such as executing database queries.</li>
  <li>renderer.js - The frontend/client-facing side, which runs on the browser environment to handle the user interface. renderer.js does not have access to Node APIs. As such, it communicates through the Inter-Process Communication (IPC) channel that helps process requests, and sends data back and forth between backend and frontend.</li>
</ol>

## Tech Stack
The tech stack utilized was as follows:

<ol>
  <li>Electron.js
  <p></p></li>
  <li>React
  <p>React is a reusable, component-based JavaScript library, often utilized for the rapid development of user interfaces, especially in web applications. Due to its component-based architecture, this means every single component utilized in the project can manage its own state, thus making the codebase more modular and reusable.</p></li>
  <li>Vite
  <p>Vite is a fast development and build tool for web development. Due to its compatibility with React, fast development server start-up, simple configuration and efficient performance, Vite enhances the web development process.</p></li>
  <li>SQLite
  <p>SQLite is a lightweight and serverless relational database management system that permits storage of an entire database in a single file. As my application is designed as an offline-first application, SQLite was the ideal choice as it didn't require a server to be set-up, and works across different OS. Furthermore, better-sqlite3 - a Node.js library - was also used to ease the integration of SQLite into Electron applications. By permitting the execution of SQL queries directly in JavaScript, it provides fast, synchronous API for SQL queries directly from main.js, making it easy to integrate with IPC calls from renderer.js.</p></li>
  <li>Jikan (External API):
  <p>The Jikan REST API is an unofficial API that scrapes metadata directly from MyAnimeList (MAL). By using standard HTTP methods, it can retrieve data in JSON format that can be subsequently utilized in personal projects.</p>
  </li>
</ol>

## Features

## Self-Reflections & Learnings 

## References
#### Electron.js 
<ol>
  <li>https://www.npmjs.com/package/better-sqlite3</li>
</ol>


## Installation Instructions

## Development 

## Build
