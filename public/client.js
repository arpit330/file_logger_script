const socket = io('http://127.0.0.1:3000');
console.log("connected");

socket.on('filechanged', data => {
    console.log(data);
})