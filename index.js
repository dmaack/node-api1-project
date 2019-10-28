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

// server.get('/api/users/:id', (req, res) => {

// })

// server.delete('/api/users/:id', (req, res) => {

// })

// server.put('/api/users/:id', (req, res) => {

// })







const port = 8080;
server.listen(port, () => console.log(`\n=== API on port ${port} ===\n`))