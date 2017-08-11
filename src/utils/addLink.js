const { shell } = require('electron');

module.exports = function (link) {
    const a = document.createElement('a');
    a.setAttribute('href', 'javascript:void(0)');
    a.innerHTML = link;
    a.onclick = function () {
        shell.showItemInFolder(link);
    }
    document.getElementById('links').appendChild(a);
}