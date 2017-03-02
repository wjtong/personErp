angular.module('login.controllers', [])


//登陆
  .controller('LoginCtrl',function($http,$scope,Login,$state,Activity){
    $scope.loginData = {};
    $scope.doLogin = function() {
      if (Object.keys($scope.loginData).length == 0) {
        alert("请输入登录信息!!!")
      } else if ($scope.loginData.username == null) {
        alert("请输入用户名!!!")
      } else if ($scope.loginData.password == null) {
        alert("请输入密码!!!")
      } else {
        Login.login($scope.loginData.username, function (data) {
          console.log(data.tarjeta);
          //console.log(data.resultMsg);
          if (data.resultMsg === '成功') {
            localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
            localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
            console.info(localStorage['tarjeta']+localStorage['partyId']);
            //$rootScope.tarjeta = localStorage['tarjeta'];
            $state.go("app.activityHome");
          } else {
            alert("用户不存在！！！！！！！！！！！！！！！！！！！")
          }
        })
      }
    };
    //设置全局的变量
    //图片
    $scope.activityImg=Activity.getImg();
    localStorage.setItem("activityImg", $scope.activityImg.img)
  })


;