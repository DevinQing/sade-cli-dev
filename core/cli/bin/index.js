#! /usr/bin/env node

const importLocal = require('import-local')
const log = require('@sade-cli-dev/log')

// load the local cli first if available.
if (importLocal(__filename)) {
    log.info('sade-cli-dev', 'using local version of sade')
} else {
    require('../lib/index')(process.argv.slice(2))
}
