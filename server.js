const express = require('express');
const helmet = require('helmet');
const cohorts = require('./resources/cohortsRoutes');
const students = require('./resources/studentsRoutes');


// creates my express application
const server = express();

// specify middleware to be used and on what routes
server.use(helmet());
server.use('/api/cohorts', logger, cohorts)
server.use('/api/students', logger, students)

// landing page - confirm ive hit my root route
server.get('/', (req, res) => {
    res.send(`<h1> online!</h1>`)
});

// middleware
function logger(req, res, next) {
    console.log(`${req.method} request to route ${req.url} at [${new Date().toISOString()}]`);
    next();
}

module.exports = server;