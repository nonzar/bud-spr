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