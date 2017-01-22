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
    userType: {
        ptl: 0,
        mkt: 1
    },
    ptl: {},
    mkt: {},
    courier: {}
};
//设置openid为可疑
Api.ptl.setOpenidForIllicit = function (para, callback) {
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
        openid: para.openid,
        type: 0,
        main: Api.userType.ptl
    }, function (data) {
        console.log(data = JSON.parse(data));
        if (callback) {
            callback(data);
        }
    });
};