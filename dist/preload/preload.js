"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("dbFunctions", {
  // ping: () => "pong",
  updateComments: (newComments, malId) => ipcRenderer.invoke("updateComments", newComments, malId),
  updateStatus: (newStatus, malId) => ipcRenderer.invoke("updatePersonalStatus", newStatus, malId),
  updateSTierStatus: (flag, malId) => ipcRenderer.invoke("updateSTierStatus", flag, malId),
  deleteAnime: (malId) => ipcRenderer.invoke("deleteAnime", malId),
  getSTierAnimeCount: () => ipcRenderer.invoke("getSTierAnimeCount"),
  getWatchedAnimeCount: () => ipcRenderer.invoke("getWatchedAnimeCount"),
  getWatchingAnimeCount: () => ipcRenderer.invoke("getWatchingAnimeCount"),
  getDroppedAnimeCount: () => ipcRenderer.invoke("getDroppedAnimeCount"),
  getTotalAverageRating: () => ipcRenderer.invoke("getTotalAverageRating"),
  getTotalAnimeCount: () => ipcRenderer.invoke("getTotalAnimeCount"),
  returnAllAnimeTitles: () => ipcRenderer.invoke("returnAllAnimeTitles"),
  addNewAnime: (anime) => ipcRenderer.invoke("addNewAnime", anime)
});
