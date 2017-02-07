var test = {};
app.controller('customersCtrl', function ($rootScope, $scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function (page) {
            $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/quser", {
                times: $scope.filter.day,
                page: page == undefined ? $scope.pagination.page : $scope.pagination.jumpPage,
                ptl: function () {
                    switch ($rootScope.user.type) {
                        case $rootScope.userType.ptl:
                            return $rootScope.user.name;
                            break;
                        case $rootScope.userType.mkt:
                            return "main";
                            break;
                        default:
                            return "";
                    }
                }()
            }, function (data) {
                console.log(data = JSON.parse(data));
                if (data.code == 0) {
                    alert(data.msg);
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
    $scope.filter = {
        day: 3
    };
    $scope.setIllicit = function ($event, openid) {
        if ($event.target.classList.contains("disabled")) {
            alert("已列入可疑");
            return;
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uopenid", {
            openid: openid,
            type: 0,
            main: $rootScope.user.type
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
            if (data.code == 0) {
                return;
            }
            $event.target.classList.add("disabled");
        });
    };
    $scope.setTag = function ($index, openid, select) {
        var ischeckec = 0;
        switch (select) {
            case "未稽查":
                ischeckec = 0;
                break;
            case "稽查中":
                ischeckec = 1;
                break;
            case "已稽查":
                ischeckec = 2;
                break;
            default:
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uchecked", {
            openid: openid,
            ischecked: ischeckec
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
            $scope.setColor($index, ischeckec.toString());
            if (data.code == 0) {
                return;
            }
        });
    };
    $scope.setColor = function ($index, ischecked) {
        var color = "#fff";
        switch (ischecked) {
            case "0":

                break;
            case "1":
                color = "#529BDA";
                break;
            case "2":
                color = "#5cb85c";
                break;
            default:

        }
        $(".wbTable tr").eq($index+1).css("background-color", color);
    };
});