let express = require('express');
let router = express.Router();
let tools = require('../tools/tool');

router.get('/', (req, res, next) => {
    let sql = `select * from user where email='${req.query.email}'`;
    let resObj = {};
    try {
        tools.openDB(sql, (err, data) => {
            console.log(data);
            if (!err) {
                if (data.length != 0) {
                    resObj.code = '202';
                    resObj.msg = '存在用户！'
                    resObj.data = data;
                } else {
                    resObj.code = '203';
                    resObj.msg = '不存在用户！'
                    resObj.data = [];
                }
                res.send(resObj);
            }
        })
    } catch (e) {
        resObj.code = '502';
        resObj.msg = '服务器错误！'
        resObj.data = [];
        res.send(resObj);
    }
})


router.post('/update', (req, res, next) => {
    let posted = JSON.parse(Object.keys(req.body));
    let sql = `UPDATE user SET password='${posted.password}' WHERE email='${posted.email}';`
    let resObj = {};
    try {
        tools.openDB(sql, (err, data) => {
            if (!err) {
                if (data.affectedRows == 1) {
                    resObj.code = '202';
                    resObj.msg = '修改密码成功！';
                    resObj.data = posted;
                }
            } else {
                resObj.code = '203';
                resObj.msg = '修改密码失败！'
                resObj.data = posted;
            }
            res.send(resObj);
        })
    } catch (e) {
        console.log(e)
        resObj.code = '502';
        resObj.msg = '服务器错误！'
        resObj.data = [];
        res.send(resObj);
    }
})

module.exports = router;