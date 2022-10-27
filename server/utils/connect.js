const mongoose = require('mongoose')
const config = require('../config')

async function connect() {
  const mongoUri = config.mongoUri

  try {
    await mongoose.connect(mongoUri)
    console.log("DB connected")
  } catch (error) {
    console.error("Could not connect to db")
    process.exit(1)
  }
}

module.exports = connect
