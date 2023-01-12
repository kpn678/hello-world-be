require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessage = require('./services/harper-get-message');

app.use(cors());

const server = http.createServer(app);

const CHAT_BOT = 'ChatBot'; 

let chatroom = '';
let allUsers = [];

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
    let __createdtime__ = Date.now();

    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat!`,
      username: CHAT_BOT,
      __createdtime__
    });

    socket.emit('receive_message', {
      message: `Welcome, ${username}!`,
      username: CHAT_BOT,
      __createdtime__
    });

    chatroom = room;
    allUsers.push({
      id: socket.id,
      username,
      room
    });

    const chatroomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatroomUsers);
    socket.emit('chatroom_users', chatroomUsers);

    harperGetMessage(room)
      .then((last100messages) => {
        socket.emit('last_100_messages', last100messages);
      })
      .catch((error) => console.log(error));
  });

  socket.on('send_message', (data) => {
    const {message, username, room, __createdtime__} = data;
    io.in(room).emit('receive_message', data);
    harperSaveMessage(message, username, room, __createdtime__)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  });
});

app.get('/', (request, response) => {
  response.send('Hello, world');
});

server.listen(4000, () => 'Server is running on port 4000');