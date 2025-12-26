# AniMori - Your One-Stop Desktop Anime Tracker
AniMori (アニ森) is a cross-platform desktop application that serves as a Japanese animation tracker. Once officially complete and deployed, I hope that this can serve as an aesthetic and cozy app for global anime watchers to use.

<p align="center">
<img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/StartPage_DarkMode.png" width="400" height="400">
</p>

## Inspiration behind Project
As an avid Japanese animation fan, I have relied on external websites (I.e., MyAnimeList) to keep track of shows that I've been following. However, I often found that many of these platforms lacked the personal functionalities that I would've liked to have included, such as writing personal comments, giving a show ratings (Out of 5 stars) or flagging shows as S-Tier for the most top-rated and beloved.

As such, I then came up with the idea to prototype a personal application for my own usage that could not only track interesting anime shows based off watch status (Currently Watching, Watched, S-Tiers, Dropped, To Be Watched). Given that there are unofficial APIs, such as the Jikan API, that can also fetch back show metadata from a popular anime social networking and cataloging website, MyAnimeList, I aimed to integrate this to reduce manual data entry and typing from the end-users' side so that they can automatically search for shows using the designated API, and add them into their designated libraries.

## Project Structure
This project was built entirely on Electron.js, bundled with React and Vite, with a working SQLite database. The benefits of utilizing Electron.js is that it permits the creation of a "bundled" application without requiring cloud deployment. Electron.js projects typically have the following:

<ol>
  <li><b>main.js</b> - The applications' main entry point, which operates and runs on a Node.js environment. Its responsibility is to create and manage the browser window that the application will be displayed on. It is also used to access the file system, making it suitable for tasks such as executing database queries.</li>
  <li><b>renderer.js</b> - The frontend/client-facing side, which runs on the browser environment to handle the user interface. renderer.js does not have access to Node APIs. As such, it communicates through the Inter-Process Communication (IPC) channel that helps process requests, and sends data back and forth between backend and frontend.</li>
</ol>

## Tech Stack
The tech stack utilized was as follows:

<ol>
  <li><b>Electron.js</b>
  <p>As discussed above, Electron.js is an open-source frameowk tailored for the development of desktop applications using JavaScript, HTML and CSS - cross-compatible with different operating systems (Windows, Linux, MacOS). </p>
  </li>
  <li><b>React</b>
  <p>React is a reusable, component-based JavaScript library, often utilized for the rapid development of user interfaces, especially in web applications. Due to its component-based architecture, this means every single component utilized in the project can manage its own state, thus making the codebase more modular and reusable.</p></li>
  <li><b>Vite</b>
  <p>Vite is a fast development and build tool for web development. Due to its compatibility with React, fast development server start-up, simple configuration steps and efficient performance, Vite enhances the overall web development process.</p></li>
  <li><b>SQLite</b>
  <p>SQLite is a lightweight and serverless relational database management system that permits storage of an entire database in a single file. As my application is designed as an offline-first application, SQLite was the ideal choice as it didn't require a server to be set-up, and works across different OS. Furthermore, better-sqlite3 - a Node.js library - was also used to ease the integration of SQLite into Electron applications. By permitting the execution of SQL queries directly in JavaScript, it provides fast, synchronous API for SQL queries directly from main.js, making it easy to integrate with IPC calls from renderer.js.</p></li>
  <li><b>Jikan (External API)</b>:
  <p>The Jikan REST API is an unofficial API that scrapes metadata directly from MyAnimeList (MAL). By using standard HTTP methods, it can retrieve data in JSON format that can be subsequently utilized in personal projects.</p>
  </li>
</ol>

## Features

<ul>
    <li><b>User Statistics</b>
        <p>The home page showcases the current users' watch statistics. It pulls information from the database, including the total number of watched shows, currently watching shows and dropped shows, respectively. It also gives the user information on the users' overall average rating for all shows that have been registered into the database.</p>
        <p align="center">
