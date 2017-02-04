app.controller('customersCtrl2', function ($scope) {
    $scope.txtSpr = "862094";
    $scope.confirmChange = function ($event) {
        alert("找不到此接口。");
    };
    $scope.cancelChange = function ($event) {
        alert("找不到此接口。");
    };
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
            switch (localStorage.getItem("userType")) {
                case "1"://mkt
                    alert("没有此接口。");
                    break;
                case "3"://ptl
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
    $scope.confirmChange = function ($event) {
        alert("找不到此接口。")
    };
    $scope.cancelChange = function ($event) {
        alert("找不到此接口。")
    };
    $scope.pagination.getPage();
});