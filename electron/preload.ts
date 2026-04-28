import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('jarvis', {
  executeAction: (action: string) => ipcRenderer.invoke('execute-action', action),
  onLogUpdate: (callback: (log: string) => void) => {
    ipcRenderer.on('log-update', (_event, log) => callback(log));
  },
  onStatusUpdate: (callback: (status: any) => void) => {
    ipcRenderer.on('status-update', (_event, status) => callback(status));
  }
});
