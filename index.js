'use strict';
const express = require('express');
const util = require('util');
const settings = require('./settings');
const app = express();

app.use(express.static(__dirname + '/public',{ maxAge: 86400000*7 }));

app.listen(settings.port);
util.log(settings['appname'] + ' runnng port:' + settings.port);