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
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
        inputDate: new Date(),
        titleLabel: 'Select a Date',
        setLabel: '选择',
        todayLabel: '今天',
        closeLabel: '关闭',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
})
.config(function (ionicTimePickerProvider) {
    var timePickerObj = {
        inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
        format: 12,
        step: 15,
        setLabel: '选择',
        closeLabel: '关闭'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);
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
    .state('app.myResourcesInfo', {
      url: '/myResourcesInfo/:resourcesId',
      views: {
        'menuContent': {
          templateUrl: 'templates/myResourcesInfo.html',
          controller:'MyResourcesInfo'
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
  .state('app.newGroupChat', {
    url: '/newGroupChat',
    views: {
      'menuContent': {
        templateUrl: 'templates/newgroupchat.html',
        controller:'NewGroupChat'
      }
    }
  })

  .state('app.favorites', {
    url: '/favorites',
    views: {
      'menuContent': {
        templateUrl: 'templates/favorites.html',
        controller:'FavoritesCtrl'
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
  .state('app.editPerson', {
      url: '/editPerson/:personId',
      disableBack:true,
      cache :false,
      views: {
          'menuContent': {
              templateUrl: 'templates/addPerson.html',
              controller: 'UpdatePersonInfo'
          }
      }
  })
  // .state('app.newGroupChat', {
  //   url: '/newGroupChat',
  //   disableBack:true,
  //   cache :false,
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/newgroupchat.html',
  //       controller: 'NewGroupChat'
  //     }
  //   }
  // })
  .state('app.getResources', {
    url: '/getResources/',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/otherresources.html',
        controller: 'GetResources'
      }
    }
  })
  .state('app.getEvents', {
    url: '/getEvents/',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/othertime.html',
        controller: 'GetEvent'
      }
    }
  })
  .state('app.getBusiness', {
    url: '/getBusiness/',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/business.html',
      }
    }
  })
  .state('app.abouthim', {
    url: '/abouthim/:personId',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/abouthim.html',
        controller: 'AboutHim'
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
  }).state('app.myOrderInfo',{
    url:'/myOrderInfo/:orderId/:orderTypeId',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/myOrderInfo.html',
        controller: 'MyOrderInfo'
      }
    }
  })
    .state('app.createOrder',{
      url:'/createOrder/:typeId',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/createOrder.html',
          controller: 'CreateOrder'
        }
      }
    })
    .state('app.newDevOrder',{
      url:'/newDevOrder/',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/newDevOrder.html',
          controller: 'NewDevOrder'
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
