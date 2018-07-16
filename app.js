const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');




//Server setup
const server = app.listen(3000, () => {
    console.log('server listen at 3000');
});

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));


let io = socket(server);

io.on('connection', (socket) => {
    console.log('Socket made connection', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});

