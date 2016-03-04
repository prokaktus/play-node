'use strict';

var winston = require('winston');
var moment = require('moment');

function print_meta(meta) {
    let print_str = "";

    for (var i in meta) {
        if (meta.hasOwnProperty(i)) {
            print_str += `${i}:${meta[i]} |`;
        }
    }

    return print_str;
}

function setup_logger() {
    winston.loggers.add('default', {
        console: {
            level: 'debug',
            colorize: true,
            label: 'Default logger',
            timestamp: () => moment().format(),
            formatter: (options) => {
                return `${options.timestamp()} | ${options.level.toUpperCase()} | ` + 
                       `${options.message || ''} | ${print_meta(options.meta)}`;
            } 
        }
    });
}

module.exports = setup_logger;