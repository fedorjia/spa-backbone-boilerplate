const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/', function(req, res) {
    res.render('index.html');
});

router.use('/api/list', (req, res, next) => {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    const remoteData = require('./list.json') || [];
    let result = remoteData.filter((item) => {
        return item.id > skip;
    });

    result = result.slice(0, limit);
    res.json({success: true, result: result});
});

module.exports = router;
