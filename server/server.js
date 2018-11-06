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

  // emits
  socket.emit("newMessage", {
    from: "Marius",
    text: "Hello World!",
    createdAt: 1234
  });

  // listens
  socket.on("createMessage", (newMessage) => {
    console.log("new Message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from server");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
