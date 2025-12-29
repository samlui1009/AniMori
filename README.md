# AniMori - Your One-Stop Desktop Anime Tracker
AniMori (アニ森) is a cross-platform desktop application that serves as a Japanese animation tracker. Once officially complete and deployed, I hope that this can serve as an aesthetic and cozy app for global anime watchers to use.

<p align="center">
<img src="https://github.com/samlui1009/AniMori/blob/main/Project%20Images%20for%20README.md/StartPage_DarkMode.png" width="400" height="400">
</p>

## Inspiration behind Project
As an avid Japanese animation fan, I have relied on external websites (I.e., MyAnimeList) to keep track of shows that I've been following. However, I often found that many of these platforms lacked the personal functionalities that I would've liked to have included, such as writing personal comments, giving a show ratings (Out of 5 stars) or flagging shows as S-Tier for the most top-rated and beloved.

As such, I then came up with the idea to prototype a personal application for my own usage that could not only track interesting anime shows based off watch status (Currently Watching, Watched, S-Tiers, Dropped, To Be Watched). Given that there are unofficial APIs that can also fetch back show metadata from a popular anime social networking and cataloging website, MyAnimeList, I aimed to integrate this to reduce manual data entry and typing from the end-users' side so that they can automatically search for shows using the designated API, and add them into their designated libraries.

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
    <p>Finally, no anime tracking application would be complete without an S-Tier shelf. S-Tiers are noted in gaming and media ranks as "Superior, "Super" or "Special", which represents the absolute best. It originates from Japanese grading systems where S's had surpassed A's. Of course, this is subjective for every user. In this application, the S-Tier shelf cannot be edited; its general usage is for display only. Any shows that were added to the library under their designated watch statuses can be updated with a checkmark in the S-Tier checkbox. Once that is checked, the show will then be displayed in the S-Tier shelf. As an aside, the S-Tier shows will all be presented with a badge of honour overlaying the anime cover art.</p>
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
    <p>Other React libraries, such as <b>React-Icons</b>, <b>Sweet-Alert2</b> and <b>React-Router-Dom</b> were previously employed for prior projects. All relevant links and references can be found below in the Resources/References section.</p>
</ul>

## Future Improvements
<ul>
  <li>Anime Library Search Bar: I hope to include a search bar for each watch status library, allowing users to quickly sift through and find their target anime without having to scroll through the entire library. This feature is coming soon!</li>
</ul>

## Self-Reflections & Learnings 

#### Electron.js, ContextBridge, IPC
<p>In an Electron application, a single main process <b>(main.js)</b> acts as the application’s entry point and is responsible for managing the apps' lifecycle, including startup, window creation, and shutdown. The main process runs in a full Node.js environment, which allows it to perform system-level operations (I.e., file access, database interactions etc). We can view it like a local backend.</p>

<p>Each application window runs in its own renderer process <b>(renderer.js)</b>, which is responsible for rendering the UI and handling user interactions. Renderer processes are isolated from direct access to Node.js APIs in order to reduce security risks. Similarly, we can view this as the client-facing side of applications</p>

<p>Because the main and renderer processes are segregated into 2 separate components, <b>Inter-Process Communication (IPC)</b> is required to enable data exchange and secure communication between them. In AniMori, this communication is facilitated through a preload script <b>(preload.js)</b>, which executes before any renderer code is loaded.</p>

<p>In <b>renderer.js</b>, we use ipcRenderer to send requests to the main process. Subsequently, in <b>main.js</b>, it utilizes ipcMain to listen for, handle and process incoming requests. To enable secure communication between both ends, the <b>preload.js</b> script then uses Electron's ContextBridge API to expose IPC-based function to <b>renderer.js</b> without giving it unrestricted access to Node.js.</p>

#### React (useEffect, useState, "Lifting States" into Parent Components, Props)
<p>I learnt a lot about React when developing this project!</p>

##### useEffect vs. useState 
<p>One of the main benefits of using the React framework is its usage of React hooks. Hooks are defined as special functions that allow developers to write functional components, rather than class-based components. Hooks can be identified easily as they typically start off with the word, "use". While there are a multitude of hooks to use, the most commonly-used hooks that were utilized for building AniMori were useState and useEffect.</p>

##### useState
<p>useState is a React hook, permitting the creation of a stateful variable AND a setter function to update the value of the variable within the virtual DOM. If there are any changes made to the stateful variable, the setter function can be used and passed in with an updated value. This new value will trigger a new render of the virtual DOM.</p>
<p>Initial states can also be applied to the hook. Here, I often utilized null or empty Strings ("").</p>

