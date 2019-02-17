// Establish client-side connection to server
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

/*
 * Event Handlers
 */

// Send message and handle when send button is clicked
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });

  // Remove contents of message box after send button is clicked
  message.value = "";
});

message.addEventListener('keypress', function(){
	socket.emit('typing', handle.value);
})

// Display new messages as they are received from the server
socket.on('chat', function(data){
  feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

// Display a message to show another user is typing
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});