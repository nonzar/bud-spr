
var ctrl = {}, app = angular.module("app", []);
app.controller("ngCtrl", function ($scope) {
    ctrl.$scope = $scope;
    $scope.txtCode = "006494";
    $scope.txtName = "";
    $scope.txtRegion = "";
    $scope.txtCity = "";
    $scope.txtQtype = "";
    $scope.radIsover = "";
    $scope.f_submit = function () {
        Api.setSprInfo({
            code: $scope.txtCode,
            name: $scope.txtName,
            region: $scope.txtRegion,
            city: $scope.txtCity,
            qtype: $scope.txtQtype,
            isover: $scope.radIsover
        }, function (data) {
            // debugger;
            alert(data.msg);
        });
    };
    $scope.f_getInfo = function () {
        Api.getSprInfo({
            sprCode: $("#code").val()
        }, function (data) {
            if (data.code == 0) {
                alert(data.msg);
                return;
            }
            // debugger;
            $scope.txtCode = data.data.code;
            $scope.txtName = data.data.name;
            $scope.txtRegion = data.data.region;
            $scope.txtCity = data.data.city;
            $scope.txtQtype = data.data.type;
            $scope.radIsover = data.data.isover;
            $scope.$apply();
        });
    };
    var url_code = common.getURLParameter("code");
    console.log(url_code);
    if (url_code) {
        $scope.txtCode = url_code;
        $scope.$apply();
        $scope.f_getInfo();
    }
});