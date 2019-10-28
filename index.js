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
        res.status(400).json({ error: 'Please provide a name and bio for your user'})
    } else {
        db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: 'Error saving the user to our database'})
        })
    }
})

// server.get('/api/users', (req, res) => {

// })

// server.get('/api/users/:id', (req, res) => {

// })

// server.delete('/api/users/:id', (req, res) => {

// })

// server.put('/api/users/:id', (req, res) => {

// })







const port = 8080;
server.listen(port, () => console.log(`\n=== API on port ${port} ===\n`))