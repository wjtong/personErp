angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider

      //活动详情
      .state('tab.activityDetails', {
        url: '/activityDetails/:activityId',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityDetails.html',
            controller: 'ActivityDetails'
          }
        }
      })
      //活动详情备用
      .state('tab.activityDetails2', {
        url: '/activityDetails2/:activityId/:type',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityDetails.html',
            controller: 'ActivityDetails'
          }
        }
      })
      //活动照片墙
      .state('tab.slide', {
        url: '/slide/:activityId/:index',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activitySlide.html',
            controller: 'slideCrl'
          }
        }
      })
      //活动添加活动参与人员
      .state('tab.activityAddPerson', {
        url: '/activityAddPerson/:workEffortId',
        disableBack: true,
        cache: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityAddPerson.html',
            controller: 'activityAddPerson'
          }
        }
      })
      //活动二微码
      .state('tab.activityCode', {
        url: '/activityCode/:workEffortId',
        disableBack: true,
        cache: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityCode.html',
            controller: 'activityCode'
          }
        }
      })
      //活动讨论（实时聊天融云）
      .state('tab.activityDiscuss', {
        url: '/activityDiscuss/:activityId',
        disableBack: true,
        cache: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityDiscuss.html',
            controller: 'ActivityDiscuss'
          }
        }
      })
      //活动项
      .state('tab.activityItem', {
        url: '/activityItem/:id',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityItem.html',
            controller: 'ActivityItem'
          }
        }
      })
      //活动项
      .state('tab.activityMatter', {
        url: '/activityMatter/:workEffortId',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityMatter.html',
            controller: 'ActivityMatter'
          }
        }
      })
      //活动邀请
      .state('tab.activityInvitation', {
        url: '/activityInvitation/:workEffortId/:partyId',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityInvitation.html',
            controller: 'ActivityInvitation'
          }
        }
      })
      //活动（由我组织的活动列表  往期活动 邀请列表   共用一个界面）
      .state('tab.activityList', {
        url: '/activityList/:type',
        disableBack: true,
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityList.html',
            controller: 'ActivityList'
          }
        }
      })

  });
