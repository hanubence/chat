const express = require('express');
const app = express();
const port = 3000;

const socket = require('ws');
const ws = new socket.Server({port: 8080});

const messages = [];

ws.on('connection', con => {
    console.log('connection made');
    
    messages.forEach(message => {
        con.send(message);
    });

    con.on('message', point => {
        messages.push(point);
        if (messages.length >= 100) messages.shift();
        ws.clients.forEach(client => {
            if (client != con) {
                client.send(point);
            }
        });
    });
});

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
});

app.listen(port);