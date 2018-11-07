var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconected from Server");
});

socket.on("newMessage", function(newMessage) {
  console.log("new Message", newMessage);
});
