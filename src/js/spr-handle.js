app.controller('customersCtrl2', function ($scope) {
    $scope.txtSpr = "";
    $scope.getSprInfo = function () {
        Api.getSprInfo({
            sprCode: $scope.txtSpr
        }, function (data) {
            if (data.code == 0) {
                alert(data.msg);
                return;
            }
            data.data.type = Api.channel[data.data.type];
            $scope.tds = [data.data];
            $scope.$apply();
        });
    };
});

app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function () {
            switch ($rootScope.user.type) {
                case $rootScope.userType.mkt:
                    // $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qspr1", {
                    //     page: $scope.pagination.page
                    // }, function (data) {
                    //     console.log(data = JSON.parse(data));
                    //     if (data.code == 0) {
                    //         alert(data.msg);
                    //         return;
                    //     }
                    //     $scope.pagination.page = data.data.curpage;
                    //     $scope.pagination.total = data.data.totalpages;
                    //     for (var i = 0; i < data.data.data.length; i++) {
                    //         data.data.data[i].type = Api.channel[data.data.data[i].type];
                    //     }
                    //     $scope.tds = data.data.data;
                    //     $scope.$apply();
                    // });
                    break;
                case $rootScope.userType.ptl:
                    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qptl", {
                        ptl: $rootScope.user.name,
                        page: $scope.pagination.page
                    }, function (data) {
                        console.log(data = JSON.parse(data));
                        if (data.code == 0) {
                            alert(data.msg);
                            return;
                        }
                        $scope.pagination.page = data.data.curpage;
                        $scope.pagination.total = data.data.totalpages;
                        for (var i = 0; i < data.data.data.length; i++) {
                            data.data.data[i].type = Api.channel[data.data.data[i].type];
                        }
                        $scope.tds = data.data.data;
                        $scope.$apply();
                    });
                    break;
                default:
            }
        },
        getPrevPage: function () {
            if ($scope.pagination.total == -1) {
                return;
            }
            if ($scope.pagination.page <= 1) {
                alert("已经是第一页。");
                return;
            }
            $scope.pagination.page--;
            $scope.pagination.getPage();
        },
        getNextPage: function () {
            if ($scope.pagination.total == -1) {
                return;
            }
            else if ($scope.pagination.page >= $scope.pagination.total) {
                alert("已经是最后一页。");
                return;
            }
            $scope.pagination.page++;
            $scope.pagination.getPage();
        }
    };
    $scope.pagination.getPage();
});