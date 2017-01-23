if (!common.isLogin()) {
    window.location.href = "login.html";
}
var app = angular.module('app', []);
app.controller('customersCtrl', function ($scope) {
    $scope.ths = [
        // "#",
        "openid",
        "姓名",
        "电话",
        "地址"
    ];
    $(".wbSearch button").on("click", function () {
        Api.getOpenidInfo({
            openid: $(".wbSearch input[type='text']").val()
        }, function (data) {
            $scope.$apply(function () {
                data.data.type = Api.channel[data.data.type];
                $scope.tds = [data.data];
            });
        });
    });
});
$(function () {
    var url_openid = common.getURLParameter("openid");
    console.log(url_openid);
    if (url_openid) {
        $(".wbSearch input[type='text']").val(url_openid);
        $(".wbSearch button").click();
    }
});
