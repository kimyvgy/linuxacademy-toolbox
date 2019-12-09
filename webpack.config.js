const popup = require('./webpack/popup')
const contentScripts = require('./webpack/content-scripts')
const backgroundScripts = require('./webpack/background-scripts')

module.exports = [
  popup,
  contentScripts,
  backgroundScripts,
]
