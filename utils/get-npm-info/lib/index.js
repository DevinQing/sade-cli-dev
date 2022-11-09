'use strict';
const axios = require('axios');
const { compareVersions } = require('compare-versions');

function getNpmInfo(npmName, registry = 'https://registry.npmjs.org') {
    if (!npmName) return null
    const npmInfoUrl = new URL(npmName, registry).href
    return axios({
        method: 'get',
        url: npmInfoUrl
    }).then(res => {
        const { status, data } = res
        if (status === 200) {
            return data
        }
        return null
    }).catch(() => {
        return Promise.reject('failed to get npm package information')
    })
}

async function getNpmVersions(npmName, registry = 'https://registry.npmjs.org') {
    const data = await getNpmInfo(npmName, registry)
    const versions = Object.keys(data.versions)
    return versions || []
}

async function getNpmLatestVersion(npmName, registry = 'https://registry.npmjs.org') {
    const versions = await getNpmVersions(npmName, registry)
    let lastVersion = null
    if (versions && Array.isArray(versions)) {
        lastVersion = versions.sort((a, b) => compareVersions(b, a))[0]
    } 
    return lastVersion
}





module.exports = {
    getNpmInfo,
    getNpmVersions,
    getNpmLatestVersion
}

