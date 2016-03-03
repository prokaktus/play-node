var winston = require('winston');
var merge = require('./utils').merge;

function ExtendLogger(logger_name, filename) {
    logger_name = logger_name || 'default';
    filename = filename || 'Non specified';

    this.logger = winston.loggers.get(logger_name);
    this.meta = {
        filename: filename
    }

    return this;
}

ExtendLogger.prototype = {};

ExtendLogger.log = function (severity, message, meta) {
    severity = severity || 'info';
    message = message || '';
    meta = meta || {};

    meta = merge(this.meta, meta);
    console.log(meta);
    this.logger.log(severity, message, meta);
}

function get_logger (name, filename) {
    return new ExtendLogger(name, filename);
}

module.exports = get_logger;