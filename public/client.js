const socket = io('http://127.0.0.1:3000');
console.log("connected");

// const div = document.getElementById('result');


function display_logs(data) {
    document.getElementById('result-container').innerHTML = '';
    const lines = data.split('\n');
    lines.forEach(line => {
        document.getElementById('result-container').innerHTML += '<p>' + line + '</br><p>';
    });
};

socket.on('filechanged', data => {
    console.log(data);
    display_logs(data);
})

