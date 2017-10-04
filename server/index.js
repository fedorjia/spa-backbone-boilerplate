const express = require('express');
const util = require('util');
const path = require('path');
const settings = require('./settings');
const app = express();
const nunjucks = require('nunjucks');

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

/* routers */
app.get('/api/list', (req, res, next) => {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    const remoteData = require('./list.json') || [];
    let result = remoteData.filter((item) => {
        return item.id > skip;
    });

    result = result.slice(0, limit);
    res.json({success: true, result: result});
});

app.get('/*', function(req, res) {
    res.render('index.html');
});

// app.use(function(req, res) { // html5 push state
//     res.sendFile(__dirname + '/dist/index.html');
// });

app.listen(settings.port);
util.log(settings['appname'] + ' runnng port:' + settings.port);
