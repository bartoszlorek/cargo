module.exports = function (path, spec) {
    if (path[0] === '\\') {
        return path;
    }
    const { shared, hostname } = spec;
    const lowerPath = path.toLowerCase();
    const match = shared.filter(name => {
        return name.toLowerCase() === lowerPath
            .slice(0, name.length);
    });

    if (!match.length) {
        return false;
    }
    return '\\\\'
        + hostname + '\\'
        + match[0].slice(3)
        + path.slice(match[0].length);
}