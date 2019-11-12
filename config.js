'use strict';
const Store = require('electron-store');

module.exports = new Store({
	defaults: {
        id: '1',
        name: 'Overwatch',
        category: 'Game',
        shortcut: {
            path: '...',
            iconPath: '...',
            backgroundPath: '...',
            bannerPath: '...'
        }
	}
});
