angular.module('starter')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    //登陆***************************************************************************************************************
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      //注册
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      })

  });
