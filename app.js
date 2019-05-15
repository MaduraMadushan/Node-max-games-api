const express = require('express')
require('./db/mongoose')

const user = require('./routes/user')
const genre = require('./routes/genre')
const game = require('./routes/game')

const app = express()

app.use(express.json())

app.use('/api/users', user)
app.use('/api/genres', genre)
app.use('/api/games', game)

module.exports = app