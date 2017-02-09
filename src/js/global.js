var app = angular.module('app', []).run(function ($rootScope) {
    $rootScope.debug = parseInt(localStorage.getItem("debug"));
    $rootScope.getChannelName = function (type) {
        switch (type) {
            case 1:
                return "中餐";
                break;
            case 2:
                return "西餐";
                break;
            case 3:
                return "夜场";
                break;
            default:
        }
    };
    $rootScope.userIndexUrl = {
        "1": "illicit-list.html",
        "2": "gift-records.html",
        "3": "illicit-list.html"
    };
    $rootScope.userType = {
        mkt: 1,
        courier: 2,
        ptl: 3
    };
    $rootScope.products = {
        0: '百威大瓶/500ml罐3支/罐',
        1: '百威大瓶/500ml罐6支/罐',
        2: '百威大瓶/500ml罐12支/罐',
        3: '纯生大瓶3支',
        4: '纯生大瓶6支',
        5: '纯生大瓶12支',
        6: '金樽大瓶3支',
        7: '金樽大瓶6支',
        8: '金樽大瓶12支',
        9: '百威500ml扎杯1杯',
        10: '百威500ml扎杯2杯',
        11: '百威500ml扎杯4杯',
        12: '百威罐/小瓶1打啤酒',
        13: '百威罐/小瓶2打啤酒',
        14: '百威罐/小瓶4打啤酒',
        15: '百威生啤3L 1扎',
        16: '百威生啤2扎',
        17: '百威生啤4扎',
        18: '百威罐/小瓶1打啤酒',
        19: '百威罐/小瓶2打啤酒',
        20: '百威罐/小瓶4打啤酒',
        21: '新锐罐/纯生1打',
        22: '新锐罐/纯生2打',
        23: '新锐罐/纯生4打',
        24: '铝瓶1打',
        25: '铝瓶2打',
        26: '铝瓶4打'
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
    //----------常用方法
    //获取url参数
    $rootScope.getURLParameter = function (sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    };
    //判断登录
    $rootScope.isLogin = function () {
        if (!localStorage.getItem("userType") || !localStorage.getItem("userName") || !localStorage.getItem("loginTime")) {
            return false;
        }
        if ((parseInt(localStorage.getItem("loginTime")) + 1 * 24 * 60 * 60 * 1000) < +new Date()) {
            return false;
        }
        return true;
    };
    //退出登录
    $rootScope.loginOut = function () {
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
    };
    //---------------接口
    $rootScope.port = {};
    //获取spr信息
    $rootScope.port.getSprInfo = function (para, callback) {
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
    //修改快递资料
    $rootScope.port.editExpress = function (para, callback) {
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
    //--------------------用户信息
    $rootScope.user = {};
    $rootScope.user.type = parseInt(localStorage.getItem("userType"));
    $rootScope.user.name = localStorage.getItem("userName");
    //--------------------开始
    if (!$rootScope.isLogin()) {
        if (window.location.href.indexOf("login.html") == -1) {
            window.location.href = "login.html";
        }
    }
    $("#userName").text($rootScope.user.name);
});
app.controller("ctrlSidebar", function ($rootScope, $scope) {
});
