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
    getPage: function () {
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
            ctrl.pagination.totalPage = parseInt(data.data.totalpages);
            $(".paginationer .lab-total").text(ctrl.pagination.totalPage);
            ctrl.$scope.$apply(function () {
                ctrl.$scope.tds = [data.data];
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
ctrl.reset();
$(".wbSearch button").on("click", function () {
    ctrl.getPage();
});

//名下所有spr--------------------------------------------------
var ctrl2 = {
    $scope: null,
    pagination: {},
    reset: function () {
        ctrl2.pagination = {
            totalPage: -1,
            sort: 0,
            page: 1
        };
    },
    getPage: function () {
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qptl", {
            ptl: 123,//*
            page: ctrl2.page
        }, function (data) {
            console.log(data = JSON.parse(data));
            ctrl2.pagination.totalPages = parseInt(data.data.totalpages);
            $(".paginationer .lab-total").text(ctrl.pagination.totalPage);
            $(".paginationer .lab-index").text(ctrl.pagination.page);
            ctrl2.$scope.$apply(function () {
                ctrl2.$scope.tds = data.data.data;
            });
        });
    },
    getPrevPage: function () {
        if (ctrl2.pagination.totalPages == -1) {
            return;
        }
        if (ctrl2.pagination.page <= 1) {
            alert("已经是第一页。");
            return;
        }
        ctrl2.pagination.page--;
        ctrl2.getPage();
    },
    getNextPage: function () {
        if (ctrl2.pagination.totalPages == -1) {
            return;
        }
        else if (ctrl2.pagination.page >= ctrl2.pagination.totalPages) {
            alert("已经是最后一页。");
            return;
        }
        ctrl2.pagination.page++;
        ctrl2.getPage();
    }
};
app.controller('customersCtrl2', function ($scope) {
    ctrl2.$scope = $scope;
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
    ctrl2.reset();
    ctrl2.getPage(ctrl2.$scope);
});
$(".wbAllSpr .btn-prev").on("click", function () {
    ctrl2.getPrevPage();
});
$(".wbAllSpr .btn-next").on("click", function () {
    ctrl2.getNextPage();
});
