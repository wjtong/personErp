angular.module('starter.controllers', [])

  /*********************************************************************************************************************
   * Desc 意见反馈
   * Author LX
   * Date 2017-3-3
   * Last modified date  2017-7-5
   * */
  .controller('opinionCtrl', function ($scope, Platform, $ionicPopup, $state) {
    //提交意见
    $scope.Modle = {};
    $scope.createSuggest = function () {
      Platform.createSuggest($scope.Modle.suggest, function (data) {
        if (data.resultMsg == "成功") {
          $ionicPopup.alert({
            title: '意见反馈',
            template: "发送成功"
          });
          $state.go('tab.account')
        }
      })
    }
  })

  /*********************************************************************************************************************
   * Desc BUG修复记录
   * Author LX
   * Date 2017-3-3
   * Last modified date  2017-7-10
   * */
  .controller('BugFixCtrl', function ($scope, Platform, $ionicPopup,$ionicActionSheet) {
    $scope.Bug = {};
    $scope.BugState = [
      {id: 'OPEN', state: '未开始'},
      {id: 'FIXING', state: '处理中'},
      {id: 'WAITCHECK', state: '待审批'},
      {id: 'CLOSE', state: '已修复'}
    ];

    //分类查询
    $scope.bugClassify=function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '处理中'},
          {text: '待审批'},
          {text: '已修复'},
          {text: '微信分享'}
        ],
        titleText: '管理',
        cancelText: '取消',
        cancel: function () {
          // 这里添加取消代码
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              hideSheet();
              $scope.queryProblem('FIXING');
              break;
            case 1:
              hideSheet();
              $scope.queryProblem('WAITCHECK');
              break;
            case 2:
              hideSheet();
              $scope.queryProblem('CLOSE');
              break;
            case 3:
              hideSheet();
              Wechat.share({
                message: {
                  title: 'Bug记录:',
                  description: '目前位置的全部BUG',
                  thumb: 'www/img/activityImg/bug.png',
                  media: {
                    type: Wechat.Type.WEBPAGE,
                    webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/viewProblemList'
                  }
                },
                scene: Wechat.Scene.SESSION // share to SESSION
              }, function () {
                alert("Success");
              }, function (reason) {
                alert("Failed: " + reason);
              });
              break;
            default:
              alert('请选择')
          }
        }
      });
    };

    //下拉刷新
    $scope.doRefresh = function () {
      $scope.queryProblem();
      $scope.$broadcast("scroll.refreshComplete");
    };

    //查询BUG记录
    $scope.queryProblem = function (statusId) {
      Platform.queryProblemList(statusId,function (data) {
        console.log(data);
        $scope.problemList = data.problemList;
      });
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryProblem()
    });

    //修改问题状态
    $scope.UpdateState = function (statusId, pId) {
      Platform.updateProblem(statusId, pId, function (data) {
        console.log(data);
        $scope.queryProblem()
      })
    };

    //删除BUG记录
    $scope.removeProblem = function (pId) {
      Platform.removeProblem(pId, function (data) {
        console.log(data);
        $scope.queryProblem()
      })
    };

    //创建问题
    $scope.createProblem = function () {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<textarea rows="3" ng-model="data.problem">',
        title: '新建问题',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>创建</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.problem) {
                e.preventDefault();
                alert('内容不能为空')
              } else {
                Platform.createProblem($scope.data.problem, function (data) {
                  console.log(data)
                  $scope.queryProblem()
                })
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    }
  });


