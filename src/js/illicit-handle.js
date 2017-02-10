app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function (page) {

            $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qwarn", {
                page: page == undefined ? $scope.pagination.page : $scope.pagination.jumpPage,
                name: $rootScope.user.name,
                type: $rootScope.user.type
            }, function (data) {
                console.log(data = JSON.parse(data));
                if (data.code == 0) {
                    alert(data.msg);
                    return;
                }
                $scope.pagination.page = data.data.curpage;
                $scope.pagination.total = data.data.totalpages;
                $scope.tds = data.data.data;
                $scope.$apply();
            });
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
    $scope.setLegal = function ($event, openid) {
        if ($event.target.classList.contains("disabled")) {
            return;
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
            openid: openid,
            type: 1,
            main: $rootScope.user.type
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
            if (data.code != 0) {
                $event.target.classList.add("disabled");
            }
        });
    };
    $scope.cancleIntegral = function ($event, openid) {
        if ($event.target.classList.contains("disabled") || !confirm("确定取消积分吗？")) {
            return;
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
            openid: openid,
            type: 2,
            usertype: $rootScope.userType.mkt
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
            if (data.code != 0) {
                $event.target.classList.add("disabled");
            }
        });
    };
    $scope.pagination.getPage();
});