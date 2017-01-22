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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/quser", function (_data) {
            _data = {
                // sort: ctrl.pagination.sort,
                times: parseInt($(".form-search select").val()),
                page: ctrl.pagination.page
            };
            console.log(_data);
            return _data;
        }({}), function (data) {
            console.log(data = JSON.parse(data));
            if (data.code == 0) {
                alert("没有记录");
                return;
            }
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
        "已核查",
        "openid",
        "促销员",
        "异常天数",
        "处理"
    ];
    $scope.checkDetail = function ($event, openid) {
    };
    $scope.setOpendForIllicit = function ($event, openid) {
        if ($event.target.classList.contains("disabled")) {
            return;
        }
        Api.ptl.setOpendForIllicit(function () {
            $event.target.classList.add("disabled");
            alert("成功");
        });
    };
});
ctrl.reset();
$(".form-search button").on("click", function () {
    ctrl.getPage();
});
$(".wbTable .btn-prev").on("click", function () {
    ctrl.getPrevPage();
});
$(".wbTable .btn-next").on("click", function () {
    ctrl.getNextPage();
});