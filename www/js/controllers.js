angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope,$ionicPopover,Login) {
  //设置全局变量＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  if(localStorage['partyId'] == null){
    localStorage['partyId'] = 'jinlongxi';
  }
  $rootScope.partyId = localStorage['partyId'];

  if(localStorage['userLoginId'] == null){
    localStorage['userLoginId'] = 'jinlongxi';
  }
  $rootScope.userLoginId = localStorage['userLoginId'];

  if(localStorage['countryGeoId'] == null){
    localStorage['countryGeoId'] = 'CHN';
  }
  $rootScope.countryGeoId = localStorage['countryGeoId'];

})

//主页＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃
  .controller('HomeCtrl', function($scope,$ionicModal,Activity) {
    $scope.active=Activity.getAllActivity();
    $scope.newActivity=function () {
      $location.path('/app/newActivity')
    };
    $scope.activityDetails=function (id) {
      $location.path("/app/activityDetails/"+id);
    };

    //底部弹出框
      $ionicModal.fromTemplateUrl('templates/new-task-main.html', function(modal) {
          $scope.taskModal = modal;
      }, {
          scope: $scope
      });
      $scope.newTask = function() {
          $scope.taskModal.show();
      };
      $scope.closeNewTask = function() {
          $scope.taskModal.hide();
      }
  })
;
