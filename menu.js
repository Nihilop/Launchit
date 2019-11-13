'use strict';
const path = require('path');
const {app, Menu, shell} = require('electron');

module.exports = function(window){
    return [
			{
				label: "Afficher l'Overlay",
				click() {	createWindow() }
			},
			{
				label: "Options",
				click() {	createWindow() }
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
}