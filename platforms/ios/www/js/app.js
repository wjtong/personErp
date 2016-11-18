// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.aboutme', {
    url: '/aboutme',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutme.html',
        controller:'AboutMe'
      }
    }
  })

  .state('app.contactlist', {
    url: '/contactlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactlist.html',
        controller: 'ContactlistCtrl'
      }
    }
  })

  .state('app.myresources', {
    url: '/myresources',
    views: {
      'menuContent': {
        templateUrl: 'templates/myresources.html',
        controller:'myresources'
      }
    }
  })

  .state('app.myevents', {
    url: '/myevents',
    views: {
      'menuContent': {
        templateUrl: 'templates/myevents.html'
      }
    }
  })

  .state('app.bookmark', {
    url: '/bookmark',
    views: {
      'menuContent': {
        templateUrl: 'templates/bookmark.html'
      }
    }
  })

  .state('app.tasks', {
    url: '/tasks',
    views: {
      'menuContent': {
        templateUrl: 'templates/tasks.html'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.personhome', {
    url: '/contactlist/:contactId',
    views: {
      'menuContent': {
        templateUrl: 'templates/personhome.html',
        controller: 'PersonHomeCtrl'
      }
    }
  })
  .state('app.addPerson', {
      url: '/addPerson',
      disableBack:true,
      cache :false,
      views: {
          'menuContent': {
              templateUrl: 'templates/addPerson.html'
          }
      }
  })
  .state('app.editPersion', {
      url: '/editPersion/:personId',
      disableBack:true,
      cache :false,
      views: {
          'menuContent': {
              templateUrl: 'templates/addPerson.html',
              controller: 'UpdatePersonInfo'
          }
      }
  })
  .state('app.editAddress', {
      url: '/editAddress/:id',
      disableBack:true,
      cache :false,
      views: {
          'menuContent': {
              templateUrl: 'templates/editAddress.html',
              controller: 'EditAddress'
          }
      }
  })
  .state('app.newResources', {
      url: '/newResources',
      views: {
          'menuContent': {
              templateUrl: 'templates/newResources.html',
              controller: 'NewResources'
          }
      }
  })
  .state('app.myOrder',{
      url:'/myOrder',
      disableBack:true,
      cache :false,
      views: {
          'menuContent': {
              templateUrl: 'templates/myOrder.html',
              controller: 'MyOrder'
          }
      }
  })
    .state('app.chatList',{
      url:'/chatList',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/chatList.html',
          controller: 'ChatList'
        }
      }
    })
    .state('app.chatInfo',{
      url:'/chatInfo/:chatId',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/chatInfo.html',
          controller: 'ChatInfo'
        }
      }
    })
    .state('app.chatPersonList',{
      url:'/chatPersonList/:chatId',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/chatPersonList.html',
          controller: 'ChatPersonList'
        }
      }
    })
    .state('app.personLabel',{
      url:'/personLabel',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/personLabel.html',
          controller: 'PersonLabel'
        }
      }
    })
    .state('app.labelPersonList',{
      url:'/labelPersonList/:labelId',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/labelPersonList.html',
          controller: 'LabelPersonList'
        }
      }
    })
    .state('app.myTime',{
      url:'/myTime',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/myTime.html',
          controller: 'MyTime'
        }
      }
    })
    .state('app.tiemInfo',{
      url:'/tiemInfo/:timeId/:infoId',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/tiemInfo.html',
          controller: 'TiemInfo'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/playlists');
  $urlRouterProvider.otherwise('/app/home');
})
;
