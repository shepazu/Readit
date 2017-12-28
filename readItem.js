// Modules
const {BrowserWindow} = require('electron')

// BrowserWindow
let bgItemWin

// New read item method
module.exports = (url, callback) => {

  // Create new offscreen BrowserWindow
  bgItemWin = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  // Load read item
  // if (0 != url.indexOf("http")) {
  //   console.info(url, url.indexOf("http") )
  //   url = "https://" + url
  // }
  bgItemWin.loadURL(url)

  // Wait for page to finish loading
  bgItemWin.webContents.on('did-finish-load', () => {

    // Get screenshot (thumbnail)
    bgItemWin.webContents.capturePage((image) => {

      // Get image as dataURI
      let screenshot = image.toDataURL()

      // Get page title
      let title = bgItemWin.getTitle()

      // Return new item via callback
      callback({ title, screenshot, url })

      // Clean up
      bgItemWin.close()
      bgItemWin = null
    })
  })
}
