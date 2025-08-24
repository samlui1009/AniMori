"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("dbFunctions", {
  // ping: () => "pong",
  addNewAnime: (anime) => ipcRenderer.invoke("addNewAnime", anime),
  updateAnimeField: (field, value, malId) => ipcRenderer.invoke("updateAnimeField", field, value, malId),
  deleteAnime: (malId) => ipcRenderer.invoke("deleteAnime", malId),
  getTotalAverageRating: () => ipcRenderer.invoke("getTotalAverageRating"),
  getTotalAnimeCount: () => ipcRenderer.invoke("getTotalAnimeCount"),
  getTotalCountByStatus: (status) => ipcRenderer.invoke("getTotalCountByStatus", status),
  getAnimeLeanDataByStatus: (status) => ipcRenderer.invoke("getAnimeLeanDataByStatus", status)
});
