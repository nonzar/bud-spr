var app = angular.module("app", ['ui.grid', 'ui.grid.pagination']);
app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 5,
        sort: null
    };
    $scope.gridOptions = {
        paginationPageSizes: [5],
        paginationPageSize: 5,
        useExternalPagination: true,
        useExternalSorting: true,
        columnDefs: [
            {name: '#'},
            {name: 'OpenId', enableSorting: false},
            {name: '处理', enableSorting: false}
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                if (sortColumns.length == 0) {
                    paginationOptions.sort = null;
                } else {
                    paginationOptions.sort = sortColumns[0].sort.direction;
                }
                getPage();
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                getPage();
            });
        }
    };
    var getPage = function () {
        console.log(uiGridConstants);
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qwarn", {
            page: paginationOptions.pageNumber
        }, function (data) {
            console.log(data = JSON.parse(data));
            $scope.gridOptions.totalItems = data.data.totalpages - 1;
            $scope.gridOptions.data = function (data, arr) {
                for (var i = 0; i < data.data.data.length; i++) {
                    arr.push({
                        "#": i + 1,
                        "OpenId": data.data.data[i].openid,
                        "处理": data.data.data[i].obj
                    });
                }
                return arr;
            }(data, []);
        });
    };
    getPage();
}]);