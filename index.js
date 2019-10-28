// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();
//middleware
server.use(express.json()) //teaches express how to use JSON

// REQUEST/RESPONSE handlers

//insert user to db
server.post('/api/users', (req, res) => {
    const { name, bio } =  req.body

    if( !name || !bio ) {
        res.status(400).json({ error: 'Please provide name and bio for the user.' })
    } else {
        db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: 'There was an error while saving the user to the database' })
        })
    }
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(() => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        }
    })
    .catch(() => {
        res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.remove(userId)
    .then(user => {
        if(user) {
            res.status(201).json({ message: 'user was deleted'})
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        }
    })
    .catch(() => {
        res.status(500).json({ error: 'The user could not be removed'})
    })
})

// server.put('/api/users/:id', (req, res) => {

// })







const port = 8080;
server.listen(port, () => console.log(`\n=== API on port ${port} ===\n`))