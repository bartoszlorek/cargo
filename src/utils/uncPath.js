module.exports = function (path, spec) {
    if (path[0] === '\\') {
        return path;
    }
    const { shares, hostname } = spec;
    const parts = path.split('\\');
    const share = shares.filter(name => {
        return name.toLowerCase() === parts[1].toLowerCase();
    });

    if (!share.length) {
        return false;
    }
    return '\\\\'
        + hostname + '\\'
        + share[0] + '\\'
        + parts.slice(2).join('\\');
}