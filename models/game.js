const mongooose = require('mongoose')

const gameSchema = mongooose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    genre:{
        type: mongooose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
    },
    platform:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    imagecover:{
        type: String,
        required: true
    }
},{timestamps: true})

const Game = mongooose.model('Game', gameSchema)

module.exports = Game