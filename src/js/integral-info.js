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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qscore", function (_data) {
            _data = {
                sort: ctrl.pagination.sort,
                page: ctrl.pagination.page
            };
            if ($(".form-search select").val() == "spr") {
                _data.spr = $(".form-search input[type='text']").val();
            } else {
                _data.openid = $(".form-search input[type='text']").val();
            }
            console.log(_data);
            return _data;
        }({}), function (data) {
            console.log(data = JSON.parse(data));
            if (data.code == 0) {
                ctrl.$scope.$apply(function () {
                    ctrl.$scope.tds = function (arr) {
                        for (var i = 0; i < ctrl.$scope.ths.length; i++) {
                            arr[ctrl.$scope.ths[i]] = "";
                        }
                        return arr;
                    }([]);
                });
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

app.controller('ngCtrl', function ($scope) {
    ctrl.$scope = $scope;
    $scope.FSKeys = [
        {
            value: "spr",
            text: "SPR验证码"
        }, {
            value: "openid",
            text: "OpenId"
        }
    ];
    $scope.selFormSearch = $scope.FSKeys[0];
    $scope.ths = [
        // "#",
        "openid",
        "购买产品",
        "促销员id",
        "积分时间",
        "店铺分类",
        "大区",
        "城市",
        "促销员"
    ];
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
$(function () {
    var url_openid = common.getURLParameter("openid");
    console.log(url_openid);
    if (url_openid) {
        $(".form-search input[type='text']").val(url_openid);
        $(".form-search select").val("openid")
        $(".form-search button").click();
    }
    // debugger;
});