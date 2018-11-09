var socket = io();

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("Disconected from Server");
});

socket.on("newMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });

  $("#messages").append(html);
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
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });

  $("#messages").append(html);
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
