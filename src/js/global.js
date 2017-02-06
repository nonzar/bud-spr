var common = {
    userIndexUrl: {//用户类型对应之首页
        "1": "illicit-list.html",//市场部
        "2": "gift-records.html",//快递
        "3": "illicit-list.html"//ptl
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
            if (data.code == 0) {
                alert(data.msg);
                return;
            }
            window.location.href = "login.html";
        });
    }
};
var Api = {
    channel: {
        "1": "中餐",
        "2": "西餐",
        "3": "夜场"
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


var app = angular.module('app', []).run(function ($rootScope) {
    $rootScope.debug = parseInt(localStorage.getItem("debug"));
    $rootScope.userType = {
        mkt: 1,
        courier: 2,
        ptl: 3
    };
    $rootScope.gifts = [
        "iPhone7",
        "小米平衡车",
        "Insta360 Nano全景相机",
        "科沃斯智能扫地机器人",
        "携程任我行1000元面值卡",
        "索尼可穿戴式运动防水耳机",
        "香港迪士尼门票",
        "米家小白智能摄像机",
        "伊莱克斯true-love电炖锅",
        "飞利浦吸尘器",
        "飞利浦车载净化器",
        "西铁城全自动数字腕式血压计",
        "小米盒子",
        "米奇多功能U型枕",
        "加油卡",
        "手机充电宝",
        "加油优惠卡",
        "鸡年高升碗套装",
        "自拍杆",
        "手机扣子",
        "手机磁贴",
        "绅士牌花生"
    ];
    $rootScope.dateColors = [
        "#FAFAD2",
        "#F8F8FF",
        "#F5F5DC",
        "#F2F2F2",
        "#F0F0F0",
        "#EEEED1",
        "#EEE8CD",
        "#EEE0E5",
        "#EED5D2",
        "#EECBAD",
        //max
        "#FAFAD2",
        "#F8F8FF",
        "#F5F5DC",
        "#F2F2F2",
        "#F0F0F0",
        "#EEEED1",
        "#EEE8CD",
        "#EEE0E5",
        "#EED5D2",
        "#EECBAD",
        //max
        "#FAFAD2",
        "#F8F8FF",
        "#F5F5DC",
        "#F2F2F2",
        "#F0F0F0",
        "#EEEED1",
        "#EEE8CD",
        "#EEE0E5",
        "#EED5D2",
        "#EECBAD",
        //max
        "#FAFAD2"
    ];
    //用户信息
    $rootScope.user = {};
    $rootScope.user.type = parseInt(localStorage.getItem("userType"));
    $rootScope.user.name = localStorage.getItem("userName");
});
app.controller("ctrlSidebar", function ($rootScope, $scope) {
});

$(function () {
    if (!common.isLogin()) {
        if (window.location.href.indexOf("login.html") == -1) {
            window.location.href = "login.html";
        }
    }
    $("#userName").text(localStorage.getItem("userName"));
});
