const express = require('express')
const router = express.Router()
const Genre = require('./../models/genre')
const auth = require('./../middleware/auth')

router.post('/', auth, async (req, res) => {
    const genre = new Genre(req.body)
    try{
        await genre.save()
        res.status(201).send(genre)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router