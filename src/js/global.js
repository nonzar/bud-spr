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
    ptl: {},
    mkt: {},
    courier: {}
};
Api.ptl.setOpendForIllicit = function (callback) {
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
        type: 0,
        main: 0
    }, function (data) {
        if (callback) {
            callback();
        }
    });
};