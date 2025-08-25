// // See the Electron documentation for details on how to use preload scripts:
// // https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// ContextBridge exposes some APIs in the main.js so that we can interact with it
// It does not expose the ENTIRE thing
// ipcRenderer => A communication methodology from a renderer process to the main process 
// Renderer will be able to communicate with the main process

// If we have a place where the frontend is exposing certain APIs of the OS
// The code is vulnerable to client opening dev tools and modifying function definitions 
// The client can then ping ipcMain in main.js script and do damage
// Can whitelist ipc channels in the preload.js => Basically, if we have a clear 
// path for a client to make modifications using the Dev Console, it can gain access 
// To the main process 
// With access to main.js, they can do harmful things like reading envs, reveal secrets
// Or delete certain files, which we're not supposed to!

const { contextBridge, ipcRenderer } = require('electron');

// Exposing key called "dbFunctions", with all of these functions made available
contextBridge.exposeInMainWorld('dbFunctions', {
    // ping: () => "pong",

    addNewAnime: (anime) =>
        ipcRenderer.invoke("addNewAnime", anime),
    updateAnimeField: (field, value, malId) =>
        ipcRenderer.invoke("updateAnimeField", field, value, malId),
    deleteAnime: (malId) => 
        ipcRenderer.invoke("deleteAnime", malId),
    getTotalAverageRating: () =>
        ipcRenderer.invoke("getTotalAverageRating"),
    getTotalAnimeCount: () =>
        ipcRenderer.invoke("getTotalAnimeCount"),
    getTotalCountByStatus: (status) =>
        ipcRenderer.invoke("getTotalCountByStatus", status),
    getAnimeLeanDataByStatus: (status) => 
        ipcRenderer.invoke("getAnimeLeanDataByStatus", status),
    getAnimeLeanDataBySTier: () => 
        ipcRenderer.invoke("getAnimeLeanDataBySTier")
});

// https://dev.to/arindam1997007/a-step-by-step-guide-to-integrating-better-sqlite3-with-electron-js-app-using-create-react-app-3k16
// IPC start-up for the preload script
// ERROR ENCOUNTERED HERE - Vite, build tool, is trying to bundle better-sqlite3 
// But it can't 