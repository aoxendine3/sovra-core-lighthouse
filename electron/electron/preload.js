import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('jarvis', {
    executeAction: (action) => ipcRenderer.invoke('execute-action', action),
    onLogUpdate: (callback) => {
        ipcRenderer.on('log-update', (_event, log) => callback(log));
    },
    onStatusUpdate: (callback) => {
        ipcRenderer.on('status-update', (_event, status) => callback(status));
    }
});
