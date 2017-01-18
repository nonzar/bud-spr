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
            // {name: '#'},
            {name: 'openid', enableSorting: false},
            {name: '产品名称', enableSorting: false},
            {name: '产品积分', enableSorting: false},
            {name: '积分时间', enableSorting: false},
            {name: '渠道分类', enableSorting: false},
            {name: '大区', enableSorting: false},
            {name: '城市', enableSorting: false},
            {name: '促销员id', enableSorting: false},
            {name: '促销员', enableSorting: false},
            {name: 'PLT', enableSorting: false}
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
        $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qscore", function (_data) {
            _data = {
                sort: 0,
                page: paginationOptions.pageNumber
            };
            if ($(".form-search-parent select").val() == "spr") {
                _data.spr = $(".form-search-parent input[type='text']").val() || 862094;
            } else {
                _data.openid = $(".form-search-parent input[type='text']").val() || 862094;
            }
            console.log(_data);
            return _data;
        }({}), function (data) {
            console.log(data = JSON.parse(data));
            $scope.gridOptions.totalItems = data.data.totalpages - 1;
            $scope.gridOptions.data = function (data, arr) {
                for (var i = 0; i < data.data.data.length; i++) {
                    arr.push({
                        // "#": i + 1,
                        "openid": data.data.data[i].openid,
                        "产品名称": data.data.data[i].obj,
                        "产品积分": data.data.data[i].score,
                        "积分时间": data.data.data[i].act_time,
                        "渠道分类": data.data.data[i].sprtype,
                        "大区": data.data.data[i].sprregion,
                        "城市": data.data.data[i].sprcity,
                        "促销员id": data.data.data[i].id,
                        "促销员": data.data.data[i].sprname,
                        "PLT": data.data.data[i].ptlname
                    });
                }
                return arr;
            }(data, []);
        });
    };
    getPage();
}]);