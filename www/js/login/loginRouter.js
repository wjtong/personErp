angular.module('starter')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    //登陆***************************************************************************************************************
      .state('login', {
        url: '/login',
        cache:false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

  });
