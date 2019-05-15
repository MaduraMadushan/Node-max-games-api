const mongoose = require('mongoose')
const keys = require('./../config/keys')

mongoose.connect(keys.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})