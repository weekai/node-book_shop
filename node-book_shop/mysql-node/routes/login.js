let express = require('express');
let router = express.Router();

let User = require('../model/User');
let tools = require('../tools/tool');

router.post('/', (req, res) => {
    let posted = JSON.parse(Object.keys(req.body));

    let user = new User(posted.uname, posted.upwd, posted.utel, posted.ugender, posted.signtime);
    let = sql = `select * from user where name='${user.username}' and password='${user.password}'`;

    let resObj = {};

    let h_promise = tools.queryDB(sql);

    // 查询数据库中是否含有此用户
    h_promise.then(rows => {
        if (rows.length != 0) {
            resObj.code = '202';
            resObj.msg = '登陆成功！';
            resObj.data = {
                username: posted.uname
            };
            res.send(resObj);
        } else {
            sql = `select * from user where name='${user.username}'`;
            let n_promise = tools.queryDB(sql);

            n_promise.then(rows => {
                if (rows.length != 0) {
                    resObj.code = '203';
                    resObj.msg = '用户名或密码错误！';
                    resObj.data = {
                        username: posted.uname
                    }
                } else {
                    resObj.code = '204';
                    resObj.msg = '不存在此用户！';
                    resObj.data = {
                        username: posted.uname
                    }
                }
                res.send(resObj);
            })
        }
    })
})

module.exports = router;
