const express = require('express')
require('./db/mongoose')
const user = require('./routes/user')
const genre = require('./routes/genre')

const app = express()

app.use(express.json())
app.use('/api/users', user)
app.use('/api/genres', genre)

module.exports = app