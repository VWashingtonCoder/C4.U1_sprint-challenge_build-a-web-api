const express = require('express');
const cors = require('cors');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');


const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(cors());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Projects & Actions API</h2>
        <p>Welcome to the Projects & Actions API</p>
    `);
})
module.exports = server;
