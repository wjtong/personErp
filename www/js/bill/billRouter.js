/**
 * Created by jinlongxi on 17/6/6.
 */
angular.module('starter')

  .config(function ($stateProvider) {
    $stateProvider
    //活动账单的显示
      .state('tab.activityBill', {
        url: '/activityBill/:workEffortId',
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/bill/activityBill.html',
            controller: 'activityBillCtrl'
          }
        }
      })
      //活动账单的添加页面
      .state('tab.addPersonBill', {
        url: '/addPersonBill/:workEffortId',
        cache: false,
        views: {
          'tab-dash': {
            templateUrl: 'templates/bill/createBill.html',
            controller: 'addPersonBillCtrl'
          }
        }
      });
  });
