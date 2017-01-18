var none = "/";
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
            // {name: '#'},
            {name: '记录id'},
            {name: 'openid', enableSorting: false},
            {name: '产品名称', enableSorting: false},
            {name: '兑奖时间', enableSorting: false},
            {name: '姓名', enableSorting: false},
            {name: '电话', enableSorting: false},
            {name: '快递单号', enableSorting: false},
            {name: '地址', enableSorting: false},
            {name: '操作', enableSorting: false}
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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qaward", {
            type: 0,
            page: paginationOptions.pageNumber
        }, function (data) {
            console.log(data = JSON.parse(data));
            $scope.gridOptions.totalItems = data.data.totalpages - 1;
            $scope.gridOptions.data = function (data, arr) {
                for (var i = 0; i < data.data.data.length; i++) {
                    arr.push({
                        // "#": i + 1,
                        "记录id": data.data.data[i].id,
                        "openid": data.data.data[i].openid,
                        "产品名称": none,
                        "兑奖时间": data.data.data[i].act_time,
                        "姓名": none,
                        "电话": none,
                        "快递单号": data.data.data[i].package,
                        "地址": none,
                        "操作": "确认"
                    });
                }
                return arr;
            }(data, []);
        });
    };
    getPage();
}]);