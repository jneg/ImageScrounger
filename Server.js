const Express = require('express')
const Server = Express()
const HttpServer = require('http').createServer(Server)
const Io = require('socket.io')(HttpServer)
const request = require('request')
const cheerio = require('cheerio')

const port = 3000

Io.on('connection', function (socket) {
  socket.on('ScroungeUri', function (uri) {
    var imageUris = []
    request(uri, function (error, response, body) {
      $ = cheerio.load(body)
      $('body').find('img').each(function (i, v) {
        if ($(v).prop('src')) {
          var imageUri = $(v).attr('src')
          if (!new RegExp('^(?:[a-z]+:)?//', 'i').test(imageUri)) {
            imageUri = uri + '/' + imageUri
          }
          imageUris.push(imageUri)
        }
      })
      socket.emit('ImageUris', imageUris)
    })
  })
})

Server.use('/Js', Express.static('Js'))
Server.get('/', (req, res) => {
  res.sendFile(__dirname + '/ImageScrounger.html')
})

HttpServer.listen(port, () => console.log('ImageScrounger listening on port ' + port))
