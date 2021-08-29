const express = require("express");
const socketio = require("socket.io");
const http = require("http");

//import user module
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");

//create server
const server = http.createServer(app);
const io = socketio(server);

//socket io config
io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username,
      room
    });

    if (error) return callback(error);

    socket.emit("message", { user: "admin", text: `${user.username}, welcome to the room ${user.room}` });

    //when the user is joined
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.username} has joined!` });

    socket.join(user.room);

    callback();

  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.username, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("A user has left the conversation");
  });
});

//router
app.use(router);

//server listens
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});