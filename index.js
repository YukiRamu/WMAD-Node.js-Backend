const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");

//create server
const server = http.createServer(app);
const io = socketio(server);

//socket io config
io.on("connection", (socket) => {
  console.log("connected to socket.io!!");
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