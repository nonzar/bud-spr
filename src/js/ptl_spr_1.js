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
                data.data.type = Api.channel[data.data.type];
                $scope.tds = [data.data];
            });
        });
    });
});

//名下所有spr--------------------------------------------------
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
        Api.getAllSpr({
            ptl: "黄瑛杰",//*
            page: ctrl.page
        }, function (data) {
            ctrl.pagination.totalPage = parseInt(data.data.totalpages);
            $(".paginationer .lab-total").text(ctrl.pagination.totalPage);
            $(".paginationer .lab-index").text(ctrl.pagination.page);
            ctrl.$scope.$apply(function () {
                for (var i = 0; i < data.data.data.length; i++) {
                    data.data.data[i].type = Api.channel[data.data.data[i].type];
                }
                ctrl.$scope.tds = data.data.data;
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
app.controller('customersCtrl2', function ($scope) {
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
    ctrl.reset();
    ctrl.getPage(ctrl.$scope);
});
$(".wbAllSpr .btn-prev").on("click", function () {
    ctrl.getPrevPage();
});
$(".wbAllSpr .btn-next").on("click", function () {
    ctrl.getNextPage();
});
