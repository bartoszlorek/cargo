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
    if (data.status === 'open') {
        hostIp = data.ip;
    }
});

scanner.on('done', function () {
    if (hostIp !== null) {
        client('http://' + hostIp + ':' + port, () => {
            console.log('done!');
        });

    } else {
        console.log('needs own server!');
    }
});

scanner.run();
console.log('initializing...');