// From YT Tutorial
// This is the Main process - ONLY ONE 
// Serves as application entry point, responsible for controlling the life-cycle
// A Node.js environment, with full OS access => A major security concern though
// The Main process is ALSO isolated, so to communicate with each other - Use IPC!
// Runs ipcMain

// Inter Process Communication => https://www.youtube.com/watch?v=J60XrXk0J1o

// Contains logic for creating the window and handling the lifecycle

import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import AnimeDb from '../db/databaseManager.js';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Adds the anime to the database - Do NOT return anything
ipcMain.handle("addNewAnime", (_event, anime) => {
    AnimeDb.addNewAnime(anime);
});

// ipc Code to handle backend interactions with SQLite database
ipcMain.handle("updateAnimeField", (_event, field, value, malId) => {
    AnimeDb.updateAnimeField(field, value, malId);
})

// Event is an IpcMainInvokeEvent object
// This is an unused parameter
// But if we have parameters after it, then we DO need to add _event

// Deletes the anime from database based off the malId
ipcMain.handle("deleteAnime", (_event, malId) => {
    AnimeDb.deleteAnimeFromDatabase(malId);
})

ipcMain.handle("getTotalCountByStatus", (_event, status) => {
    return AnimeDb.returnAnimeCountGroupedByStatus(status);
    // Forgot the return, lol
})

// Returns total average rating for ALL anime = Required for Stats component
ipcMain.handle("getTotalAverageRating", () => {
    return AnimeDb.returnTotalAverageRating();
})

// Returns the total anime count = Required for Stats component
ipcMain.handle("getTotalAnimeCount", () => {
    return AnimeDb.returnTotalAnimeCount();
})

// Returns Anime Database "lean" data = Required for Shelf component
ipcMain.handle("getAnimeLeanDataByStatus", (_event, personalStatus) => {
    return AnimeDb.returnAnimeLeanDataByStatus(personalStatus);
})

ipcMain.handle("getAnimeLeanDataBySTier", () => {
    return AnimeDb.returnAnimeLeanDataBySTier();
})

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 750,
    height: 750,
    frame: true,
    alwaysOnTop: true,
    // Sets dimensions
    contextIsolation: true,
    // This is set to true by default through documentation
    // 

    // As per Google, this creates a "frameless" window that we'll need to 
    // style accordingly in the renderer.jsx & css
    // When "false", it creates an automatic "rounded" border
    // But then this also eliminates the overall bar 
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),

    //   Also sets a preload script => Joining our window with a file called
    //   preload.js
    //   It serves as a "bridge" b/t Main process and Renderer process
    //   Called preload because it "pre-loads" before any other scripts 
    //   in the Renderer process
      nodeIntegration: true
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
//   mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// SQLite - Best for small desktop applications, lightweight 
// https://www.youtube.com/watch?v=nMvjcBTFlPA