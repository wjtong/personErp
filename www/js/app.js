// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic-datepicker'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $rootScope.interfaceUrl="https://localhost:3401/personContacts/control/";
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

  // .state('app.tabs', {
  //   disableBack:true,
  //   cache :false,
  //   url: "/tabs",
  //   views: {
  //     'menuContent' :{
  //       templateUrl: "templates/tabs.html"
  //     }
  //   }
  // })

  // .state('app.tabs.search', {
  //   url: "/search",
  //   disableBack:true,
  //   cache :false,
  //   views: {
  //     'search-tab': {
  //       templateUrl: "templates/search.html",
  //       controller:'ActivtyVode'
  //     }
  //   }
  // })
  // .state('app.tabs.about', {
  //   disableBack:true,
  //   cache :false,
  //   url: "/about",
  //   views: {
  //     'about-tab': {
  //       templateUrl: "templates/about.html"
  //     }
  //   }
  // })

  // .state('app.search', {
  //   disableBack:true,
  //   cache :false,
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  .state('app.ProductionDetails', {
    disableBack:true,
    cache :false,
    url: '/ProductionDetails/:ProductionId',
    views: {
      'menuContent': {
        templateUrl: 'templates/ProductionDetails.html',
        controller:'ProDet'
      }
    }
  })
  .state('app.aboutme', {
    disableBack:true,
    url: '/aboutme',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutme.html',
        controller:'AboutMe'
      }
    }
  })
  .state('app.contactlist', {
    url: '/contactlist',
    cache :false,
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
    .state('app.otherResourcesInfo', {
      url: '/otherResourcesInfo/:resourcesId',
      views: {
        'menuContent': {
          templateUrl: 'templates/otherResourcesInfo.html',
          controller:'MyResourcesInfo'
        }
      }
    })
  .state('app.personResourcesInfo', {
      url: '/personResourcesInfo/:resourcesId/:personId',
      views: {
          'menuContent': {
              templateUrl: 'templates/otherResourcesInfo.html',
              controller:'PersonResourcesInfo'
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
        controller:'LabelPersonList'
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
  .state('app.shoppingcart', {
    url: '/shoppingcart',
    views: {
      'menuContent': {
        templateUrl: 'templates/shoppingCart.html',
        controller: 'ShoppingCart'
      }
    }
  })
  .state('app.addPerson', {
      url: '/addPerson',
      disableBack:true,
      cache :false,
      views: {
          'menuContent': {
              templateUrl: 'templates/addPerson.html',
              controller: 'AddPerson'
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
  .state('app.assOrder', {
    url: '/assOrder/:personName',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/assOrder.html',
        controller: 'MyOrder'
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
    url: '/getResources/:id',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/otherresources.html',
        controller: 'GetResources'
      }
    }
  })
  .state('app.editOrderInfo', {
    url: '/editOrderInfo',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/editOrderInfo.html',
        //controller: ''
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
        controller:'GetBusiness'
      }
    }
  })
  .state('app.activityDetails',{
    url:'/activityDetails/:activityId',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/activityDetails.html',
        controller:'ActivityCrl'
      }
    }
  })
  //照片墙
  .state('app.slide',{
    url:'/slide/:activityId',
    disableBack:true,
    cache :true,
    views: {
      'menuContent': {
        templateUrl: 'templates/slide.html',
        controller:'slideCrl'
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
  .state('app.createProduction', {
    url: '/createProduction/:orderId',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/createProduction.html',
        controller: 'CreateProduct'
      }
    }
  })
  .state('app.editProduction', {
    url: '/editProduction/:proId',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/createProduction.html',
        controller: 'UpdateProduction'
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
  .state('app.addAddress', {
    url: '/addAddress',
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
  .state('app.Business', {
    url: '/Business',
    disableBack:true,
    cache :true,
    views: {
      'menuContent': {
        templateUrl: 'templates/business.html',
        controller:'GetBusiness'
      }
    }
  })
    .state('app.themeImage', {
      url: '/themeImage',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/themeImage.html',
          controller:'ThemeImage'
        }
      }
    })
  .state('app.newActivity', {
    url: '/newActivity',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/newActivity.html',
        controller:'NewActivity'
      }
    }
  })
  .state('app.editActivty', {
    url: '/editActivty/:id',
    disableBack:true,
    cache :false,
    views: {
      'menuContent': {
        templateUrl: 'templates/newActivity.html',
        controller:'EditActivity'
      }
    }
  })
  .state('app.myOrderInfo',{
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
      url:'/createOrder/:typeId/:resourcesId/:personId',
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
          controller: 'LabelPersonList'
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
      url:'/labelPersonList/:partyId',
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
    .state('app.timeList',{
      url:'/timeList/:timeId',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/timeList.html',
          controller: 'TimeList'
        }
      }
    })


    .state('app.activityList',{
      url:'/activityList/:type',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/activityList.html',
          controller:'ActivityList'
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
  }).state('app.stock', {
      url: '/stock',
      views: {
        'menuContent': {
          templateUrl: 'templates/stock.html',
          controller: 'Stock'
        }
      }
    }
  )
    .state('app.stockInfo', {
        url: '/stockInfo/:productId/:inventoryId',
        views: {
          'menuContent': {
            templateUrl: 'templates/stockInfo.html',
            controller: 'StockInfo'
          }
        }
      }
    ).state('app.stockList',{
      url: '/stockList/:productId',
      views: {
        'menuContent': {
          templateUrl: 'templates/stockList.html',
          controller: 'StockList'
        }
      }
    })
    .state('app.receiveStock', {
      url: '/receiveStock',
      views: {
        'menuContent': {
          templateUrl: 'templates/receiveStock.html',
          controller: 'ReceiveStock'
        }
      }
    })
    .state('app.receivePurOrderList', {
      url: '/receivePurOrderList',
      views: {
        'menuContent': {
          templateUrl: 'templates/receivePurOrderList.html',
          controller: 'ReceivePurOrderList'
        }
      }
    })
    .state('app.receiveOrderInfo', {
      url: '/receiveOrderInfo/:orderId',
      views: {
        'menuContent': {
          templateUrl: 'templates/receiveOrderInfo.html',
          controller: 'ReceiveOrderInfo'
        }
      }
    })

    /**************************** 投票 *****************************************/
    .state('app.voteList', {
      url: '/voteList',
      views: {
        'menuContent': {
          templateUrl: 'templates/vote/voteList.html',
          controller: 'voteListCtrl'
        }
      }
    })

    .state('app.goEditVote', {
      url: '/goEditVote',
      views: {
        'menuContent': {
          templateUrl: 'templates/vote/editVote.html',
          controller: 'editVoteCtrl'
        }
      }
    })

    .state('app.goCastVote', {
      url: '/goCastVote',
      views: {
        'menuContent': {
          templateUrl: 'templates/vote/castVote.html',
          controller: 'castVoteCtrl'
        }
      }
    })

  //活动账单的显示
    .state('app.activityBill', {
      url: '/activityBill/',
      views: {
        'menuContent': {
          templateUrl: 'templates/activityBill.html',
          controller: 'activityBillCtrl'
        }
      }
    })

  ;
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/playlists');
  $urlRouterProvider.otherwise('/app/home');
})
;
