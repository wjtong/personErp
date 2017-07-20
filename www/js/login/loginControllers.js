angular.module('login.controllers', [])

/*********************************************************************************************************************
 * Desc 找回活动
 * Author LX
 * Date 2017-3-3
 * */
  .controller('LoginCtrl', function ($http, $scope, Login, $state, $ionicPopup) {
    $scope.partyId = localStorage.getItem('partyId');
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
          } else {
            $ionicPopup.alert({
              title: data.resultMsg,
              template: '请确认您输入的手机号或验证码是否正确'
            })
          }
        })
      }
    };

    //微信找回
    $scope.wachatLogin = function () {
      console.log('微信找回1')
      var scope = "snsapi_userinfo";
      Wechat.auth(scope, function (response) {
        console.log('微信找回2')
        console.log("微信返回值:" + JSON.stringify(response));
        var code = response.code;
        Login.userWeChatAppLoginBack(code, function (data) {
          console.log('微信找回3')
          console.log('微信找回的Token:' + data.tarjeta);
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

  /*********************************************************************************************************************
   * Desc 获取验证码
   * Author LX
   * Date 2017-3-3
   * */
  .controller('captcha', function ($scope, $http, $rootScope, $interval, Login) {

    //获取登录验证码
    $scope.codeBtn = '立即验证';
    $scope.getIdentifyCode = function (tel) {
      var smsType = 'LOGIN';
      Login.getLoginCaptcha(tel, smsType, function (data) {
        console.log(data)
      });
      $scope.countDown();
    };

    //获取注册验证码
    $scope.getIdentifyCodeReg = function (tel) {
      var smsType = 'REGISTER';
      Login.getLoginCaptcha(tel, smsType, function (data) {
        console.log(data)
      });
      $scope.countDown();
    };

    //倒计时
    $scope.countDown = function () {
      $scope.n = 30;
      $scope.codeBtn = $scope.n + " 秒";
      var time = $interval(function () {
        $scope.n--;
        $scope.codeBtn = $scope.n + " 秒";
        if ($scope.n == 0) {
          $interval.cancel(time); // 取消定时任务
          $scope.codeBtn = '验证码';
        }
      }, 1000);
    };
  });

