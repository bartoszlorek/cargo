const dragDrop = require('drag-drop');
const uncPath = require('./utils/uncPath');
const addLink = require('./utils/addLink');
const io = require('socket.io-client');

const uncSpec = {
    hostname: require('os').hostname(),
    shares: [
        '_work',
        '_WORK_old'
    ]
}

module.exports = function (url) {
    const socket = io.connect(url, { reconnect: true });

    dragDrop('body', function (files) {
        const unc = uncPath(files[0].path, uncSpec);
        socket.emit('file.send', unc);
    });

    socket.on('file.get', function (data) {
        addLink(data);
    });
}