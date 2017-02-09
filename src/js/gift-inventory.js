
var ctrl = {
    $scope: null,
    pagination: {},
    reset: function () {
        ctrl.pagination = {
            totalPage: -1,
            sort: 0,
            page: 1
        };
    },
    getPage: function (page) {
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qobj", {}, function (data) {
            console.log(data = JSON.parse(data));
            ctrl.pagination.totalPage = parseInt(data.data.totalpages);
            ctrl.$scope.$apply(function () {
                ctrl.$scope.tds = data.data;
            });
        });
    },
    getPrevPage: function () {
        if (ctrl.pagination.totalPage == -1) {
            return;
        }
        if (ctrl.pagination.page <= 1) {
            alert("已经是第一页。");
            return;
        }
        ctrl.pagination.page--;
        ctrl.getPage();
    },
    getNextPage: function () {
        if (ctrl.pagination.totalPage == -1) {
            return;
        }
        else if (ctrl.pagination.page >= ctrl.pagination.totalPage) {
            alert("已经是最后一页。");
            return;
        }
        ctrl.pagination.page++;
        ctrl.getPage();
    }
};

app.controller('customersCtrl', function ($scope) {
    ctrl.$scope = $scope;
    $scope.Math = window.Math;
    $scope.ths = [
        '奖品Type',
        '奖品名称',
        '兑换积分',
        '礼品总量',
        '兑换数量',
        '剩余数量',
        '兑换率'
    ];
    ctrl.reset();
    ctrl.getPage();
});