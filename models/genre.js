const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    }
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre