const { port } = require('./config');
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    const client = socket.handshake.address;
    console.log(client)

    socket.on('file.send', function (data) {
        io.emit('file.get', data);
    })
})

server.listen(port);

console.log('listening on: ' + port);