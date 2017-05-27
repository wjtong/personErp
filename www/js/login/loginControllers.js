angular.module('login.controllers', [])

//找回活动(登陆)*****************************************************************************************************************
  .controller('LoginCtrl', function ($http, $scope, Login, $state, ThemeImage, $ionicHistory, ActivityServer) {

    //手机号码找回
    $scope.loginData = {};
    $scope.doLogin = function () {
      if (Object.keys($scope.loginData).length == 0) {
        alert("请输入登录信息!!!")
      } else if ($scope.loginData.mobileNumber == null) {
        alert("请输入手机号码!!!")
      } else if ($scope.loginData.captcha == null) {
        alert("请输入验证码!!!")
      } else {
        Login.login($scope.loginData.mobileNumber, $scope.loginData.captcha, function (data) {
          console.log(data.resultMsg);
          if (data.resultMsg === 'PE平台登录成功') {
            localStorage.removeItem("tarjeta");
            localStorage.removeItem("partyId");
            localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
            localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
            $scope.loginData.captcha = '';
            $state.go("tab.dash");
            $ionicHistory.clearCache(); //清理旧数据，刷新
          } else {
            alert("用户不存在")
          }
        })
      }
    };

    //微信找回
    $scope.wachatLogin = function () {
      var scope = "snsapi_userinfo";
      Wechat.auth(scope, function (response) {
        console.log("微信返回值:" + JSON.stringify(response));
        var code = response.code;
        Login.userWeChatAppLoginBack(code,function (data) {
          console.log('微信找回的Token:'+data.tarjeta);
          if (data.tarjeta) {
            localStorage.removeItem("tarjeta");
            localStorage.removeItem("partyId");
            localStorage.removeItem("openId");
            localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
            localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
            localStorage.setItem("adminOpenId", data.openId);//设置adminOpenId登陆人
            $state.go("tab.dash");
          }
        })
      }, function (reason) {
        alert("Failed: " + reason);
      });
    };

    //返回首页
    $scope.goHome = function () {
      $state.go("tab.dash");
    };

  })

  //验证码***************************************************************************************************************
  .controller('captcha', function ($scope, $http, $rootScope, $interval) {

    $scope.codeBtn = '立即验证';
    //登陆获取验证码
    $scope.getIdentifyCode = function (tel) {
      $scope.smsType = 'LOGIN';
      $scope.msg = ""; //先清空错误提示
      if (tel) {
        $http({
          method: "POST",
          url: $rootScope.platformInterfaceUrl + "getLoginCaptcha",
          data: {
            "teleNumber": tel,
            "smsType": $scope.smsType
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},  // 默认的Content-Type是text/plain;charset=UTF-8，所以需要更改下
          transformRequest: function (obj) {                               // 参数是对象的话，需要把参数转成序列化的形式
            var str = [];
            for (var p in obj) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
          }
        }).success(function (result) {
          console.log(result.code + " " + result.msg);
          if (result.code == '500') {
            $scope.msg = result.msg;
          } else {
            //倒计时
            $scope.n = 60;
            $scope.codeBtn = $scope.n + " 秒";
            var time = $interval(function () {
              $scope.n--;
              $scope.codeBtn = $scope.n + " 秒";
              if ($scope.n == 0) {
                $interval.cancel(time); // 取消定时任务
                $scope.codeBtn = '获取验证码';
                $scope.codeBtnDisable = false;
              }
            }, 1000);
            $scope.codeBtnDisable = true;
          }
        });
      } else {
        $scope.msg = "请输入您的手机号码！！"
      }
    };
  });

