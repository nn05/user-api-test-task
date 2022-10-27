const { getLogs, deleteLogs } = require('../utils/logger')

async function getLogsHandler(req, res) {
    const responce = await getLogs()
    if (responce.success) {
        return responce
    } else {
        res.status(500)
        return responce
    }
}

async function deleteLogsHandler(req, res) {
    const responce = await deleteLogs();
    if (responce.success) {
        return responce
    } else {
        res.status(500)
        return responce
    }
}

exports.getLogsHandler = getLogsHandler
exports.deleteLogsHandler = deleteLogsHandler
