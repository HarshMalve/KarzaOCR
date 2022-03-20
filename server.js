const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const debug = require('debug')('app4:server');
const expressFileUpload = require('express-fileupload');
app.use(express.urlencoded({
    limit: '25mb',
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({
    limit: '25mb',
    type: ['application/json', 'text/*'],
    verify: (req, res, buff) => {
        try {
            req.rawBody = JSON.parse(buff.toString());
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}));
app.use(expressFileUpload({
    createParentPath: true,
    preserveExtension: 4
}))
// SET DEFAULT HEADERS
app.use(require('./middlewares/header').responseHeader);

// ROUTNG
app.use('/karza', require('./routes/karza.router'));

const http = require('http');
const https = require('https');
const port = normalizePort(process.env.PORT || 3000);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
};

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;
    
    switch (error.code) {
        case 'EACCESS':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
        default:
            throw error;
    }
};

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port;
    debug('listening on ' + bind);
    console.log(`Listening on ${port}`);
}
