app.controller("ctrlLogin", function ($rootScope, $scope) {
    if (common.isLogin()) {
        //市场部1,快递2,ptl3
        window.location.href = common.userIndexUrl[localStorage.getItem("userType")];
    }
    $scope.txtUser = "";
    $scope.txtPass = "";
    $scope.btnLogin = "登录";
    $scope.login = function ($event) {
        if (!$scope.txtUser.length) {
            alert("请输入账号！");
            return;
        }
        if (!$scope.txtPass.length) {
            alert("请输入密码！");
            return;
        }
        $scope.btnLogin = "登录中...";
        $.post("http://120.77.53.178/baiwei/baiweistat.php/Home/Index/login", {
            name: $scope.txtUser,
            pw: $scope.txtPass
        }, function (data) {
            console.log(data = JSON.parse(data));
            if (data.code == 0) {
                alert(data.msg);
                return;
            }
            localStorage.setItem("userType", data.data.role);
            localStorage.setItem("userName", data.data.name);
            localStorage.setItem("loginTime", +new Date());
            localStorage.setItem("debug", localStorage.getItem("debug"));
            $scope.btnLogin = "登录成功，跳转中...";
            //市场部1,快递2,ptl3
            window.location.href = common.userIndexUrl[data.data.role.toString()];
        });
    };
    //test code
    $scope.testInput = function (type) {
        switch (type) {
            case $rootScope.userType.ptl:
                $scope.txtUser = "mqp";
                $scope.txtPass = "7qo3xm";
                break;
            case $rootScope.userType.mkt:
                $scope.txtUser = "market";
                $scope.txtPass = "1x0i5q";
                break;
            case $rootScope.userType.courier:
                $scope.txtUser = "express";
                $scope.txtPass = "sfvkj1";
                break;
            default:
        }
    }
});