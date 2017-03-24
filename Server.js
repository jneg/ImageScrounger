const Express = require('express')
const Server = Express()

const port = 3000

Server.use('/Vue', Express.static('Vue'))
Server.get('/', (req, res) => {
  res.sendFile(__dirname + '/Html/ImageScrounger.html')
})

Server.listen(port, () => console.log('ImageScrounger listening on port ' + port))
