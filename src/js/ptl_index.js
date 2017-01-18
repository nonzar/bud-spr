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
                    "openid",
                    "产品名称",
                    "产品积分",
                    "积分时间",
                    "渠道分类",
                    "大区",
                    "城市",
                    "促销员id",
                    "促销员",
                    "PLT"
                ];
            });
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qscore", function (_data) {
            _data = {
                sort: ctrl.pagination.sort,
                page: ctrl.pagination.page
            };
            if ($(".form-search-parent select").val() == "spr") {
                _data.spr = $(".form-search-parent input[type='text']").val();
            } else {
                _data.openid = $(".form-search-parent input[type='text']").val();
            }
            console.log(_data);
            return _data;
        }({}), function (data) {
            console.log(data = JSON.parse(data));
            ctrl.pagination.totalPages = parseInt(data.data.totalpages);
            ctrl.$scope.$apply(function () {
                ctrl.$scope.tds = data.data.data;
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
        "openid",
        "产品名称",
        "产品积分",
        "积分时间",
        "渠道分类",
        "大区",
        "城市",
        "促销员id",
        "促销员",
        "PLT"
    ];
});
$(".form-search button").on("click", function () {
    ctrl.reset();
    ctrl.getPage(ctrl.$scope);
});
$(".wbTable .btn-prev").on("click", function () {
    ctrl.getPrevPage();
});
$(".wbTable .btn-next").on("click", function () {
    ctrl.getNextPage();
});