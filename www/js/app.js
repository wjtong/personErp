// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic-datepicker', 'ionic-timepicker',
  'vote.controllers', 'vote.services', 'login.controllers', 'login.services', 'activity.services', 'activity.controllers',
  'activity.services', 'contact.services', 'contact.controllers', 'directives.OniBarDirective', 'tools.services', 'bill.controllers',
  'bill.services'])

  .run(function ($ionicPlatform, ActivityServer, $cordovaDevice, $rootScope) {

    //连接服务器
    $rootScope.interfaceUrl = "http://114.215.200.46:3400/personContacts/control/";//联系人
    $rootScope.voteInterfaceUrl = "http://114.215.200.46:3400/pevote/control/";//投票接口
    $rootScope.activityInterfaceUrl = "http://114.215.200.46:3400/personactivity/control/";//活动接口
    $rootScope.platformInterfaceUrl = "http://114.215.200.46:3400/peplatform/control/";//平台接口
    $rootScope.communicationfaceUrl = "http://114.215.200.46:3400/communication/control/";//评论接口

    //链接沈演麟本地
    // $rootScope.interfaceUrl = "http://192.168.3.102:3400/personContacts/control/";
    // $rootScope.voteInterfaceUrl = "http://192.168.3.102:3400/pevote/control/";//投票接口
    // $rootScope.activityInterfaceUrl = "http://192.168.3.102:3400/personactivity/control/";//活动接口
    // $rootScope.platformInterfaceUrl = "http://192.168.3.102:3400/peplatform/control/";//活动接口
    // $rootScope.communicationfaceUrl = "http://192.168.3.102:3400/communication/control/";//活动接口


    $ionicPlatform.ready(function ($cordovaStatusbar) {
      //通过UUID获取TOKEN
      document.addEventListener("deviceready", function () {
        var uuid = $cordovaDevice.getUUID();         //UUID唯一识别码
        if(localStorage.getItem("tarjeta") == null){
          ActivityServer.setUUID(uuid+'aa',function (data) {
            localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
            localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
            localStorage.setItem("RongCloudToken", data.rongCloudToken);//设置partyId登陆人
            //alert(localStorage.getItem("partyId"));
            console.log("创建新用户通过UUID"+"token:"+data.tarjeta+"UUID:"+uuid)
          })
        }
      }, false);

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(true);
        // 样式: 无 : 0, 白色不透明: 1, 黑色半透明: 2, 黑色不透明: 3
        $cordovaStatusbar.style(1);
        // 背景颜色名字 : black, darkGray, lightGray, white, gray, red, green,
        // blue, cyan, yellow, magenta, orange, purple, brown 注:需要开启状态栏占用视图.
        $cordovaStatusbar.styleColor('white');
        $cordovaStatusbar.styleHex('#000');
        $cordovaStatusbar.hide();
        $cordovaStatusbar.show();
        var isVisible = $cordovaStatusbar.isVisible();
      }
    });

  })

  .constant('$ionicLoadingConfig', {
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  })

  .config(['$provide', function ($provide) {
    //解决重复点击BUG
    $provide.decorator('ngClickDirective', ['$delegate', '$timeout', function ($delegate, $timeout) {
      var original = $delegate[0].compile;
      var delay = 500;
      $delegate[0].compile = function (element, attrs, transclude) {
        var disabled = false;

        function onClick(evt) {
          if (disabled) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
          } else {
            disabled = true;
            $timeout(function () {
              disabled = false;
            }, delay, false);
          }
        }

        element.on('click', onClick);
        return original(element, attrs, transclude);
      };
      return $delegate;
    }]);
  }])

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false); // 防止ios左滑出现白屏
    //解决 Android tab 样式问题
    $ionicConfigProvider.tabs.style('standard'); // Tab风格
    $ionicConfigProvider.tabs.position('bottom'); // Tab位置
    $ionicConfigProvider.navBar.alignTitle('center'); // 标题位置
    $ionicConfigProvider.navBar.positionPrimaryButtons('left'); // 主要操作按钮位置
    $ionicConfigProvider.navBar.positionSecondaryButtons('right'); //次要操作按钮位置
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // app首页tab
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      //活动首页
      .state('tab.dash', {
        url: '/dash',
        cache: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'ActivityHome'
          }
        }
      })
      //联系人
      .state('tab.chats', {
        url: '/chats',
        cache: false,
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'MainCtrl'
          }
        }
      })
      //活动通知
      .state('tab.activityNotice', {
        url: '/activityNotice',
        cache: true,
        views: {
          'tab-notice': {
            templateUrl: 'templates/activity/activityNotice.html',
            controller: 'ActivityNotice'
          }
        }
      })
      //意见反馈
      .state('tab.opinion', {
        url: '/opinion',
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/opinion.html',
            //controller: 'opinionCtrl'
          }
        }
      })
      //用户账户信息
      .state('tab.account', {
        url: '/account',
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
