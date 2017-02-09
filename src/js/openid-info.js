app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.openid = null;
    $scope.search = function () {
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qopenid", {
            openid: $scope.openid
        }, function (data) {
            console.log(data = JSON.parse(data));
            data.data.type = $rootScope.getChannelName(parseInt(data.data.type));
            $scope.tds = [data.data];
            $scope.$apply();
        });
    };

    var url_openid = $rootScope.getURLParameter("openid");
    if (url_openid) {
        $scope.openid = url_openid;
        $scope.search();
    }
});