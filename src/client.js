const dragDrop = require('drag-drop');
const uncPath = require('./utils/uncPath');
const addLink = require('./utils/addLink');
const netShare = require('./utils/netShare');
const io = require('socket.io-client');
const os = require('os');

module.exports = function (url, callback) {
    netShare(shared => {
        if (!shared) {
            return alert('there is no shared folders');
        }

        const socket = io.connect(url, {
            reconnect: true
        });

        const uncSpec = {
            hostname: os.hostname(),
            shared
        }

        dragDrop('body', function (files) {
            const unc = uncPath(files[0].path, uncSpec);
            if (unc) {
                socket.emit('file.send', unc);

            } else {
                alert('file must be in shared folder');
            }
        });

        socket.on('file.get', function (data) {
            addLink(data);
        });

        if (typeof callback === 'function') {
            callback();
        }
    });
}