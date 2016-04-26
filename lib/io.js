'use strict';
var io = require('socket.io')();
// var knex = require('knex')(require('../knexfile')['development']);
let connectedSockets = {};
//what happens when a socket connects to the server
io.on('connection', function (socket) {
  console.log('socket connected');
  connectedSockets[socket.id] = socket;
  // whenever a client emits a message with the name `self`
  // this function will fire
  socket.on('self', function (data) {
    data.socketId = socket.id;
    // socket.emit just sends a message back to this one socket
    socket.emit('message', data.message);

  });

  socket.on('all', function (data) {
    // io.sockets.emit sends a message to _all_ connected sockets
    // in all rooms
    data.socketId = socket.id;

    // socket.emit just sends a message back to this one socket
    io.sockets.emit('message', data.message);
    // socket.emit('message', data.message);
  });

  // whenever a client emits a message with the name `join`
  // this function will fire
  socket.on('join', function (data) {

    // This is an example of how you can set properties on the socket object.
    // In this case, if a socket's already in a room, remove it.
    if (socket.room) {

      // This removes the current socket from the given room
      socket.leave(socket.room);
    }

    // This adds the current socket to the given room
    socket.join(data.room_name);

    // This just sets an arbitrary property on the socket object
    // to store a quick reference to the room they joined
    //
    // NOTE: there are other ways to do this - this is just an example
    socket.room = data.room_name;
  });

  socket.on('message', function (data) {
    console.log(data, 'data in message');
    // io.sockets.in sends a message to all sockets in this room
    // including the current socket
    data.socketId = socket.id;

    io.sockets.in(socket.room).emit('message', data.message);
  });

  socket.on('direct_message', function (data) {
    data.socketId = socket.id;
    connectedSockets[Object.keys(connectedSockets)[0]].emit('message', data.message);
  });


  socket.on('disconnect', function() {
    console.log('socket disconnected');
    delete connectedSockets[socket.id];
  });

});



//Exporting socket.io module and events
module.exports = io;
