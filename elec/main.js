const { app, BrowserWindow } = require('electron');
require('electron-reload')('../');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

function createWindow () {
  const win = new BrowserWindow({
    height: 100,
    width: 360,
    resizable: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  win.loadFile('src/index.html');
  win.removeMenu();
  // win.openDevTools();
}

app.whenReady().then(createWindow);
