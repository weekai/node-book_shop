let express = require('express');
let router = express.Router();
let tools = require('../tools/tool');

router.get('/', (req, res, next) => {
    let sql = `select * from book_list where cid='${req.query.cid}' and title='${req.query.bName}';`
    tools.openDB(sql, (error, data) => {
        if (!error) {
            res.send(data);
        }
    })
})

module.exports = router;