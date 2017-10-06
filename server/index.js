const express = require('express');
const util = require('util');
const path = require('path');
const settings = require('./settings');
const app = express();
const nunjucks = require('nunjucks');

const router = require('./router');
const ENV = process.env.NODE_ENV;


let viewPath = path.resolve(__dirname, '../webapp/src');
let staticPath = path.resolve(__dirname, '../webapp/src/static');

if(ENV !== 'development') {
    staticPath = path.resolve(__dirname, '../webapp/dist/static');
    viewPath = path.resolve(__dirname, '../webapp/dist');
}

/*static*/
app.use('/static', express.static(staticPath, {maxAge: settings.staticMaxAge}));

/*template engine*/
nunjucks.configure(viewPath, {
    autoescape: true,
    noCache: ENV === 'development',
    express: app
});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

/*router*/
app.use(router);

// app.use(function(req, res) { // html5 push state
//     res.sendFile(__dirname + '/dist/index.html');
// });

/*start server*/
app.listen(settings.port);
util.log(settings['appname'] + ' runnng port:' + settings.port);
