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

router.get('/', async (req, res) => {
    try{
        const genres = await Genre.find({})
        res.send(genres)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const genre = await Genre.findById(_id)
        if(!genre) return res.status(404).send()
        res.send(genre)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const genre = await Genre.findByIdAndUpdate(_id,{name: req.body.name}, {new: true})
        if(!genre) return res.status(404).send()
        await genre.save()
        res.send(genre)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const genre = await Genre.findByIdAndDelete(_id)
        if(!genre) return res.status(404).send()
        res.send(genre)
    }catch (e){
        res.status(500).send()
    }
})

module.exports = router