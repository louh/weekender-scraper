const fs = require('fs')
const path = require('path')
const axios = require('axios')
const mkdirp = require('mkdirp')

const base_URL = 'http://web.mta.info/weekender/images/subwaytilesnew/'
// const size = 16
// const MAX_X_TILE = 26
// const MAX_Y_TILE = 26
// const size = 15
// const MAX_X_TILE = 13
// const MAX_Y_TILE = 13
const size = 14
const MAX_X_TILE = 9
const MAX_Y_TILE = 9

async function downloadImage ({ size, x, y } = options) {
  const url = `${base_URL}${size}_${x}_${y}.png`
  const response = await axios.request({
    url,
    method: 'get',
    responseType: 'stream'
  }).catch((err) => {
    console.log('Unable to get', url)
  })

  const destDir = path.join(__dirname, `./images/${size}/${(9650 / 2) + x}/`)

  mkdirp(destDir, function (err) {
    if (err) {
      console.error(err)
    } else {
      const filename = `${destDir}${(12300 / 2) + y}.png`
      if (response && response.data && response.data.pipe) {
        response.data.pipe(fs.createWriteStream(filename))
        console.log(`Writing ${filename}`)
      }
    }
  })
}

for (let x = 0; x <= MAX_X_TILE; x++){
  for (let y = 0; y <= MAX_Y_TILE; y++) {
    downloadImage({ size, x, y })
  }
}

 