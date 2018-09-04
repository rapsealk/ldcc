const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const backend = require('./server');

// Keep Window from GC
let win;

function createWindow() {

    // TODO: Google Geolocation API KEY 요청하기
    process.env.GOOGLE_API_KEY = 'AIzaSyCFoLMaySYpiZgo17QeLISN8l8-bt9wnn0';

    win = new BrowserWindow({
        title: "롯데정보통신 드론관제시스템",
        width: 800, height: 600,
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'assets/icons/lotte.ico')
    });

    win.loadURL(url.format({
        pathname: 'localhost:3000',
        protocol: 'http:',
        slashes: true
    }));

    // win.on('resize', () => win.maximize());

    win.maximize();
    // win.setResizable(false);

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