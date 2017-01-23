var common = {
    getURLParameter: function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
};
var Api = {
    channel: {
        "1":"中餐",
        "2":"晚餐",
        "3":"夜店"
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
        ismain: para.ismain
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};
//设置openid为可疑
Api.setOpenidForIllicit = function (para, callback) {
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
        openid: para.openid,
        type: 0,
        main: para.usertype
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};
//排除可疑openid
Api.setOpenidForLegal = function (para, callback) {
    // debugger;
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
        openid: para.openid,
        type: 1,
        main: para.usertype
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};

//取消openid积分
Api.cancleIntegral = function (para, callback) {
    // debugger;
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
        openid: para.openid,
        type: 2,
        main: para.usertype
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};
//获取ptl名下促销员
Api.getAllSpr = function (para, callback) {
    $.post(para.ptl ? "http://120.77.53.178/baiwei/baiweistat.php/home/index/qptl" : "http://120.77.53.178/baiwei/baiweistat.php/home/index/qmain", {
        ptl: para.ptlName,
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




