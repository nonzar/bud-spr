app.controller('customersCtrl2', function ($rootScope, $scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function (page) {
            $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qaward", {
                openid: $scope.txtOpenid,
                edit: 1,
                type: 0,
                role: $rootScope.user.type,
                page: page == undefined ? $scope.pagination.page : $scope.pagination.jumpPage
            }, function (data) {
                console.log(data = JSON.parse(data));
                if (data.code == 0) {
                    alert(data.msg);
                    return;
                }
                $scope.pagination.page = data.data.curpage;
                $scope.pagination.total = data.data.totalpages;
                for (var i = 0; i < data.data.data.length; i++) {
                    data.data.data[i].obj = $rootScope.gifts[data.data.data[i].obj];
                }
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
    $scope.txtOpenid = "o7k0At5xSIdXErec82WB3VJ3P7Rc";
    $scope.inputPak = function ($event, id) {
        var pak = prompt("录入修改快递单号");
        if (!pak) {
            return;
        }
        $rootScope.port.editExpress({
            id: id,
            pak: pak
        }, function (data) {
            alert(data.msg);
            if (data.code == 0) {
                return;
            }
            $($event.target).parent().parent().find(".tdPackage").text(pak);
        });
    };
});
app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function (page) {
            $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qaward", {
                edit: $scope.filter.pkg,
                type: 0,
                role: $rootScope.user.type,
                page: page == undefined ? $scope.pagination.page : $scope.pagination.jumpPage
            }, function (data) {
                console.log(data = JSON.parse(data));
                if (data.code == 0) {
                    alert(data.msg);
                    return;
                }
                $scope.pagination.page = data.data.curpage;
                $scope.pagination.total = data.data.totalpages;
                for (var i = 0; i < data.data.data.length; i++) {
                    data.data.data[i].obj = $rootScope.gifts[data.data.data[i].obj];
                }
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
    $scope.filter = {
        pkg: 0
    };
    $scope.inputPak = function ($event, id) {
        var pak = prompt("录入修改快递单号");
        if (!pak) {
            return;
        }
        $rootScope.port.editExpress({
            id: id,
            pak: pak
        }, function (data) {
            alert(data.msg);
            if (data.code == 0) {
                return;
            }
            $($event.target).parent().parent().find(".tdPackage").text(pak);
        });
    };
});