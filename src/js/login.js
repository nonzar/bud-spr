var app = angular.module("app", []);
app.controller("ctrlLogin", function ($scope) {
    if (common.isLogin()) {
        //市场部1,快递2,ptl3
        window.location.href = common.userIndexUrl[localStorage.getItem("userType")];
    }
    $scope.txtUser = "test";
    $scope.txtPass = "test";
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
            pw: $scope.txtUser
        }, function (data) {
            console.log(data = JSON.parse(data));
            alert(data.msg);
            if (data.code == 0) {
                return;
            }
            localStorage.setItem("userType", data.data.role);
            localStorage.setItem("userName", data.data.name);
            localStorage.setItem("loginTime", +new Date());
            $scope.btnLogin = "登录成功，跳转中...";
            //市场部1,快递2,ptl3
            window.location.href = common.userIndexUrl[data.data.role.toString()];
        });
    };
});