const fs = require('fs/promises')
const config = require('../config')

const logsFile = config.logsFile

function appendToLog(message, data) {
    try {
        fs.appendFile(logsFile, `${JSON.stringify({ date: new Date(), message, data })}\n`, { encoding: 'utf8' })
    } catch (error) {
        console.error(error)
    }
}

async function deleteLogs() {
    try {
        await fs.rm(logsFile)
        return { success: true }
    } catch (error) {
        return { success: false, error }
    }
}

async function getLogs() {
    try {
        const logsData = await fs
            .readFile(logsFile, { encoding: 'utf8' })
            .then((data) => data.split('\n'))
            .then((arr) =>
                arr.reduceRight((acc, item) => {
                    if (item) {
                        return [...acc, JSON.parse(item)]
                    }
                    return acc
                }, [])
            )
        return { success: true, data: logsData }
    } catch (error) {
        return { success: false, error }
    }
}

exports.appendToLog = appendToLog
exports.deleteLogs = deleteLogs
exports.getLogs = getLogs
