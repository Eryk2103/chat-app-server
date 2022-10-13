require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();

app.use(cors());
app.use(express.json())

const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {cors: { origin: '*'}});

const connectDB = require('./db');
connectDB();

app.use('/room', require('./routes/room'));
app.use('/user', require('./routes/user'));

io.on('connection', (socket) => {
    socket.on('join-room', (room, user) => {
        socket.join(room);
        socket.to(room).emit('message', {user: user, message: 'joined chat'})
    })
    socket.on('send-message', (room, msg, user) => {
        socket.to(room).emit('message', {user: user, message: msg});
    })
    socket.on('leave-room', (room, user) => {
        socket.leave(room);
        socket.to(room).emit('message', {user: user, message: 'left chat'})
    })
});


server.listen(5000, () => console.log('server start'));