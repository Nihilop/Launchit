const { ipcRenderer, remote } = require('electron');
const { BrowserWindow } = remote;

// close button

let type = document.getElementById('type');
let closeButton = document.querySelector('.button').addEventListener('click', (event) => {
    ipcRenderer.send('closeApp', event)
});

// Local shortcuts 

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "Escape":
            var window = BrowserWindow.getFocusedWindow();
            window.hide();
            break;
        }
});
