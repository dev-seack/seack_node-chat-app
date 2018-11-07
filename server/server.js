const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public"); // clears the path
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("new user connected");

  // listens
  socket.on("createMessage", (message) => {
    console.log("new Message", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }); // emits a event to ervery connection
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from server");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
