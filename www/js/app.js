// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic-datepicker', 'ionic-timepicker',
  'vote.controllers', 'vote.services','login.controllers','login.services', 'activity.services','activity.controllers',
  'activity.services','contact.services','contact.controllers'])

.run(function($ionicPlatform,$rootScope) {
  // $rootScope.interfaceUrl = "http://114.215.200.46:3400/personContacts/control/";//活动接口
  // $rootScope.voteInterfaceUrl = "http://114.215.200.46:3400/pevote/control/";//投票接口
  // $rootScope.activityInterfaceUrl = "http://114.215.200.46:3400/personactivity/control/";//活动接口
  $rootScope.interfaceUrl = "http://192.168.3.62:3400/personContacts/control/";//链接沈演麟本地
  $rootScope.voteInterfaceUrl = "http://192.168.3.62:3400/pevote/control/";//投票接口
  $rootScope.activityInterfaceUrl = "http://192.168.3.62:3400/personactivity/control/";//活动接口
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function (ionicDatePickerProvider,$ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false); // 防止ios左滑出现白屏
  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Select a Date',
    setLabel: '确定',
    todayLabel: '今天',
    closeLabel: '关闭',
    mondayFirst: false,
    weeksList: ["日", "一", "二", "三", "四", "五", "六"],
    monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    from: new Date(2017, 1, 1),
    to: new Date(2030, 8, 1),
    showTodayButton: true,
    dateFormat: 'yyyy/MM/dd',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
})

.config(function (ionicTimePickerProvider) {
  var timePickerObj = {
    inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
    format: 24,
    step: 15,
    setLabel: '确定',
    closeLabel: '关闭'
  };
  ionicTimePickerProvider.configTimePicker(timePickerObj);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    //app菜单
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    //app主页
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/activityHome');
  //$urlRouterProvider.otherwise('/login');
})
;
