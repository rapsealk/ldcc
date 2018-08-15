const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep Window from GC
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800, height: 600,
        titleBarStyle: 'hidden-inset',
        icon: path.join(__dirname, 'assets/icons/lotte.ico')
    });
    // win = new BrowserWindow({ width: 1920, height: 1080 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
        
        // resizable: false,
        webPreferences: {
            webSecurity: false
        }
    }));
    // win.maximize();

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});