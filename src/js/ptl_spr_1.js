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
            {name: '促销员id', enableSorting: false},
            {name: '验证码', enableSorting: false},
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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qspr", {
            spr: $(".wbSearch input[type='text']").val() || 862094
        }, function (data) {
            console.log(data = JSON.parse(data));
            $scope.gridOptions.totalItems = data.data.totalpages - 1;
            $scope.gridOptions.data = function (data, arr) {
                    arr.push({
                        "促销员id": data.data.id,
                        "验证码": data.data.code,
                        "大区": data.data.region,
                        "城市": data.data.city,
                        "城市等级": data.data.type,
                        "促销员名称": data.data.name,
                        "渠道": data.data.vendor,
                        "PTL": data.data.ptl,
                        "状态": data.data.isover,
                        "操作": "修改"
                    });
                return arr;
            }(data, []);
        });
    };
    getPage();
}]);