angular.module('starter.controllers', [])


.controller('opinionCtrl', function($scope, Platform,$ionicPopup,$state) {
  //提交意见
  $scope.Modle={};
  $scope.createSuggest=function () {
    Platform.createSuggest($scope.Modle.suggest,function (data) {
      if(data.resultMsg=="成功"){
        $ionicPopup.alert({
          title: '意见反馈',
          template: "发送成功"
        });
        $state.go('tab.account')
      }
    })
  }
});


