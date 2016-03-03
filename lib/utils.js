var utils = {};

utils.merge = function(source, dest) {
    source = source || {};
    dest = dest || {};

    for (var i in source) {
        if (source.hasOwnProperty(i)) {
            dest[i] = source[i];
        }
    }
    return dest;
};

module.exports = utils;