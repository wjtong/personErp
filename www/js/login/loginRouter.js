/**************************** 投票 *****************************************/
angular.module('starter')

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/app/playlists');
    $urlRouterProvider.otherwise('/login');
  });
