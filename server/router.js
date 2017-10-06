const express = require('express');
const router = express.Router({mergeParams: true});

/* routers */
router.get('/api/list', (req, res, next) => {
    const skip = req.query.skip || 'null';
    const limit = Number(req.query.limit || 10);
    const remoteData = require('./list.json') || [];

    let result = remoteData;
    if(skip !== 'null') {
        result = remoteData.filter((item) => {
            return item.id < skip;
        });
    }

    let after = null;
    let before = null;
    result = result.slice(0, limit);
    if(result.length > 0) {
        before = result[0].id;
        after = result[result.length-1].id;
    }

    res.json({
        status: 200,
        body: {
            "pagination": {
                "before": before,
                "after": after
            },
            "data": result
        }
    });
});

/*other router handler*/
router.get('**', function(req, res) {
    res.render('index.html');
});

module.exports = router;
