if (!common.isLogin()) {
    window.location.href = "login.html";
}
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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qaward", {
            type: 0,
            role: localStorage.getItem("userType"),
            page: ctrl.pagination.page
        }, function (data) {
            console.log(data = JSON.parse(data));
            ctrl.pagination.totalPage = parseInt(data.data.totalpages);
            $(".paginationer .lab-total").text(ctrl.pagination.totalPage);
            $(".paginationer .lab-index").text(ctrl.pagination.page);
            ctrl.$scope.$apply(function () {
                // debugger;
                for (var i = 0; i < data.data.data.length; i++) {
                    data.data.data[i].obj = common.gifts[data.data.data[i].obj];
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
var app = angular.module('app', []);
app.controller('customersCtrl', function ($scope) {
    ctrl.$scope = $scope;
    $scope.ths = [
        // {name: '#'},
        '记录id',
        'openid',
        '产品名称',
        '兑奖时间',
        '快递单号',
        '操作'
    ];
    $scope.confirmChange = function ($event) {
        alert("没有此接口。");
    };
    ctrl.reset();
    ctrl.getPage();
});
$(".wbTable .btn-prev").on("click", function () {
    ctrl.getPrevPage();
});
$(".wbTable .btn-next").on("click", function () {
    ctrl.getNextPage();
});