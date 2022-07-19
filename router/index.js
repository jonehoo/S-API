const express = require('express')

const router = express.Router()
const {scanDirModules}=require('../helper.js')
const scanResult = scanDirModules(__dirname, __filename)
for (const prefix in scanResult) {
  if (scanResult.hasOwnProperty(prefix)) {
    router.use(prefix, scanResult[prefix])
  }
}

module.exports = router