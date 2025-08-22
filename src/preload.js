// // See the Electron documentation for details on how to use preload scripts:
// // https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("dbFunctions", {
    // ping: () => "pong",
    updateComments: (newComments, malId) =>
        ipcRenderer.invoke("updateComments", newComments, malId),
    updateStatus: (newStatus, malId) =>
        ipcRenderer.invoke("updatePersonalStatus", newStatus, malId),
    updateSTierStatus: (flag, malId) =>
        ipcRenderer.invoke("updateSTierStatus", flag, malId),
    deleteAnime: (malId) =>
        ipcRenderer.invoke("deleteAnime", malId),
    getSTierAnimeCount: () =>
        ipcRenderer.invoke("getSTierAnimeCount"),
    getWatchedAnimeCount: () => 
        ipcRenderer.invoke("getWatchedAnimeCount"),
    getWatchingAnimeCount: () => 
        ipcRenderer.invoke("getWatchingAnimeCount"),
    getDroppedAnimeCount: () => 
        ipcRenderer.invoke("getDroppedAnimeCount"),
    getTotalAverageRating: () => 
        ipcRenderer.invoke("getTotalAverageRating"),
    getTotalAnimeCount: () =>
        ipcRenderer.invoke("getTotalAnimeCount"),
    returnAllAnimeTitles: () => 
        ipcRenderer.invoke("returnAllAnimeTitles"),
    addNewAnime: (anime) => 
        ipcRenderer.invoke("addNewAnime", anime)
});
// Create an object we expose in the Renderer process
// Ping-Pong testAPI just used for testing

// https://dev.to/arindam1997007/a-step-by-step-guide-to-integrating-better-sqlite3-with-electron-js-app-using-create-react-app-3k16
// IPC start-up for the preload script
// ERROR ENCOUNTERED HERE - Vite, build tool, is trying to bundle better-sqlite3 
// But it can't 