const express = require('express');
const util = require('util');
const path = require('path');
const settings = require('./settings');
const app = express();
const nunjucks = require('nunjucks');

const routers = require('./controller');

const ENV = process.env.NODE_ENV;

/*static path*/
let staticPath = path.resolve(__dirname, '../webapp/src/static');
if(ENV !== 'development') {
    staticPath = path.resolve(__dirname, '../webapp/dist');
}
app.use('/static', express.static(staticPath, {maxAge: settings.staticMaxAge}));

/*template engine*/
nunjucks.configure('./server/view', {
    autoescape: true,
    noCache: ENV === 'development',
    express: app
});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// app.use(function(req, res) {
//     // html5 push state
//     res.sendFile(__dirname + '/' + index);
// });

// routers
app.use(routers);

app.listen(settings.port);
util.log(settings['appname'] + ' runnng port:' + settings.port);
