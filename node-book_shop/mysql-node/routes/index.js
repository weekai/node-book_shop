let express = require('express');
let router = express.Router();
let tools = require('../tools/tool');

let sql = '';

router.get('/', (req, res, next) => {
  sql = 'select * from book_type'
  tools.openDB(sql, (error, data) => {
    if (!error) {
      res.send(data);
    }
  })
});

router.post('/', (req, res, next) => {
  let resObj = {}
  sql = `select * from book_list where cid='242'`;
  tools.openDB(sql, (error, data) => {
    if (!error) {
      resObj.code = '202';
      resObj.msg = '读取数据成功！';
      resObj.data = data;
      res.send(data);
    }
  })
});

module.exports = router;