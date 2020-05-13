const url = 'ws://www.momokreativ.hu:8080'
const connection = new WebSocket(url);

const user = prompt("user: ");

const doboz = document.querySelector('#box');
doboz.addEventListener("keypress", e => {
    if (e.keyCode == 13) {
        e.preventDefault();
        const message = {
            user,
            msg: e.target.value
        }
        const paragraph = document.createElement('P');
        paragraph.innerHTML = `${message.user}: ${message.msg}`;
        messages.appendChild(paragraph);
        connection.send(JSON.stringify(message));
        e.target.value = "";
    }
});

const messages = document.querySelector('#messages');
connection.onopen = () => {
    console.log('connection made with server');
}

connection.onclose = () => {
    console.log('connection closed closed with server');
}

connection.onmessage = e => {
    const message = JSON.parse(e.data);
    const paragraph = document.createElement('P');
    paragraph.innerHTML = `${message.user}: ${message.msg}`;
    messages.appendChild(paragraph);
};

//connection.send(JSON.stringify(point));