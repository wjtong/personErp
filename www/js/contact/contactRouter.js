/**************************** 投票 *****************************************/
angular.module('starter')

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider

      .state('app.contactlist', {
        url: '/contactlist',
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/contactlist.html',
            controller: 'ContactlistCtrl'
          }
        }
      })
      .state('app.personhome', {
        url: '/contactlist/:contactId',
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/personhome.html',
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
            templateUrl: 'templates/contact/addPerson.html',
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
            templateUrl: 'templates/contact/addPerson.html',
            controller: 'UpdatePersonInfo'
          }
        }
      })
      .state('app.abouthim', {
        url: '/abouthim/:personId',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/abouthim.html',
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
            templateUrl: 'templates/contact/editAddress.html',
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
            templateUrl: 'templates/contact/editAddress.html',
            controller: 'EditAddress'
          }
        }
      })
      .state('app.chatList',{
        url:'/chatList',
        disableBack:true,
        cache :false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/chatList.html',
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
            templateUrl: 'templates/contact/chatPersonList.html',
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
            templateUrl: 'templates/contact/personLabel.html',
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
            templateUrl: 'templates/contact/labelPersonList.html',
            controller: 'LabelPersonList'
          }
        }
      })

  });
