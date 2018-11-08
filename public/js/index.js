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
  $("[name=message]").val("");
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

socket.on("newLocationMessage", function(message) {
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current Location</a>');

  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

var locationBtn = $("#send_location");

locationBtn.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser!");
  }

  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert("Unable to fetch location");
    }
  );
});
