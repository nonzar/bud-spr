var common = {
    userIndexUrl: {
        "1": "mkt_illicit_1.html",//市场部
        "2": "courier_gift_records.html",//快递
        "3": "ptl_illicit_1.html"//ptl
    },
    loginValidityTime: 1 * 24 * 60 * 60 * 1000,
    getURLParameter: function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    },
    isLogin: function () {
        // debugger;
        if (!localStorage.getItem("userType") || !localStorage.getItem("userName") || !localStorage.getItem("loginTime")) {
            return false;
        }
        if ((parseInt(localStorage.getItem("loginTime")) + common.loginValidityTime) < +new Date()) {
            return false;
        }
        return true;
    },
    loginOut: function () {
        $.post("http://120.77.53.178/baiwei/baiweistat.php/Home/Index/logout", {}, function (data) {
            console.log(data = JSON.parse(data));
            localStorage.setItem("userType", "");
            localStorage.setItem("userName", "");
            localStorage.setItem("loginTime", "");
            alert(data.msg);
            window.location.href = "login.html";
        });
    }
};
var Api = {
    channel: {
        "1": "中餐",
        "2": "晚餐",
        "3": "夜店"
    },
    userType: {
        ptl: 0,
        mkt: 1
    },
    ptl: {},
    mkt: {},
    courier: {}
};
//获取spr信息
Api.getSprInfo = function (para, callback) {
    // debugger;
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qspr", {
        spr: para.sprCode
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};
//修改spr信息
Api.setSprInfo = function (para, callback) {
    // debugger;
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uspr", {
        spr: para.code,
        name: para.name,
        region: para.region,
        city: para.city,
        qtype: para.qtype,
        isover: para.isover,
        ismain: localStorage.getItem("userType")
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};
Api._setOpenid = function (para, callback) {
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
        openid: para.openid,
        type: para.type,
        main: localStorage.getItem("userType")
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};
//设置openid为可疑
Api.setOpenidForIllicit = function (para, callback) {
    para.type = 0;
    Api._setOpenid(para, callback);
};
//排除可疑openid
Api.setOpenidForLegal = function (para, callback) {
    para.type = 1;
    Api._setOpenid(para, callback);
};

//取消openid积分
Api.cancleIntegral = function (para, callback) {
    para.type = 2;
    Api._setOpenid(para, callback);
};
//获取ptl名下促销员
Api.getAllSpr = function (para, callback) {
    $.post(para.ptl ? "http://120.77.53.178/baiwei/baiweistat.php/home/index/qptl" : "http://120.77.53.178/baiwei/baiweistat.php/home/index/qmain", {
        ptl: localStorage.getItem("userName"),
        page: para.page
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};

//修改快递资料
Api.editExpress = function (para, callback) {
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/upak", {
        id: para.id,
        pak: para.pak
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};

//获取Openid详情
Api.getOpenidInfo = function (para, callback) {
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qopenid", {
        openid: para.openid
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};




