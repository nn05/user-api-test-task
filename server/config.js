require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  mongoUri: process.env.MONGO_URI,
  logsFile: `${__dirname}/data/api.log`
}

module.exports = options
