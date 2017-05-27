angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider
    //联系人信息详情
      .state('tab.contactInfo', {
        url: '/contactInfo/:partyId',
        cache: false,
        views: {
          'tab-chats': {
            templateUrl: 'templates/contact/contactInfo.html',
            controller: 'contactInfo'
          }
        }
      })
      //编辑用户个人信息
      .state('tab.editPersonInfo', {
        url: '/editPersonInfo/:partyId',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'templates/contact/editPersonInfo.html',
            controller: 'editPersonInfo'
          }
        }
      })
      //绑定用户手机号码
      .state('tab.bindTelephone', {
        url: '/bindTelephone/:partyId',
        cache: false,
        views: {
          'tab-account': {
            templateUrl: 'templates/contact/bindTelephone.html',
            controller: 'bindTelephone'
          }
        }
      });
  });
