var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/component.html');
});

app.get('/users', function (req, res) {
  res.json([{
    id: 123456,
    name: 'gggggg'
  }])
});

io.on('connection', function (socket) {
  socket.on('chat message', function (message) {
    message[3] = "";
    message[3] = message[0];
    if (message[4] == "typing") {
      io.emit('chat message', message);
    }
    else {
      message[4] == "";
      io.emit('chat message', message);
    }
  });
  
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});