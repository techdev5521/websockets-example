// Required Dependencies
var express = require('express');
var socket = require('socket.io');

/* Create NodeJS server using Express
 * Express Documentation: https://expressjs.com/
 */

// Initialize Express
var app = express();

// Create a server
var server = app.listen(4000, function(){
    console.log('Listening on port 4000.');
});

// Set Document Root for Express
app.use(express.static('public'));

/*
 * Socket Management
 */

// Store the server-side socket in a variable
var io = socket(server);

// When a client connection is made...
io.on('connection', (socket) => {

	// Log socket connection in console
    console.log('New socket creation with id: ', socket.id);

    // When message type: chat received...
    socket.on('chat', function(data){
        
        // Rebroadcast message type: chat to all clients
        io.sockets.emit('chat', data);
        
    });

    socket.on('typing', function(data){

    	// Rebroadcast typing notifcation to all users
    	socket.broadcast.emit('typing', data);

    });

});
