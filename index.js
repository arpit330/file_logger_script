
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors(
    "*"
));
const socketio = require("socket.io");
app.use('/public', express.static('public'));
app.use(express.json());

//convert the express app to socket server
const server = app.listen(3000, () => {
    console.log('listening on *:3000');
});

const io = socketio(server, {
    cors: "*",
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

