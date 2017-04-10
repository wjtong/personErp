angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state) {
  $scope.partyId = localStorage.getItem("partyId");
  $scope.userLoginId = localStorage.getItem("userLoginId");
  $scope.img = localStorage.getItem("contactImg");
  $scope.loginOut=function () {
    alert("退出登陆杀死TOKEN");
    localStorage.removeItem("tarjeta");
    $state.go("app.activityHome")
  }
})

//主页******************************************************************************************************************
  .controller('HomeCtrl', function() {

  })
;
