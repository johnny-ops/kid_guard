const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        title: "My Custom App",
        icon: path.join(__dirname, 'assets', 'icon.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });

   
    Menu.setApplicationMenu(null);
    win.setMenuBarVisibility(false); 

    win.loadFile('./html/login.html');
}

app.whenReady().then(createWindow);
