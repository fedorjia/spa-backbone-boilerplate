'use strict';
const express = require('express');
const util = require('util');
const path = require('path');
const settings = require('./settings');
const app = express();
const conf = require('./webapp/build/conf');
const remoteData = require('./webapp/static/asset/list.json');


app.get('/api/list', function (req, res, next) {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    let result = remoteData.filter((item) => {
        return item.id > skip;
    });

    result = result.slice(0, limit);
    res.json({success: true, result: result});
});


let index;
if(settings.debug) {
    index = conf.path.webapp + '/index.html';
    // static
    app.use('/static', express.static(path.resolve(__dirname, 'webapp/static'), {maxAge: 86400000 * 7}));
} else {
    index = conf.path.dist.root + '/index.html';
    app.use(express.static(__dirname + '/webapp/dist', {maxAge: 86400000 * 7}));
}

app.use(function(req, res) {
    // html5 push state
    res.sendFile(__dirname + '/' + index);
});

app.listen(settings.port);
util.log(settings['appname'] + ' runnng port:' + settings.port);
