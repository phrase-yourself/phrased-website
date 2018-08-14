const express = require('express')
const path = require('path')
const server = express()

const dir = 'dist'
const port = 9292

server.use(function (req, res, next) {
  console.log(req.ip, '- GET ', req.originalUrl)
  next()
})

server.use('/', express.static(path.join(__dirname, dir, '/')))


server.listen(port)
