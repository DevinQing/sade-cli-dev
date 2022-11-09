const { homedir } = require('os')
const path = require('path')

exports.LOWEST_NODE_VERSION = '12.0.0'
exports.DEFAULT_CACHE_PATH = path.resolve(homedir(), 'SADE_CLI')