##### useEffect
<p>useEffect is also a React hook that tells React to execute some code either:  1) When a component re-renders, 2) When a component mounts (Create and append a component to the DOM) or 3) When the state of a value changes.</p>
<p>Depending on which scenario you'd like to execute, how you write the useEffect code also differs. The examples are listed below, as taken from Bro Code's online tutorial. The usage of this hook is integral, as it can improve overall readability and modularity of your code.</p>
<br>
<ol>
  <li>Scenario 1 (Re-rendering a component): useEffect(() => {})</li>
  <li>Scenario 2 (Code runs ONLY on mount): useEffect(() => {},[])</li>
  <li>Scenario 3 (Code runs on mount AND when the value changes): useEffect(() => {},[value]) - Note: You can add multiple values into your dependency array!</li>
</ol>
<br>

##### Lifting States and Passing Down "Props" 
<p>While React components can typically handle their own data with their designated states, if 2+ sibling components need to share the same data, it is best practice to have the state lifted up to their closest common ancestor component. This way, the ancestor can manage the state, passing it and its corresponding setter functions that updates the state down to the children components as "props" instead. This is beneficial as it allows multiple components to share a single source of truth, permitting easier debugging.</p>

<p>For example, in AniMori, the parent component (The different watch status pages) passes down shelfItems to the AnimeShelf component as props, and also passes the setter, setShelfItems so the child and related sibling components can trigger updates.</p>

##### Using SQLite and Writing SQL Queries
<p>A challenge I encountered when creating AniMori was re-learning SQL and how the queries can be utilized in reusable functions to be called in preload.js. While it was easy to get re-acquainted with the SQL syntax, there were still some new keywords that I was not aware of. For example, in my databaseManager.js file, I gained a clearer understanding of what prepare, get, all and run mean.</p>

<br>

<ol>
  <li><b>Prepare()</b>:  Compiles each SQL query written</li>
  <li><b>Get()</b>:  Returns a SINGLE-ROW result</li>
  <li><b>All()</b>:  Returns MULTIPLE rows</li>
  <li><b>Run()</b>:  Utilized for database mutations (Insertions, updates, deletions)</li>
</ol>

<br>

<p>All database operations are then exported into preload.js, which is exposed to main.js and renderer.js through the ContextBridge as mentioned above.</p>

#### React-Router-Dom (HashRouter vs. BrowserRouter)
<p>In previously designed applications featured on my GitHub, I made use of <b>React-Router-Dom</b>. This is a common library that is employed for routing purposes in React-based applications, permitting for navigiation between different components and pages without requiring a full page reload.</p>
<p>Prior to developing AniMori, I used <b>BrowserRouter</b> for my web applications. Simply put, it uses the HTML5history API to keep the UI in sync with the URL, delivering a clean URL and a clean re-route to the target page without having to reload/refresh the entire page itself. However, in this specific instance, <b>HashRouter</b> appeared to be the optimal solution, due to the fact that it is designed for file-based environments (I.e., Electron applications).</p>

#### Styling (Dark vs. Light Mode with data-theme; Keyframes)

<p>Keyframes, when applied in CSS3, help control steps for animation sequences. I learnt that when applying keyframe attributes in CSS files, 0% implies the "beginning" of the animation, and 100% implies the completion of the animation. Here, I primarily used keyframes to animate the hover animations for the header container, which contained the watch status name and a unique tagline. In CSS, the <b>transform</b> property allows the developer to apply 2D/3D transformations to their designated elements/components. For example, I used translateY to move the component vertically along the Y-axis. The <b>animation</b> property is a shorthand property for name, duration, timing property and more. For example, by applying the value of "infinite", this ensures the animation loops infinitely. Applying the value of "linear" also ensures that the animation progresses at a constant speed, without speeding up or slowing down.</p>
<p><b>data-theme</b> is a custom HTML attribute utilized in CSS, most commonly used to apply different stylistic themes to a web application. Here, I used it to create the contrasting light and dark modes. The dark/light mode toggle is done by updating the value of the data-theme attribute using setAttribute. 
<p>Then, theme-specific values are defined using CSS variables. For example, in my Pages.css, I define default "light-mode" styles (I.e., border color) with <b>var</b>. Then, when the data-theme attribute changes to that of dark mode, a different value is applied, allowing the same components to automatically update their appearance for light or dark mode.</p>
<p>This is a much more methodical approach that improves both maintainability and scalability, ensuring that visual changes can be made by updating a single variable definition rather than modifying style values across multiple components.</p>

