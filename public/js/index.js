var socket = io();

socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "Robin",
    text: "Hello Marius!"
  });
});

socket.on("disconnect", function() {
  console.log("Disconected from Server");
});

socket.on("newMessage", function(newMessage) {
  console.log("Recieved new Message", newMessage);
});
