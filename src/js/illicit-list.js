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
    $scope.setIllicit = function ($event, openid, $index) {
        if ($event.target.innerText == "已取消积分") {
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
            $event.target.innerText = "已取消积分";
            $event.target.classList.add("disabled");
            $scope.setTag($index, openid, $scope.tag["3"]);
        });
    };
    $scope.tag = {
        "0": "未稽查",
        "1": "稽查中",
        "2": "积分有效",
        "3": "已取消积分"
    };
    $scope.setTag = function ($index, openid, select) {
        var ischecked = 0;
        for (var prop in $scope.tag) {
            if ($scope.tag[prop] == select) {
                ischecked = parseInt(prop);
            }
        }
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/uchecked", {
            openid: openid,
            ischecked: ischecked
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
            if (data.code == 0) {
                return;
            }
            $(".wbTable tr").eq($index + 1).find("select")[0].value = $scope.tag[ischecked.toString()];
            $scope.setColor($index, ischecked.toString());
        });
    };
    $scope.setColor = function ($index, ischecked) {
        var color = "#fff";
        switch (ischecked) {
            case "0":
                color = "#fff";
                break;
            case "1":
                color = "#529BDA";
                break;
            case "2":
                color = "#5cb85c";
                break;
            default:
                color = "#fff";
        }
        $(".wbTable tr").eq($index + 1).css("background-color", color);
    };
});
var sel;