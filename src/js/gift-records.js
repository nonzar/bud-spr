app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.filter = {};
    $scope.filter.pkg = 2;
    $scope.ths = [
        '记录id',
        'openid',
        '产品名称',
        '兑奖时间',
        '快递单号',
        '操作'
    ];
    $scope.pagination = {};
    $scope.pagination.total = -1;
    $scope.pagination.page = 1;
    $scope.getPage = function () {
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qaward", {
            edit: $scope.filter.pkg,
            type: 0,
            role: $rootScope.user.type,
            page: $scope.pagination.page
        }, function (data) {
            console.log(data = JSON.parse(data));
            $scope.pagination.page = data.data.curpage;
            $scope.pagination.total = data.data.totalpages;
            for (var i = 0; i < data.data.data.length; i++) {
                data.data.data[i].obj = common.gifts[data.data.data[i].obj];
            }
            $scope.tds = data.data.data;
            $scope.$apply();
        });
    };
    $scope.getPrevPage = function () {
        if ($scope.pagination.total == -1) {
            return;
        }
        if ($scope.pagination.page <= 1) {
            alert("已经是第一页。");
            return;
        }
        $scope.pagination.page--;
        $scope.getPage();
    };
    $scope.getNextPage = function () {
        if ($scope.pagination.total == -1) {
            return;
        }
        else if ($scope.pagination.page >= $scope.pagination.total) {
            alert("已经是最后一页。");
            return;
        }
        $scope.pagination.page++;
        $scope.getPage();
    };
    $scope.inputPak = function ($event, id) {
        var pak = prompt("录入修改快递单号");
        if (!pak) {
            return;
        }
        Api.editExpress({
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