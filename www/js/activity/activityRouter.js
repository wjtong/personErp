angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider

    //活动详情
      .state('tab.activityDetails', {
        url: '/activityDetails/:activityId',
        disableBack: true,
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
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activitySlide.html',
            controller: 'slideCrl'
          }
        }
      })
      //活动参与人员
      .state('tab.activityParticipant', {
        url: '/Participant/:workEffortId',
        disableBack: true,
        cache:true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityParticipant.html',
            controller: 'activityParticipant'
          }
        }
      })
      //活动添加活动参与人员
      .state('tab.activityAddPerson', {
        url: '/activityAddPerson/:workEffortId',
        disableBack: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityAddPerson.html',
            controller: 'activityAddPerson'
          }
        }
      })
      //活动文本预览
      .state('tab.activityPreview', {
        url: '/activityPreview/:workEffortId',
        disableBack: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityPreview.html',
            controller: 'activityPreview'
          }
        }
      })
      //联系人信息详情
      .state('tab.joinContactInfo', {
        url: '/contactInfo/:partyId',
        views: {
          'tab-dash': {
            templateUrl: 'templates/contact/contactInfo.html',
            controller: 'contactInfo'
          }
        }
      })
      //活动二微码
      .state('tab.activityCode', {
        url: '/activityCode/:workEffortId',
        disableBack: true,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityCode.html',
            controller: 'activityCode'
          }
        }
      })
      //活动讨论（实时聊天融云）
      .state('tab.activityDiscuss', {
        url: '/activityDiscuss/:communicationEventId/:workEffortId',
        disableBack: true,
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
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityItem.html',
            controller: 'ActivityItem'
          }
        }
      })
      //活动事项
      .state('tab.activityMatter', {
        url: '/activityMatter/:workEffortId',
        disableBack: true,
        cache:false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/activityMatter.html',
            controller: 'ActivityMatter'
          }
        }
      })
      //创建事项
      .state('tab.createMatter', {
        url: '/createMatter/:workEffortId',
        disableBack: true,
        cache:false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/activity/createMatter.html',
            controller: 'createMatter'
          }
        }
      })
  });
