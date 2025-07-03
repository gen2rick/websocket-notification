const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('triggerAlarm', () => {
    // Broadcast to all connected clients
    io.emit('showAlarm');
  });

  socket.on('triggerRefuse', () => {
    // Broadcast refusal to all connected clients
    io.emit('showRefuse');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
