app.controller('customersCtrl', function ($scope) {
    $scope.pagination = {
        total: -1,
        page: 1,
        getPage: function (page) {
            $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qobj", {}, function (data) {
                console.log(data = JSON.parse(data));
                $scope.tds = data.data;
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
    $scope.Math = window.Math;
    $scope.pagination.getPage();
});