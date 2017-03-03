/**************************** 投票 *****************************************/
angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider

      .state('app.activityHome', {
        url: '/activityHome/',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityHome.html',
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
            templateUrl: 'templates/activity/activityDetails.html',
            controller:'ActivityCrl'
          }
        }
      })
      .state('app.activityDetails2',{
        url:'/activityDetails2/:activityId/:type',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityDetails.html',
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
            templateUrl: 'templates/activity/activitySlide.html',
            controller:'slideCrl'
          }
        }
      })
      .state('app.newActivity', {
        url: '/newActivity',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/newActivity.html',
            controller:'NewActivity'
          }
        }
      })
      //新建子活动
      .state('app.newActivityChild', {
        url: '/newActivityChild/:id',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/newActivity.html',
            controller:'NewActivity'
          }
        }
      })
      .state('app.themeImage', {
        url: '/themeImage',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityThemeImage.html',
            controller:'ThemeImage'
          }
        }
      })
      .state('app.rangeActivity', {
        url: '/rangeActivity/:range',
        disableBack:true,
        cache :true,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/newActivity.html',
            controller:'NewActivity'
          }
        }
      })
      .state('app.activityDiscuss', {
        url: '/activityDiscuss/:id',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityDiscuss.html',
            controller:'ActivityDiscuss'
          }
        }
      })
      .state('app.activityItem', {
        url: '/activityItem/:id',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityItem.html',
            controller:'ActivityItem'
          }
        }
      })
      .state('app.editActivty', {
        url: '/editActivty/:id',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/newActivity.html',
            controller:'EditActivity'
          }
        }
      })
      .state('app.activityList',{
        url:'/activityList/:type',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityList.html',
            controller:'ActivityList'
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
      })
      //活动账单的显示
      .state('app.activityBill', {
        url: '/activityBill/',
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityBill.html',
            controller: 'activityBillCtrl'
          }
        }
      })
      //活动账单的添加页面
      .state('app.addPersonBill', {
        url: '/addPersonBill/',
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/addPersonBill.html',
            controller: 'addPersonBillCtrl'
          }
        }
      })

  });
