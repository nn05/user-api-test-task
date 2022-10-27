const express = require('express')

const usersRouter = require('./routes/api/users')
const logsRouter = require('./routes/api/logs')
const config = require('./config')
const connect = require('./utils/connect')

function createServer() {
    const app = express();
  
    app.use(express.json())

    app.use('/api/v1/users', usersRouter)
    app.use('/api/v1/logs', logsRouter)
    
    return app;
}

const port = config.PORT || 8090
const app = createServer()

app.listen(port, async function () {
    console.log(`Server running on ${port}`)
    await connect()
})