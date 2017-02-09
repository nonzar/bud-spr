var app = angular.module("app", []);
app.controller("ngCtrl", function ($rootScope, $scope) {
    $scope.txtCode = "";
    $scope.txtName = "";
    $scope.txtRegion = "";
    $scope.txtCity = "";
    $scope.qtype = [{value: 1, text: '中餐'}, {value: 2, text: '西餐'}, {value: 3, text: '夜场'}];
    $scope.txtQtype = "";
    $scope.radIsover = "";
    $scope.f_submit = function () {
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uspr", {
            spr: $scope.txtCode,
            // name: $scope.txtName,
            // region: $scope.txtRegion,
            // city: $scope.txtCity,
            qtype: $scope.txtQtype.value,
            isover: $scope.radIsover,
            ismain: $rootScope.user.type
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
        });
    };
    $scope.f_getInfo = function () {
        $rootScope.port.getSprInfo({
            sprCode: $scope.txtCode
        }, function (data) {
            if (data.code == 0) {
                alert(data.msg);
                return;
            }
            $scope.txtCode = data.data.code;
            $scope.txtName = data.data.name;
            $scope.txtRegion = data.data.region;
            $scope.txtCity = data.data.city;
            $scope.txtQtype = $scope.qtype[parseInt(data.data.type) - 1];
            $scope.radIsover = data.data.isover;
            $scope.$apply();
        });
    };
    var url_code = $rootScope.getURLParameter("code");
    console.log(url_code);
    if (url_code) {
        $scope.txtCode = url_code;
        $scope.f_getInfo();
    }
});