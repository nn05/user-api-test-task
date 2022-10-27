const express = require('express')
const { createUserHandler,
            getLogsHandler,
            deleteLogsHandler
       } = require('../../controllers/logs.controller')

const router = express.Router()

router.get('/', async (req, res) => {
    const result = await getLogsHandler(req, res)
    res.json(result)
})

router.delete('/', async (req, res) => {
    const result = await deleteLogsHandler(req, res)
    res.json(result)
})

module.exports = router
