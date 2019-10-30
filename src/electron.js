// May not need this in react land, but still want to be sure.
require('events').EventEmitter.defaultMaxListeners = 99;

const {app, BrowserWindow} = require('electron');
let mainWindow;

// Chromium Offscreen Rendering Fix
app.disableHardwareAcceleration();

function createWindow () {

    if (process.platform === "win32") {
        ico = 'app/resources/icons/icon.png'; 
    } else if (process.platform === "darwin") {
        ico = 'app/resources/icons/icon.icns';
    }else {
        ico = 'app/resources/icons/icon.png';
    } 
    
    const windowConfig = {
        icon:ico,
        width:320, 
        height:200, 
        x:0, 
        y:0, 
        minWidth:50, 
        minHeight:50, 
        menu:null,
        toolbar:false,
        minimizable:false,
        fullscreen:false,
        webPreferences:{nodeIntegration:true}
    };

    mainWindow = new BrowserWindow(windowConfig);
    mainWindow.setMenu(null);

    // Our Controller File
    mainWindow.loadFile('index.html');
    
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});



