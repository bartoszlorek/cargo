const { port } = require('./config');
const server = require('http').createServer();
const io = require('socket.io')(server);

const clients = [];

io.on('connection', function (client) {
    const { hostname } = client.handshake.query;

    client.on('file.send', function (data) {
        io.emit('file.get', data);
    });

    client.on('disconnect', function () {
        clients.splice(clients.indexOf(client), 1);
        io.emit('user disconnected');
        console.log(hostname + ' (disconnect)');
    });

    clients.push(client);
    console.log(hostname + ' (connect)');
});

server.listen(port);

console.log('listening on: ' + port + '\n');