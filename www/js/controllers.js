angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('HomeCtrl', function($scope) {
  $scope.playlists = [
    { title: '张厂长', id: 1, location: '浙江，海宁', image: 'img/team/img1-sm.jpg', message: '500公斤皮料已送到，450公斤接受入库' },
    { title: '王小明', id: 2, location: '浙江，杭州', image: 'img/team/img2-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '李经理', id: 3, location: '浙江，杭州', image: 'img/team/img3-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '李经理', id: 4, location: '浙江，杭州', image: 'img/team/img4-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '李经理', id: 5, location: '浙江，杭州', image: 'img/team/img5-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '宋经理', id: 6, location: '浙江，杭州', image: 'img/team/img6-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' }
  ];
})

.controller('ContactlistCtrl', function($scope) {
  $scope.playlists = [
    { title: '张厂长', id: 1, location: '浙江，海宁', image: 'img/team/img1-sm.jpg', message: '500公斤皮料已送到，450公斤接受入库' },
    { title: '王小明', id: 2, location: '浙江，杭州', image: 'img/team/img2-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '李经理', id: 3, location: '浙江，杭州', image: 'img/team/img3-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '李经理', id: 4, location: '浙江，杭州', image: 'img/team/img4-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '李经理', id: 5, location: '浙江，杭州', image: 'img/team/img5-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
    { title: '宋经理', id: 6, location: '浙江，杭州', image: 'img/team/img6-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.orders = [
    { time: '2016-03-04', id: 'CO10000' },
    { time: '2016-04-08', id: 'CO10001' },
    { time: '2016-07-23', id: 'CO10002' },
    { time: '2016-09-14', id: 'CO10003' },
    { time: '2016-10-09', id: 'CO10004' }
  ];
});
