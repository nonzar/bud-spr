var none = "/";
var app = angular.module("app", ['ui.grid', 'ui.grid.pagination']);
app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
    $scope.gridOptions = {
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
        ]
    };
    $.post("http://120.77.53.178/baiwei/baiweistat.php/home/index/qobj", {}, function (data) {
        console.log(data = JSON.parse(data));
        $scope.gridOptions.data = function (data, arr) {
            for (var i = 0; i < data.data.length; i++) {
                arr.push({
                    // "#": i + 1,
                    "记录id": data.data[i].id,
                    "openid": data.data[i].openid,
                    "产品名称": none,
                    "兑奖时间": data.data[i].act_time,
                    "姓名": none,
                    "电话": none,
                    "快递单号": data.data[i].package,
                    "地址": none,
                    "操作": "修改 确认"
                });
            }
            return arr;
        }(data, []);
    });
}]);