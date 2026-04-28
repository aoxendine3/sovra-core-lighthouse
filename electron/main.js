import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#020617',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startURL = isDev
    ? 'http://localhost:3000/command'
    : `file://${path.join(__dirname, '../out/command.html')}`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
