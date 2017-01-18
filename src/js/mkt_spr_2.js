var app = angular.module("app", ['ui.grid', 'ui.grid.pagination']);
app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
    var paginationOptions = {
        pageNumber: 1,
        pageSize: 50,
        sort: null
    };
    $scope.gridOptions = {
        paginationPageSizes: [50],
        paginationPageSize: 50,
        useExternalPagination: true,
        useExternalSorting: true,
        columnDefs: [
            {name: '#'},
            {name: '促销员id', enableSorting: false},
            {name: '大区', enableSorting: false},
            {name: '城市', enableSorting: false},
            {name: '城市等级', enableSorting: false},
            {name: '促销员名称', enableSorting: false},
            {name: '渠道', enableSorting: false},
            {name: 'PTL', enableSorting: false},
            {name: '状态', enableSorting: false},
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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qptl", {
            ptl: 0,//*
            page: paginationOptions.pageNumber
        }, function (data) {
            console.log(data = JSON.parse(data));
            $scope.gridOptions.totalItems = data.data.totalpages - 1;
            $scope.gridOptions.data = function (data, arr) {
                for (var i = 0; i < data.data.data.length; i++) {
                    arr.push({
                        "#": i + 1,
                        "促销员id": data.data.data[i].id,
                        "大区城市": data.data.data[i].region,
                        "城市等级": data.data.data[i].type,
                        "促销员名称": data.data.data[i].name,
                        "渠道": data.data.data[i].vendor,
                        "PTL": data.data.data[i].ptl,
                        "状态": data.data.data[i].isover,
                        "操作": '修改'
                    });
                }
                return arr;
            }(data, []);
        });
    };
    getPage();
}]);