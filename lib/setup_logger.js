var winston = require('winston');
var moment = require('moment');

function setup_logger() {
    winston.loggers.add('default', {
        console: {
            level: 'debug',
            colorize: true,
            label: 'Default logger',
            timestamp: () => moment().format(),
            formatter: (options) => {
                return options.timestamp() + '|' + options.level.toUpperCase() + '|  ' + 
                       (options.message || '') + ' ' + 
                       (options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '');
            } 
        }
    });
}

module.exports = setup_logger;