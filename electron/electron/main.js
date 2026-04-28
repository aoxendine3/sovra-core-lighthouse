import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { MaxxExecutive } from '../agency/lib/jarvis/MaxxExecutive';
let mainWindow = null;
let tray = null;
let jarviseExecutive = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'Maxx Sovereign Executive',
        backgroundColor: '#000000',
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        frame: false, // Custom premium frame
        titleBarStyle: 'hiddenInset',
    });
    const url = isDev
        ? 'http://localhost:3000/jarvis'
        : `file://${path.join(__dirname, '../out/app/jarvis/os/index.html')}`;
    mainWindow.loadURL(url);
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
// System-Level Voice IPC
ipcMain.handle('say', async (event, text) => {
    console.log(`[Maxx-Voice] Speaking: ${text}`);
    const { exec } = require('child_process');
    exec(`say "${text}"`);
    return { success: true };
});
function createTray() {
    const iconPath = path.join(__dirname, '../public/favicon.ico');
    const icon = nativeImage.createFromPath(iconPath);
    tray = new Tray(icon.resize({ width: 16, height: 16 }));
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show Maxx', click: () => mainWindow?.show() },
        { type: 'separator' },
        { label: 'Quit', click: () => app.quit() }
    ]);
    tray.setToolTip('Maxx Sovereign Executive');
    tray.setContextMenu(contextMenu);
}
app.on('ready', () => {
    jarviseExecutive = new MaxxExecutive();
    createWindow();
    createTray();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
// IPC Communication with Maxx Executive
ipcMain.handle('execute-action', async (event, action) => {
    console.log(`[Electron-Main] IPC: Executing Maxx action: ${action}`);
    if (action === 'IGNITE_SOVEREIGNTY' && jarviseExecutive) {
        const result = await jarviseExecutive.igniteSovereignty();
        // Stream status update back to UI
        mainWindow?.webContents.send('status-update', {
            liquidity: result.balance,
            assets: 2670,
            integrity: (result.securityIntegrity ?? 1) * 100,
            activeAgents: result.activeAgents,
            threats: result.threats
        });
        mainWindow?.webContents.send('log-update', `[MaxxExecutive] ${result.status}: Cycle complete.`);
        return result;
    }
    return { success: true, status: 'EXECUTIVE_LOGGED' };
});
