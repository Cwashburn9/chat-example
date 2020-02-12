var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Let’s refactor our route handler to use sendFile instead:
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// And in index.js we print out the chat message event:
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       console.log('message: ' + msg);
//     });
//   });

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});



http.listen(3001, function () {
  console.log('listening on *:3001');
});