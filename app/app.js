const { ipcRenderer, remote } = require('electron');
const { BrowserWindow } = remote;


// Assets 
const jQuery = require("jquery");


// button

//document.getElementById("close").addEventListener("click", function (e) {
//    var window = remote.getCurrentWindow();
//    window.close();
//}); 

let type = document.getElementById('type');
let closeButton = document.querySelector('#close').addEventListener('click', (event) => {
    ipcRenderer.send('closeApp', event)
});


let buttonSettings = document.querySelector('.buttonSettings').addEventListener('click', (event) => {
    ipcRenderer.send('buttonSettings', event)
});



// Local shortcuts 

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "Escape":
            var thisApp = BrowserWindow.getFocusedWindow();
            thisApp.hide();
            break;
        }
});


// Animation 



function launchAnim() {
    const element =  document.querySelector('main_animation')
    element.classList.add('animated', 'bounceOutLeft')
    console.log('Anime')

}

