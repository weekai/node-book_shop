let express = require('express');
let router = express.Router();
let tools = require('../tools/tool')

router.get('/', (req, res, next) => {
    let sql = '';
    let obj = {};
    sql = `select * from book_list where cid='${req.query.cid}'`;
    tools.openDB(sql, (error, data) => {
        if (!error) {
            res.send(data);
        }else{
            res.send(obj)
        }
    })
})

module.exports = router;