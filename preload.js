const { remote, app, ipcRenderer } = require("electron");
const pluginManager = require(`electron-plugin`);
const { Menu, BrowserWindow } = remote;
const url = require("url");
const path = require("path");



const Store = require("electron-store");
const config = new Store({
  projectName: "GameHUB"
});

let config = { 
	installPath: `${__dirname}/extensions`,
	plugins : {
		"demo": "0.0.2"
  }
},
extensionPoint = {
	app: 'anything you want to use as exstention point'
}



createWindow = () => {

    // Layout window
    const appPath = path.join(__dirname, './app/index.html')
    const appWindow = new BrowserWindow({
			title: app.getName(),
			width: 800,
			height: 600,
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

// Another windows create

let settingsWindowOpened = true;

canShowIntro = () => {
  const status = config.get("showIntro");
  return status == null ? true : status;
};

// creates an intro window
createIntroWindow = () => {
  let win = new remote.BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    frame: false,
    hasShadow: false,
    transparent: true,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      devTools: false,
      nodeIntegration: true
    }
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app/splash.html"),
      protocol: "file:",
      slashes: true
    })
  );
  win.on("closed", () => {});
  win.once("ready-to-show", () => {
    win.show();
  });
};
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
      // devTools: true,
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

pluginManager.load(config, extensionPoint)





