const { port, host } = require('./config');
const evilscan = require('evilscan');
const client = require('./client');

let hostIp = null;

const scanner = new evilscan({
    target: host,
    port: port,
    status: 'O'
});

scanner.on('result', function (data) {
    hostIp = data.ip;
});

scanner.on('done', function () {
    if (hostIp !== null) {
        client('http://' + hostIp + ':' + port);
        
    } else {
        console.log('needs own server');
    }
});

scanner.run();