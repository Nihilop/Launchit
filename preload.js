
const electron = require('electron');
const remote = electron.remote
const app = electron.app
const ipcRenderer = electron.ipcRenderer

//const find = require("find-process");
//const ps = require("ps-node");
const isDev = require("electron-is-dev");

const { Tray, Menu, BrowserWindow } = remote;
const url = require("url");
const path = require("path");
const { execFile } = require("child_process");

//const Store = require("electron-store");
//const pluginManager = require(`electron-plugin`);



const Store = require("electron-store");
const config = new Store({
  projectName: "Launchit"
});


//let config = { 
//	installPath: `${__dirname}/extensions`,
//	plugins : {
//		"demo": "0.0.2"
//  }
//},
//extensionPoint = {
//	app: 'anything you want to use as exstention point'
//}

// Create menu 

let tray = new Tray(
  path.join(
    __dirname,
    `./${
      process.platform == "darwin" ? "tray/icon.png" : "tray.png"
    }`
  )
);

const navigationTray = [
			{
				label: "Afficher l'Overlay",
				click() {	createAppWindow() }
			},
			{
				label: "Options",
				click() {	createIntroWindow() }
			},
			{ type: 'separator' },
			{
				label: 'Web site',
				click() {	shell.openExternal('https://github.com/Nihilop/Launchit') }
			},
			{
				label: 'Quitter',
				click() {	app.quit() }
			}
]


createAppWindow = () => {

    // Layout window
    const appPath = path.join(__dirname, './app/index.html')
    const appWindow = new BrowserWindow({
			title: app.getName(),
			frame: false,
      show: false,
      transparent: true,
			resizable: false,
      backgroundColor: '#00000000',
      webPreferences: {
        nodeIntegration: true,
				devTools: false,
        preload: path.join(__dirname, "preload.js")
      },
      thickFrame: false,
	});
  appWindow.loadURL(appPath);
	appWindow.setFullScreen(true);
  ewc.setAcrylic(appWindow, 0x14800020);
	appWindow.on('ready-to-show', () => {
        appWindow.setAlwaysOnTop(true, "floating", 1);
        appWindow.setPosition(0 , 0);
	});
    
  appWindow.on('close', event=>{
  	event.preventDefault();
    appWindow.hide();
  });
	
	return appWindow;

}


//show intro on startup.
if (canShowIntro()) createIntroWindow();

createSettingsWindow = () => {
  let win = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    maximizable: false,
    minimizable: false,
    resizable: true,
    frame: false,
    webPreferences: {
      devTools: false,
      nodeIntegration: true
    }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app/settings.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.on("closed", () => {
    settingsWindowOpened = false;    
  });

  win.once("ready-to-show", () => {
    settingsWindowOpened = true;
    win.setMenu(null);
    win.show();
  });
};


function buildTrayMenu() {
  let trayMenu = Menu.buildFromTemplate(navigationTray);
  tray.setContextMenu(trayMenu);
}  

pluginManager.load(config, extensionPoint)
buildTrayMenu();





