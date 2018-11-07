var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconected from Server");
});

socket.on("newMessage", function(newMessage) {
  console.log("new Message", newMessage);
  var li = jQuery("<li></li>");
  li.text(`${newMessage.from}: ${newMessage.text}`);

  $("#messages").append(li);
});

$("#message_form").on("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val()
    }, // acknowledgement
    function() {}
  );
});
