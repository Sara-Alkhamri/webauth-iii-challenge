const express = require('express')

const authRouter = require('./auth/auth-router')
const server = express();

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('Server up!')
})

module.exports = server;