### General Troubleshooting Learnings
#### better-sqlite3 and Electron.js Node ABI (Application Binary Interface) Incompatibility
<p>The most challenging aspect of developing AniMori was an issue I encountered was choosing and troubleshooting database errors. Firstly, when starting development for this application, I wanted to find a lightweight database that could deliver high performance with local, medium-sized datasets. The ideal solution was SQLite.</p> 

<p><b>better-sqlite3</b> is a Node.js-compatible library that allows the developer to easily work and integrate an <b>SQLite</b> database into their applications. However, upon installation and attempting to start the application, I experienced an error where the application was no longer running, stating that the database failed to initialize.</p>

<p>Fortunately, the error message provided a lot of insights on what the potential issue was. StackOverflow and Reddit posts were also found, indiciating similar issues that stemmed from an Application Binary Interface (ABI) incompatibilitybetween better-sqlite3 and Electron. To briefly explain, <b>better-sqlite3</b> was built with part JavaScript, and part compiled C++. The compiled C++ section requests a very specific environment type, defined by factors including the Node.js version, Electron version, OS and CPU architecture: all of which interplay to become ABI.</p>

<p>Electron applications bundle their own Node.js version. Therefore, any native modules compiled against the system Node.js version will not load unless they're rebuilt specifically for Electron. The solution to this was to simply use electron-rebuild, which recompiles native Node modules with Electron's ABI, ensuring that they match with Electron's instead of our OS systems' node.</p>

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
    <li>https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron</li>
    <li>https://stackoverflow.com/questions/51974369/what-is-the-difference-between-hashrouter-and-browserrouter-in-react</li>
    <li>https://www.dhiwise.com/post/browserrouter-vs-hashrouter-a-comprehensive-guide (Discusses the difference between HashRouter and BrowserRouter)</li>
    <li>https://longnguyenengineer.medium.com/browserrouter-vs-hashrouter-in-react-which-one-should-you-use-and-why-96e33e8d8ec1</li>
</ol>

#### SQLite3
<ol>
  <li>https://www.npmjs.com/package/better-sqlite3</li>
  <li>https://github.com/WiseLibs/better-sqlite3</li>
  <li>https://www.youtube.com/watch?v=nMvjcBTFlPA</li>
  <li>https://www.youtube.com/watch?v=IooIXYf0PIo</li>
  <li>https://www.youtube.com/watch?v=nMvjcBTFlPA</li>
  <li>https://sqlite.org/</li>
  <li>https://dev.to/arindam1997007/a-step-by-step-guide-to-integrating-better-sqlite3-with-electron-js-app-using-create-react-app-3k16</li>
  <li>https://dev.to/lovestaco/understanding-better-sqlite3-the-fastest-sqlite-library-for-nodejs-4n8</li>
<li>https://www.reddit.com/r/electronjs/comments/1dwukgy/electron_bettersqlite3_in_an_older_project_node/#:~:text=For%20those%20wandering%20across%20this,re%20using%20the%20Electron%20runtime (Troubleshooting ABI incompatibility)</li>
</ol>

#### React Components (HTML5, CSS3)
<ol>
    <li>https://www.youtube.com/watch?v=sy-rRtT84CQ (Dark & Light Mode Tutorial)</li>
    <li>https://www.youtube.com/watch?v=BmhU_MoxNqQ (Creating the 5-star rating bar)</li>
    <li>https://www.youtube.com/watch?v=SpDG283b4bw</li>
    <li>https://www.w3schools.com/cssref/atrule_keyframes.php</li>
    <li>https://www.w3schools.com/cssref/css3_pr_animation.php</li>
    <li>https://www.youtube.com/watch?v=HKlbVheOx4k (Understanding state-lifting)</li>
    <li>https://www.youtube.com/watch?v=L-1sP3Ljhsg</li>
    <li>https://www.youtube.com/watch?v=MY6ZZIn93V8 (Creating a search bar for filtering purposes)</li>
</ol>

#### Jikan Troubleshooting
<ol>
    <li>https://docs.api.jikan.moe/</li>
    <li>https://medium.com/@tarimbilal4/build-a-stunning-anime-dashboard-with-reactjs-using-jikan-api-tailwindcss-firebase-and-chart-js-a2750437f903</li>
    <li>https://dev.to/hr21don/build-your-own-anime-search-app-using-jikan-api-4n79</li> 
</ol>
