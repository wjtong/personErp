/**************************** 投票 *****************************************/
angular.module('starter')

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    //联系人列表
      .state('app.contactlist', {
        url: '/contactlist',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/contactlist.html',
            controller: 'ContactlistCtrl'
          }
        }
      })
      //添加新联系人
      .state('app.addPerson', {
        url: '/addPerson',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/addPerson.html',
            controller: 'AddPerson'
          }
        }
      })
      //编辑联系人
      .state('app.editPerson', {
        url: '/editPerson/:personId',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/addPerson.html',
            controller: 'UpdatePersonInfo'
          }
        }
      })
      //关于我的信息
      .state('app.aboutme', {
        disableBack: true,
        url: '/aboutme',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/aboutme.html',
            controller: 'AboutMe'
          }
        }
      })
      //关于联系人的信息
      .state('app.abouthim', {
        url: '/abouthim/:personId',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/abouthim.html',
            controller: 'AboutHim'
          }
        }
      })
      //添加联系人地址
      .state('app.addAddress', {
        url: '/addAddress',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/editAddress.html',
            controller: 'EditAddress'
          }
        }
      })
      //联系人编辑地址
      .state('app.editAddress', {
        url: '/editAddress/:id',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/editAddress.html',
            controller: 'EditAddress'
          }
        }
      })
      //联系人拥有的标签
      .state('app.personLabel', {
        url: '/personLabel',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/personLabel.html',
            controller: 'PersonLabel'
          }
        }
      })
      //联系人的标签内的人员
      .state('app.labelPersonList', {
        url: '/labelPersonList/:partyId',
        disableBack: true,
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/contact/labelPersonList.html',
            controller: 'LabelPersonList'
          }
        }
      })

  });
