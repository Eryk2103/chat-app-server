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
        console.log(`user: ${user} connected to: ${room}`)
    })
    socket.on('send-message', (room, msg) => {
        socket.to(room).emit('message', msg);
    })
    socket.on('leave-room', room => {
        socket.leave(room);
    })
});


server.listen(5000, () => console.log('server start'));