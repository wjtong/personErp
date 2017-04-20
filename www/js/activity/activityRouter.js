angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider
    //活动主页
      .state('app.activityHome', {
        url: '/activityHome',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityHome.html',
            controller: 'ActivityHome'
          }
        }
      })
      //活动详情
      .state('app.activityDetails', {
        url: '/activityDetails/:activityId',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityDetails.html',
            controller: 'ActivityDetails'
          }
        }
      })
      // //活动详情备用
      // .state('app.activityDetails2', {
      //   url: '/activityDetails2/:activityId/:type',
      //   disableBack: true,
      //   cache: false,
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/activity/activityDetails.html',
      //       controller: 'ActivityDetails'
      //     }
      //   }
      // })
      //活动照片墙
      .state('app.slide', {
        url: '/slide/:activityId/:index',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activitySlide.html',
            controller: 'slideCrl'
          }
        }
      })
      //活动照片墙
      .state('app.activityAddPerson', {
        url: '/activityAddPerson/:workEffortId',
        disableBack: true,
        cache: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityAddPerson.html',
            controller: 'activityAddPerson'
          }
        }
      })
      //活动二微码
      .state('app.activityCode', {
        url: '/activityCode/:workEffortId',
        disableBack: true,
        cache: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityCode.html',
            controller: 'activityCode'
          }
        }
      })
      //新建活动
      .state('app.newActivity', {
        url: '/newActivity/:type',
        disableBack: true,
        cache: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/newActivity.html',
            controller: 'NewActivity'
          }
        }
      })
      //活动主题图片
      .state('app.themeImage', {
        url: '/themeImage',
        disableBack: true,
        cache: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityThemeImage.html',
            controller: 'ThemeImage'
          }
        }
      })
      //活动讨论（实时聊天融云）
      .state('app.activityDiscuss', {
        url: '/activityDiscuss/:activityId',
        disableBack: true,
        cache: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityDiscuss.html',
            controller: 'ActivityDiscuss'
          }
        }
      })
      //活动项
      .state('app.activityItem', {
        url: '/activityItem/:id',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityItem.html',
            controller: 'ActivityItem'
          }
        }
      })
      //活动邀请
      .state('app.activityInvitation', {
        url: '/activityInvitation/:workEffortId/:partyId',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityInvitation.html',
            controller: 'ActivityInvitation'
          }
        }
      })
      //编辑活动
      .state('app.editActivty', {
        url: '/editActivty/:id/:type',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/newActivity.html',
            controller: 'NewActivity'
          }
        }
      })
      //活动（由我组织的活动列表  往期活动 邀请列表   共用一个界面）
      .state('app.activityList', {
        url: '/activityList/:type',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityList.html',
            controller: 'ActivityList'
          }
        }
      })
      //活动账单的显示
      .state('app.activityBill', {
        url: '/activityBill/:workEffortId',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/activityBill.html',
            controller: 'activityBillCtrl'
          }
        }
      })
      //活动账单的添加页面
      .state('app.addPersonBill', {
        url: '/addPersonBill/:workEffortId',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/activity/addPersonBill.html',
            controller: 'addPersonBillCtrl'
          }
        }
      })

  });
