const { exec } = require('child_process');
const command = 'for /F "tokens=2" %i in (\'net share\') do @echo %i';

let shared = null;

module.exports = function (callback) {
    if (shared !== null) {
        callback(shared);
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            callback(shared || false);
        }
        shared = stdout.split('\n')
            .map(dir => dir.trim())
            .filter(dir => {
                const path = dir.toLowerCase();
                return path[1] === ':' && path.length > 3
                    && path !== 'c:\\windows';
            });

        callback(shared);
    });
}