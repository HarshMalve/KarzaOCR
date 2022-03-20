'use strict';

module.exports = {
    responseHeader: (req, res, next) => {
        res.set('X-XSS-Protection', '1; mode=block');
        res.set('x-frame-options', 'DENY');
        res.set('x-content-type-options', 'nosniff');
        res.set('Server', '');
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', 'true');
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.set('X-Powered-By', '');
        res.set('Content-Type', 'application/json');
        next();
    }
};