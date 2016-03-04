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

ExtendLogger.prototype.log = function (severity, message, meta) {
    severity = severity || 'info';
    message = message || '';
    meta = meta || {};

    meta = merge(this.meta, meta);
    this.logger.log(severity, message, meta);
};

const severities = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];
severities.forEach(function (severity) {
    ExtendLogger.prototype[severity] = function (message, meta) {
        return ExtendLogger.prototype.log.call(this, severity, message, meta);
    };
});

function get_logger (name, filename) {
    return new ExtendLogger(name, filename);
}

module.exports = get_logger;