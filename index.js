var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
  // res.send('<h1>Hello World</h1>)
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})

io.on('connection', function(socket) {
  console.log('a user connected') // logged each time a new user accesses localhost:3000
  socket.on('disconnect', function() {
    console.log('user disconnected') // logged when a user leaves localhost:3000
  })
})

// io.emit('some event', { for: 'everyone' }) // io.emit () sends some event to everyone

// io.on('connection', function(socket) {
//   socket.broadcast.emit('hi') // excludes a socket from a broadcast
// })

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg)
    console.log('message: ' + msg)
  })
})
