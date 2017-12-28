const {BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

// BrowserWindow instance
exports.win

// BrowserWindow createWindow fn
exports.createWindow = () => {
  this.win = new BrowserWindow ({
    width: 500,
    height: 650,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 310
  })

  // Open the DevTools.
  // this.win.webContents.openDevTools({mode:'undocked'})

  // and load the index.html of the app.
  this.win.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  this.win.on('closed', function () {
    this.win = null
  })
}
