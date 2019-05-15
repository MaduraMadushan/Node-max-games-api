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

router.get('/', async (req, res) => {
    const sort = {}
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let skip = req.query.skip? parseInt(req.query.skip) : 0
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        const games = await Game.find({})
                                .populate('genre')
                                .sort(sort)
                                .limit(limit)
                                .skip(skip)
                                .exec()
        res.send(games)                        
    } catch (e){
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const game = await Game.findById(_id).populate('genre')
        if(!game) return res.status(404).send()
        res.send(game)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'genre', 'platform', 'price', 'image', 'imagecover']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({error: 'Invalid updates!'})

    try{
        const game = await Game.findById(_id)
        if(!game) return res.status(404).send()
        updates.forEach((update) => game[update] = req.body[update])
        await game.save()
        res.send(game)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const game = await Game.findByIdAndDelete(_id)
        if(!game) return res.status(404).send()
        res.send(game)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router