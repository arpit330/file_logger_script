
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
const server = app.listen(3000,'0.0.0.0', () => {
    console.log('listening on *:3000');
});

const io = socketio(server, {
    cors: "*",
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

const logFilePath = __dirname + '/public/file.txt';
function getLastLines(filePath, numLines) {
    const fileContent = fs.readFileSync(filePath, 'utf8').split('\n');
    const start = Math.max(fileContent.length - numLines, 0);
    return fileContent.slice(start).join('\n');
}

io.on('connection', (socket) => {
    console.log('a user connected');

    fs.watch(logFilePath, (eventType) => {
        if (eventType === 'change') {
            // Send the new lines to the client upon file change
            const Data = getLastLines(logFilePath,10);
            socket.emit('filechanged', Data);
        }
    });

});

