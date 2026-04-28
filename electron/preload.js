"use strict";

// electron/preload.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("jarvis", {
  executeAction: (action) => import_electron.ipcRenderer.invoke("execute-action", action),
  onLogUpdate: (callback) => {
    import_electron.ipcRenderer.on("log-update", (_event, log) => callback(log));
  },
  onStatusUpdate: (callback) => {
    import_electron.ipcRenderer.on("status-update", (_event, status) => callback(status));
  }
});
