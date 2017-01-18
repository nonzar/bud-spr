var ctrl = {
    $scope: null,
    pagination: {},
    reset: function () {
        ctrl.pagination = {
            totalPages: -1,
            sort: 0,
            page: 1
        };
    },
    getPage: function () {
        if (!ctrl.$scope.ths) {
            ctrl.$scope.$apply(function () {
                ctrl.$scope.ths = [
                    '奖品Type',
                    '名称',
                    '兑换积分',
                    '总量',
                    '兑换数量',
                    '兑换率'
                ];
            });
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qobj", {}, function (data) {
            console.log(data = JSON.parse(data));
            ctrl.pagination.totalPages = parseInt(data.data.totalpages);
            ctrl.$scope.$apply(function () {
                ctrl.$scope.tds = data.data;
            });
        });
    },
    getPrevPage: function () {
        if (ctrl.pagination.totalPages == -1) {
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
        if (ctrl.pagination.totalPages == -1) {
            return;
        }
        else if (ctrl.pagination.page >= ctrl.pagination.totalPages) {
            alert("已经是最后一页。");
            return;
        }
        ctrl.pagination.page++;
        ctrl.getPage();
    }
};
var app = angular.module('app', []);
app.controller('customersCtrl', function ($scope) {
    ctrl.$scope = $scope;
    $scope.ths = [
        '奖品Type',
        '名称',
        '兑换积分',
        '总量',
        '兑换数量',
        '兑换率'
    ];
    ctrl.reset();
    ctrl.getPage(ctrl.$scope);
});