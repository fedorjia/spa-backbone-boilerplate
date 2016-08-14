'use strict';
const express = require('express');
const util = require('util');
const settings = require('./settings');
const app = express();

app.use(express.static(__dirname + '/public',{ maxAge: 86400000*7 }));

app.use(function(req, res) {
    // html5 push state
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(settings.port);
util.log(settings['appname'] + ' runnng port:' + settings.port);