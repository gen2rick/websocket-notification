const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingInterval: 60000,
  pingTimeout: 30000,
});

const PORT = process.env.PORT || 3019;

app.use(express.static("public"));

let connectedUsers = 0;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  connectedUsers++;

  socket.on("triggerAlarm", () => {
    // Broadcast to all connected clients
    io.emit("showAlarm", { connectedUsers });
  });

  socket.on("triggerRefuse", () => {
    // Broadcast refusal to all connected clients
    io.emit("showRefuse");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    connectedUsers--;
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
