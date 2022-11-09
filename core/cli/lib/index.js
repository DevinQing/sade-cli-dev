'use strict'

module.exports = core

const { LOWEST_NODE_VERSION, DEFAULT_CACHE_PATH } = require('./const')
const pkg = require('../package.json')
const log = require('@sade-cli-dev/log')
const { getNpmLatestVersion } = require('@sade-cli-dev/get-npm-info')

const { homedir } = require('os')
const { existsSync } = require('fs')
const path = require('path')
const { compareVersions } = require('compare-versions')
const colors = require('colors')
const downgradeRoot = require('downgrade-root')
const dotenv = require('dotenv')

function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHomeExist()
        checkEnv()
        checkGlobalUpdate()
    } catch (e) {
        console.log('err');
        log.error(e.message)
    }
}

async function checkGlobalUpdate() {
    const currentVersion = pkg.version
    const pkgName = pkg.name
    try {
        // tag: when i has published, i would replace pkgName
        const latestVersion = await getNpmLatestVersion('colors')
        if (compareVersions(currentVersion, latestVersion) < 0) {
            log.warn(`please update ${pkgName}, the latest version: ${latestVersion}, your version: ${currentVersion}
                you can run:  npm update ${pkgName}.
            `.yellow)
        }
    } catch (err) {
        log.error(err)
    }
}

function checkEnv() {
    const envPath = path.resolve(homedir(), '.env')
    if (existsSync(envPath)) {
        let result = dotenv.config({ path: envPath })
        if (result.error) {
            throw result.error
        }
    }
    createDefaultConfig()
}

function createDefaultConfig() {
    // create default cache path
    if (!process.env.DEFAULT_CACHE_PATH) {
        process.env.DEFAULT_CACHE_PATH = DEFAULT_CACHE_PATH
    }
}

// the cached files need to be in the home directory
function checkUserHomeExist() {
    if (!homedir() || !existsSync(homedir())) {
        throw new Error('The home directory of current login user dose not exist!'.red)
    }
}

// Try to downgrade the permissions of a process with root privileges
function checkRoot() {
    downgradeRoot()
}

function checkNodeVersion() {
    const currentNodeVersion = process.version
    const lowestNodeVersion = LOWEST_NODE_VERSION
    if (compareVersions(currentNodeVersion, lowestNodeVersion) < 0) {
        throw new Error(`sade-cli-dev requires at least ${lowestNodeVersion} node version`.red)
    }
}

function checkPkgVersion() {
    log.info('cli', pkg.version);
}



