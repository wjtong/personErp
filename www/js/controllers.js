angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
  //设置全局变量＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  $rootScope.userLoginId = localStorage['userLoginId'];

  if(localStorage['countryGeoId'] == null){
    localStorage['countryGeoId'] = 'CHN';
  }
  $rootScope.countryGeoId = localStorage['countryGeoId'];

})

//主页＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃
  .controller('HomeCtrl', function($scope,$ionicModal,Activity,ActivityPlace,$location,$state) {
    $scope.active=Activity.getAllActivity();
    $scope.newActivity=function () {
      $location.path('/app/newActivity')
    };
    $scope.activityDetails=function (id) {
      $location.path("/app/activityDetails/"+id);
    };
    //活动场所
    $scope.avtivityPlaceList=ActivityPlace.getAll()
    //地点详情
    $scope.goInfo=function (id) {
      $location.path("/app/activityPlace/"+id);
    }
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
    //活动模版详情
    $scope.goActivityTemplate=function (id) {
      $state.go("app.activityTemplate",{id:id})
    }
  })
;
