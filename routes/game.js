const express = require('express')
const router = express.Router()
const Game = require('./../models/game')
const auth = require('./../middleware/auth')

router.post('/', auth, async (req, res) => {
    const game = new Game(req.body)
    try{
        await game.save()
        res.status(201).send(game)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/', auth, async (req, res) => {
    try{
        const games = await Game.find({})
                                .populate('genre')
        res.send(games)                        
    } catch (e){
        res.status(500).send()
    }
})

module.exports = router