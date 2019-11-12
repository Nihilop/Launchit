'use strict';
const path = require('path');
//Electron Lib :
const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const ipcMain = electron.ipcMain
const Tray = electron.Tray
const globalShortcut = electron.globalShortcut


//Windows effect
const ewc = require('ewc');
// const {autoUpdater} = require('electron-updater');
const {is} = require('electron-util');
const unhandled = require('electron-unhandled');
const debug = require('electron-debug');
const contextMenu = require('electron-context-menu');
const config = require('./config');
const menu = require('./menu');


const isDev = require('electron-is-dev');

// Hot reload developpement
require('electron-reload')(__dirname);

unhandled();
//debug();
contextMenu();

// Note: Doit correspondre à ce qu'il y a dans `build.appId` dans package.json
app.setAppUserModelId('com.nihilo.launchit');


// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }

// Prevent window from being garbage collected
//let mainWindow;
let tray;
let mainWindow
let loadingScreen;

const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(Object.assign({
    /// set the window height / width
    width: 300,
    height: 600,
    /// remove the window frame, so it will rendered without frames
    frame: false,
    /// and set the transparency to true, to remove any kind of background
    transparent: true
  }));
  loadingScreen.setResizable(false);
  loadingScreen.loadURL('file://' + __dirname + '/app/splash.html');
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
		frame: false,
		transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
    /// set show to false, the window will be visible when to loading screen will be removed
    show: false
  });

  // and load the index.html of the app.
  mainWindow.loadFile('./app/intro.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
  mainWindow.webContents.on('did-finish-load', () => {
    // when the content has loaded, hide the loading screen and show the main window
    if (loadingScreen) {
      loadingScreen.close();
    }
		// If intro activate
    mainWindow.show();
  });
}



app.on('ready', () => {
  createLoadingScreen();
  /// add a little timeout for tutorial purposes, remember to remove this
  setTimeout(() => {
    createWindow();
  }, 3000);
})





















 
// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		mainWindow.show();
	}
});


app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}
});


// Icp receiver

ipcMain.on('closeApp', (_) => {
    const closeIt = BrowserWindow.getFocusedWindow();
    closeIt.close();
})

ipcMain.on('buttonSettings', (_) => {
    settingsWindow.show()
})

