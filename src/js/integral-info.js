app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function (page) {
            $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qscore", {
                spr: $scope.selFormSearch.value == "spr" ? $scope.txtText : "",
                openid: $scope.selFormSearch.value == "openid" ? $scope.txtText : "",
                sort: 0,
                page: page == undefined ? $scope.pagination.page : $scope.pagination.jumpPage
            }, function (data) {
                console.log(data = JSON.parse(data));
                if (data.code == 0) {
                    alert(data.msg);
                    $scope.tds = [];
                    $scope.$apply();
                    return;
                }
                $scope.pagination.page = data.data.curpage;
                $scope.pagination.total = data.data.totalpages;
                $scope.tds = data.data.data;
                $scope.$apply();
            });
        },
        getPrevPage: function () {
            if ($scope.pagination.total == -1) {
                return;
            }
            if ($scope.pagination.page <= 1) {
                alert("已经是第一页。");
                return;
            }
            $scope.pagination.page--;
            $scope.pagination.getPage();
        },
        getNextPage: function () {
            if ($scope.pagination.total == -1) {
                return;
            }
            else if ($scope.pagination.page >= $scope.pagination.total) {
                alert("已经是最后一页。");
                return;
            }
            $scope.pagination.page++;
            $scope.pagination.getPage();
        }
    };
    $scope.setDateColor = function (time) {
        var time = new Date(time);
        return $rootScope.dateColors[time.getDate() - 1];
    };
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
    $scope.txtText = "";
    //自动显示
    var url_spr = $rootScope.getURLParameter("spr"),
        url_openid = $rootScope.getURLParameter("openid");
    if (url_spr) {
        console.log(url_spr);
        $scope.txtText = url_spr;
        $scope.selFormSearch = $scope.FSKeys[0];
        $scope.pagination.getPage();
    } else if (url_openid) {
        console.log(url_openid);
        $scope.txtText = url_openid;
        $scope.selFormSearch = $scope.FSKeys[1];
        $scope.pagination.getPage();
    }
});