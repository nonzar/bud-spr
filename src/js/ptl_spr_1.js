var app = angular.module('app', []);
app.controller('customersCtrl', function ($scope) {
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
    $(".wbSearch button").on("click", function () {
        Api.getSprInfo({
            sprCode: $(".wbSearch input[type='text']").val()
        }, function (data) {
            $scope.$apply(function () {
                $scope.tds = [data.data];
            });
        });
    });
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
        Api.ptl.getAllSpr({
            ptl: "黄瑛杰",//*
            page: ctrl2.page
        }, function (data) {
            ctrl2.pagination.totalPages = parseInt(data.data.totalpages);
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
