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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qwarn", {
            page: ctrl.pagination.page,
            type: localStorage.getItem("userType")
        }, function (data) {
            console.log(data = JSON.parse(data));
            ctrl.pagination.totalPage = parseInt(data.data.totalpages);
            $(".paginationer .lab-total").text(ctrl.pagination.totalPage);
            $(".paginationer .lab-index").text(ctrl.pagination.page);
            ctrl.$scope.$apply(function () {
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
        // "#",
        "openid",
        "操作"
    ];
    $scope.setLegal = function ($event, openid) {
        if ($event.target.classList.contains("disabled")) {
            return;
        }
        Api.setOpenidForLegal({
            openid: openid,
            usertype: Api.userType.mkt
        }, function (data) {
            alert(data.msg);
            if (data.code != 0) {
                $event.target.classList.add("disabled");
            }
        });
    };
    $scope.cancleIntegral = function ($event, openid) {
        if ($event.target.classList.contains("disabled")) {
            return;
        }
        Api.cancleIntegral({
            openid: openid,
            usertype: Api.userType.mkt
        }, function (data) {
            alert(data.msg);
            if (data.code != 0) {
                $event.target.classList.add("disabled");
            }
        });
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