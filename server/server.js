/**
 * Documentation
 * --------------
 * socket is the current used client
 *
 */
const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");
const { Users } = require("./utils/users");

const publicPath = path.join(__dirname, "../public"); // clears the path
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("new user connected");

  // listens
  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and Room name are required");
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // emits
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));

    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat app")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined`)
      );
    callback();
  });

  socket.on("createMessage", (message, callback) => {
    console.log("new Message", message);
    io.emit("newMessage", generateMessage(message.from, message.text)); // emits a event to ervery connection
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left!`)
      );
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
