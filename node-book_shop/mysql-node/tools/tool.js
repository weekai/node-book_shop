const mysql = require('mysql');
const db_config = require('../config/db_config')

// 连接并操作数据库
exports.openDB = function (sql, fn) {
    let conn = mysql.createConnection(db_config)
    conn.connect();
    conn.query(sql, function (error, data) {
        fn(error, data);
    });
    conn.end();
}

// 封装异步查询数据库方法
exports.queryDB = function queryDB(sql) {
    return new Promise((resolve, reject) => {
        // 创建连接池
        let pool = mysql.createPool(db_config);
        // 通过连接池创建连接
        pool.getConnection((error, connection) => {
            if (error) reject(error);   //连接失败
            else {
                // 查询操作
                connection.query(sql, (error, rows) => {
                    // 执行完查询，释放连接
                    connection.release();
                    // 处理查询错误
                    if (error) {
                        reject(error)
                    } else {
                        // 返回结果
                        resolve(rows);
                    }
                })
            }
        })
    })
}
