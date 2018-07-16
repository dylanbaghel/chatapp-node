//Socket Connection

let socket = io.connect('http://localhost:3000');


let handle = document.getElementById('handle');
let message = document.getElementById('message');
let output = document.getElementById('output');
let send = document.getElementById('send');
let feedback = document.getElementById('feedback');



send.addEventListener('click', () => {
    if (handle.value !== "") {
        if (message.value !== "") {
            socket.emit('chat', {
                handle: handle.value,
                message: message.value
            });
        } else {
            
        }
    } else {
        alert('Handle Cannot Be Empty');
    }
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

socket.on('chat', (data) => {
    feedback.innerHTML = "";
    message.value ="";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on('typing', (data) => {
    feedback.innerHTML = "<p><em>" + data + " is typing....</em></p>";
});