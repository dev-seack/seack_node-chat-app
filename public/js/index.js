var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconected from Server");
});

socket.on("newMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery("<li></li>");
  li.text(`${message.from} ${formatedTime}: ${message.text}`);

  $("#messages").append(li);
});

$("#message_form").on("submit", function(e) {
  e.preventDefault();

  var messageTextbox = $("[name=message]");

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: messageTextbox.val()
    }, // acknowledgement
    function() {
      messageTextbox.val("");
    }
  );
});

socket.on("newLocationMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current Location</a>');

  li.text(`${message.from} ${formatedTime}: `);
  a.attr("href", message.url);
  li.append(a);
  $("#messages").append(li);
});

var locationBtn = $("#send_location");

locationBtn.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser!");
  }

  locationBtn.attr("disabled", "disabled").text("Sending Location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationBtn.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationBtn.removeAttr("disabled").text("Send Location");
      alert("Unable to fetch location");
    }
  );
});
