let express = require('express');
let router = express.Router();

let User = require('../model/User');
let tools = require('../tools/tool');


router.post('/', (req, res, next) => {
    let posted = JSON.parse(Object.keys(req.body));
    let user = new User(posted.uname, posted.upwd, posted.utel, posted.uemail, posted.ugender, posted.signtime);
    //查询存在用户否sql
    let qy_sql = `select * from user where name='${user.username}'`;
    //插入用户sql
    let add_sql = `insert into user(name,password,telphone,email,gender,signtime) values('${user.username}', '${user.password}', '${user.tel}', '${user.email}', '${user.gender}','${user.signtime}')`;

    qyUser(qy_sql, add_sql, function (resObj) {
        res.send(resObj);
    }, posted);
});

function qyUser(qy_sql, add_sql, fn, posted) {
    let resObj = {};
    try {
        tools.openDB(qy_sql, (err, rows) => {
            if (!err) {
                if (rows.length != 0) {
                    resObj.code = '203';
                    resObj.msg = '用户名重复！';
                    resObj.data = {
                        username: posted.uname
                    }
                    return fn(resObj);
                } else {
                    // 添加用户
                    addUser(add_sql, resObj => {
                        return fn(resObj);
                    });
                }
            }
        })
    } catch (e) {
        resObj.code = '502';
        resObj.msg = '系统查询错误:注册失败！';
        resObj.data = {
            username: ''
        }
        return fn(resObj);
    }
}


function addUser(add_sql, fn) {
    let resObj = {};
    try {
        tools.openDB(add_sql, (err, rows) => {
            if (!err) {
                if (rows.affectedRows == '1') {
                    resObj.code = '202';
                    resObj.msg = '注册成功！';
                    resObj.data = {
                        username: rows.uname
                    }
                    return fn(resObj);
                }
            }
        })
    } catch (e) {
        resObj.code = '503';
        resObj.msg = '系统添加错误:注册失败！';
        resObj.data = {
            username: ''
        }
        return fn(resObj);
    }
}

module.exports = router;
