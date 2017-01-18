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
                    // "#",
                    "促销员id",
                    "验证码",
                    "大区",
                    "城市",
                    "城市等级",
                    "促销员名称",
                    "渠道",
                    "PTL",
                    "状态",
                    "操作"
                ];
            });
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qspr", function (_data) {
            _data = {
                sort: ctrl.pagination.sort,
                page: ctrl.pagination.page,
                spr: $(".wbSearch input[type='text']").val()
            };
            console.log(_data);
            return _data;
        }({}), function (data) {
            console.log(data = JSON.parse(data));
            ctrl.pagination.totalPages = parseInt(data.data.totalpages);
            ctrl.$scope.$apply(function () {
                ctrl.$scope.tds = [data.data];
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
        // "#",
        "促销员id",
        "验证码",
        "大区",
        "城市",
        "城市等级",
        "促销员名称",
        "渠道",
        "PTL",
        "状态",
        "操作"
    ];
});
$(".wbSearch button").on("click", function () {
    ctrl.reset();
    ctrl.getPage(ctrl.$scope);
});