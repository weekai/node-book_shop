// 解析cookie
function getCookie(cookieName) {
    var arr = document.cookie.split("; ");   //  ["uname=aaa","age=11"]
    for (var i = 0; i < arr.length; i++) {
        var brr = arr[i].split("=");    //  ["uname","aaa"]
        if (brr[0] === cookieName) {
            return brr[1];
        }
    }
    return null;
}


//解析地址栏查询参数
function query(str) {
    let searchObj = {};
    if (str.indexOf('?') != -1) {
        let str = search.substr(1);
        let strArr = str.split("&");
        for (let i in strArr) {
            let strArr1 = strArr[i].split('=');
            for (let i in strArr1) {
                searchObj[strArr1[0]] = unescape(strArr1[1]);
            }
        }
    }
    return searchObj;
}

// 设置登录状态样式
function setStatus() {
    // 默认退出按钮隐藏
    $("#logReg a:eq(1)").hide();
    // 存在用户cookie设置样式
    let uname = getCookie('username');
    if (uname != null) {
        $("#logReg a:eq(1)").show();
        $("#logReg a:eq(0)").attr('href', '#');
        $("#logReg a:eq(0)").html(`${uname}，已登录`);
        $("#logReg a:eq(2)").hide();
    }
}