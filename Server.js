const Express = require('express')
const Server = Express()
const HttpServer = require('http').createServer(Server)
const Io = require('socket.io')(HttpServer)
const request = require('request')
const cheerio = require('cheerio')

const port = 3000

Io.on('connection', function (socket) {
  console.log('[' + socket.id + ']' + ' Connected')
  socket.on('scroungeUri', function (uri) {
    console.log('[' + socket.id + ']' + ' Received scroungeUri \"' + uri + "\"")
    var imageUris = []
    request(uri, function (error, response, body) {
      $ = cheerio.load(body)
      $('body').find('img').each(function (i, v) {
        var imageUri = $(v).attr('src')
        if (!new RegExp('^(?:[a-z]+:)?//', 'i').test(imageUri)) {
          imageUri = uri + '/' + imageUri
        }
        imageUris.push(imageUri)
      })
      console.log(imageUris)
      socket.emit('imageUris', imageUris)
    })
  })
})

Server.use('/Vue', Express.static('Vue'))
Server.get('/', (req, res) => {
  res.sendFile(__dirname + '/Html/ImageScrounger.html')
})

HttpServer.listen(port, () => console.log('ImageScrounger listening on port ' + port))
