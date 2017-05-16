angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider
      //编辑联系人
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
      //绑定手机号码
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