<img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/StatsPage.png" width="400" height="400">
        </p>
    </li>

  <li><b>Watch Status Libraries</b>
    <p>Clicking into either watch categories from the User Statistics home page will navigate to a library shelf of anime with their respective watch status. As an example, the image below displays the shows that are categorized as To Be Watched. The shelf starts off with an initial state of being closed, but can be opened by clicking the Open Library button. As noted, you can see the anime show cover picture, followed by their titles.</p>
    <p align="center">
      <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/ExampleWatchStatus_ClosedLibrary.png" width="400" height="400">
      <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/ExampleWatchStatus_OpenLibrary.png" width="400" height="400">
    </p>
  </li>

  <li><b>MyAnimeList Search Bar</b>
    <p>To the left of each watch status library page, you will also find a search bar. Through the Jikan API, it can then search MyAnimeList for the relevant show. For simplicity sake, the request currently returns the FIRST result, rather than an entire array of TV shows with similar names/keywords. I hope to improve on this functionality in the future with plans of returning back an entire array of possible results. In the example below, I had typed Frieren into the search bar, which subsequently returned Frieren: Beyond Journey's End Season 1. The search result prompts the user to either add the show into their library with that designated watch status, or exit by clicking the X at the top-right corner.</p>
    <p align="center">
        <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/SearchResult.png" width="400" height="400">
    </p>
  </li>

  <li><b>Show Addition Alerts</b>
    <p>If a show is detected to NOT be a part of the users' database, the user can successfully add the show to their shelf. Through Sweet-Alert2, I was able to create a visible, aesthetic alert that notifies the user of a successful addition. Similarly, if a show HAS been added to the database (Either under the same watch status, or with a different watch status), the user will be met with another visible alert, which informs them that they cannot add the designated show into their database once again. In code, this is programmed using a try-catch block.</p>
    <p align="center">
        <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/Add_Success.png" width="400" height="400">
        <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/Add_DuplicateAlert.png" width="400" height="400">
    </p>
  </li>

  <li><b>Displaying and Editing A Show</b>
    <p>One of the features of this application allows the user to view and edit an added show in their library with personal comments, update the watch status, change the rating (Out of 5) and check if it meets the S-Tier criteria. Displayed below is what clicking into an anime looks like. It brings the user to a panel that showcases any additional details. By default, when a show is added into ones' library, they will NOT have any comments, ratings or be flagged as S-Tier.</p>
    <p align="center">
      <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/ShowDetails.png" width="400" height="400">
    </p>
  <p>Scrolling below, you can then access the possible options for an added show, including: Edit, Delete or Cancel.</p>
    <p align="center">
      <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/ShowDetails_Options.png" width="400" height="400">
    </p>
  <p>By clicking Edit, it will lead the user to an edit form. This prompts the user to add new comments, change the watch status if required, and tick if the show meets S-Tier requirements. By clicking Submit, all the edits will be saved, and re-rendered in the shelf.</p>
  <p align="center">
    <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/EditShowPanel.png" width="400" height="400">
  </p>
  <p>For any shows that a user would like to delete, an alert will also be provided to the user to confirm their decision to permanently delete something from their library.</p>
    <p align="center">
      <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/EditShowPanel_DeleteAlert.png" width="400" height="400">
    </p>
  </li>

  <li><b>S-Tier Achievement Shelf</b>
    <p>Finally, no anime tracking application would be complete without an S-Tier shelf. S-Tiers are noted in gaming and media ranks as "Superior, "Super" or "Special", which represents the absolute best. It originates from Japanese grading systems where an S had surpassed A's. Of course, this is subjective for every user. In this application, the S-Tier shelf cannot be edited; its general usage is for display only. Any shows that were added to the library under their designated watch statuses can be updated with a checkmark in the S-Tier checkbox. Once that is checked, the show will then be displayed in the S-Tier shelf. As an aside, the S-Tier shows will all be presented with a badge of honour overlaying the anime cover art.</p>
  <p align="center">
    <img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/STiers.png" width="400" height="400">
  </p>
  </li>
</ul>

## Relevant Dependencies, Libraries and Modules Used

<ul>
    <li><b>Font-Awesome</b>: An icon library and toolkit that provides vector icons for a multitude of things, including social media, UI elements. It permits easy customization in combination with CSS stylings.</li>
    <li><b>Hamburger-React</b>: A React component library that provides a variety of hamburger menu icons. This was utilized in my application as a Quick Navigation bar (Located on the top-left corner), allowing users to jump between different watch status shelves.</li>
    <li><b>Typewriter-Effect</b>: Allows text to appear character-by-character, simulating the action of a person typing in real-life.</li>
  <br>
    <p>Other React libraries, such as <b>React-Icons</b>, <b>Sweet-Alert2</b> and <b>React-Router-Dom</b> were previously employed for prior projects. All relevant links and references can be found below in the Resources section.</p>
</ul>

## Future Improvements
<ul>
  <li>Anime Library Search Bar: Feature planned and coming soon!</li>
</ul>

## Self-Reflections & Learnings 

#### Electron.js, ContextBridge, IPC

#### React (useEffect, useState, "Lifting States" into Parent Components, Props)

#### React-Router-Dom (HashRouter vs. BrowserRouter)

#### Styling (Dark vs. Light Mode with data-theme; Keyframes)

### General Troubleshooting Learnings
#### better-sqlite3 and Electron.js Node ABI Incompatibility

## Installation Instructions
<p>Coming soon!</p>

## Resources/References

#### Electron.js 
<ol>
  <li>https://www.electronjs.org/</li>
  <li>https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts (For understanding what preload.js does)</li>
  <li>https://www.youtube.com/watch?v=J60XrXk0J1o (For understanding Inter-Process Communication/IPC)</li>
</ol>

#### Libraries & Dependencies
<ol>
    <li>https://sweetalert2.github.io/</li>
    <li>https://react-icons.github.io/react-icons/</li>
    <li>https://fontawesome.com/</li>
    <li>https://hamburger-react.netlify.app/</li>
    <li>https://v5.reactrouter.com/web/guides/quick-start</li>
    <li>https://www.npmjs.com/package/typewriter-effect</li>
</ol>

#### SQLite3
<ol>
  <li>https://www.npmjs.com/package/better-sqlite3</li>
  <li>https://github.com/WiseLibs/better-sqlite3</li>
  <li>https://www.youtube.com/watch?v=nMvjcBTFlPA</li>
  <li>https://dev.to/arindam1997007/a-step-by-step-guide-to-integrating-better-sqlite3-with-electron-js-app-using-create-react-app-3k16</li>
</ol>

#### React Components (HTML5, CSS3)
<ol>
    <li>https://www.youtube.com/watch?v=sy-rRtT84CQ (Dark & Light Mode Tutorial)</li>
    <li>https://www.youtube.com/watch?v=BmhU_MoxNqQ (Creating the 5-star rating bar)</li>
</ol>

#### Jikan Troubleshooting
<ol>
    <li>https://docs.api.jikan.moe/</li>
    <li>https://medium.com/@tarimbilal4/build-a-stunning-anime-dashboard-with-reactjs-using-jikan-api-tailwindcss-firebase-and-chart-js-a2750437f903</li>
    <li>https://dev.to/hr21don/build-your-own-anime-search-app-using-jikan-api-4n79</li> 
</ol>
