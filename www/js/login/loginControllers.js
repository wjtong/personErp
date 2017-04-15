angular.module('login.controllers', [])

//登陆*****************************************************************************************************************
  .controller('LoginCtrl', function ($http, $scope, Login, $state, ThemeImage, $ionicHistory) {
    // $scope.$on('$ionicView.beforeEnter', function () {                              // 这个玩意儿不错，刚加载执行的广播通知方法
    //   $scope.user = {"identifyCode": ""};
    //   // 退出登录后，清空验证码
    //   if (localStorage.getItem("tarjeta") != null) {   // 登录成功了，按物理返回键，就别想重新登录
    //     $state.go("app.home");
    //   }
    // });

    //如果token不存在或者失效＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
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
          console.log(data.tarjeta);
          if (data.resultMsg === 'PE平台登录成功') {
            localStorage.removeItem("tarjeta");
            localStorage.removeItem("partyId");
            localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
            localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
            $state.go("app.activityHome");
          } else {
            alert("用户不存在！！！！！！！！！！！！！！！！！！！")
          }
        })
      }
    };

    //返回首页
    $scope.goHome = function () {
      $state.go("app.activityHome");
    };
    //设置全局的变量
    $scope.activityImg = ThemeImage.getRangeImg();
    localStorage.setItem("activityImg", $scope.activityImg.img);//全局活动图片
    localStorage.setItem("contactImg", $scope.activityImg.img2);//全局人员图片
    //用户注册**************************
    $scope.goRegister = function () {
      $state.go("register");
    }

  })

  //验证码***************************************************************************************************************
  .controller('captcha', function ($scope, $http, $rootScope, $interval, Login,$state) {
    $scope.codeBtn = '获取验证码';
    //登陆获取验证码
    $scope.getIdentifyCode = function (tel) {
      //定义一个是登陆获取验证吗
      $scope.smsType = 'LOGIN';
      $scope.msg = "";//先清空错误提示
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
            $scope.codeBtn = "获取中 " + $scope.n + " 秒";
            var time = $interval(function () {
              $scope.n--;
              $scope.codeBtn = "获取中 " + $scope.n + " 秒";
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

    //注册获取验证码
    $scope.getIdentifyCodeReg = function (tel) {
      Login.userLoginExsit(tel, function (data) {     //判断用户是否存在
        if (data.resultMsg === '成功') {
          //定义一个是登陆获取验证吗＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
          $scope.smsType = 'REGISTER';             //定义获取验证码用于注册
          $scope.msg = "";//先清空错误提示
          if (tel) {
            $http({
              method: "POST",
              url: $rootScope.platformInterfaceUrl + "getLoginCaptcha",
              data: {
                "teleNumber": tel,
                "smsType": $scope.smsType,
              },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},         // 默认的Content-Type是text/plain;charset=UTF-8，所以需要更改下
              transformRequest: function (obj) {                                      // 参数是对象的话，需要把参数转成序列化的形式
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
                $scope.codeBtn = "获取中 " + $scope.n + " 秒";
                var time = $interval(function () {
                  $scope.n--;
                  $scope.codeBtn = "获取中 " + $scope.n + " 秒";
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
        } else {
          alert("用户已存在！！！！！！！！！！！！")
          $state.go('login')
        }
      })
    };
  })

  //注册*****************************************************************************************************************
  .controller('RegisterCtrl', function ($scope, $state, Login) {
    //取消注册
    $scope.goLogin = function () {
      $state.go("login");
    };
    //注册＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    $scope.loginData = {};
    $scope.doRegister = function () {
      if (Object.keys($scope.loginData).length == 0) {
        alert("请输入登录信息!!!")
      } else if ($scope.loginData.telephone == null) {
        alert("请输入手机号码!!!")
      } else if ($scope.loginData.captcha == null) {
        alert("请输入验证码!!!")
      } else if ($scope.loginData.nickname == null) {
        alert("请输入用户姓名!!!")
      } else {
        Login.userAppRegister($scope.loginData.telephone, $scope.loginData.captcha, $scope.loginData.nickname, function (data) {
          if (data.resultMsg === '成功') {
            $state.go("login");
          } else {
            alert("失败")
          }
        })
      }
    };
  })
;
