'use strict';
const log = require('npmlog')

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info' // weather debug mode

log.heading = 'sade'
log.addLevel('success', 2000, { fg: 'green', bold: true }); // add a level


module.exports = log;
