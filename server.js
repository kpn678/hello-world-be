const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected, socket id: ${socket.id}`);
  socket.on('join_room', (data) => {
    const {username, room} = data;
    socket.join(room);
  });
});

app.get('/', (request, response) => {
  response.send('Hello, world');
});

server.listen(4000, () => 'Server is running on port 4000');