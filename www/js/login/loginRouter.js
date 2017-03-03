/**************************** 投票 *****************************************/
angular.module('starter')

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

  });
