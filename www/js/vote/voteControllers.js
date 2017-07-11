angular.module('vote.controllers', [])

/***********************************************************************************************************************
 * Desc 投票列表
 * Author LN
 * Date 2017-3-3
 * */
  .controller('voteListCtrl', function ($scope, $state, $ionicPopup, $stateParams, voteService) {
    //参数准备
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.partyId = localStorage.getItem('partyId');

    //定义查询投票列表
    $scope.queryVoteList = function () {
      //查询我的投票列表
      voteService.findActivityPollQuestionsTitle($scope.workEffortId).success(function (data) {
        console.log(data.resultMap.activityPollQuestionsTitle);
        $scope.activityPollQuestionsTitles = data.resultMap.activityPollQuestionsTitle;
      });
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryVoteList()
    });

    //删除投票
    $scope.deleteVote = function (id) {
      voteService.removeVote(id, function (data) {
        console.log('删除投票:' + data.resultMsg);
        if (data.resultMsg) {
          $scope.queryVoteList()
        }
      })
    };

    //结束投票
    $scope.finishVote = function (id) {
      voteService.closeVote(id, function (data) {
        console.log('结束投票:' + data.resultMsg);
        if (data.resultMsg) {
          $scope.queryVoteList()
        }
      })
    };
  })

  /*********************************************************************************************************************
   * Desc 创建投票
   * Author LN
   * Date 2017-3-3
   */
  .controller('editVoteCtrl', function ($scope, $state, $stateParams, $ionicPopup, voteService) {
    //准备参数
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.Vote = {};

    // 添加投票选项
    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea name='voteItem' style='display: inline-block;width: 81%;resize:none' rows='1' class='questions' placeholder='选项'></textarea>" +
        "<img src='../www/img/activityImg/矢量智能对象-拷贝@2x.png' width=18 height=18 onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><hr>" +
        "");
    };

    // 创建投票
    $scope.createSurveyAndQuestions = function () {
      var questions = ''; // 投票项
      var voteItem = $("textarea[name='voteItem']");
      for (var i = 0; i < voteItem.length; i++) {
        var question = voteItem.eq(i).val();
        if (question.trim() == '') {
          continue;
        }
        questions += question + "&";
      }
      console.log(questions);
      voteService.createSurveyAndQuestions($scope.workEffortId, $scope.Vote.voteTitle, questions).success(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: "创建投票项成功！"
        });
        alertPopup.then(function (res) {
          $state.go("tab.voteList", {"workEffortId": $scope.workEffortId});
        });
      }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: "添加失败，请重新添加！"
        });
      });

    };
  })

  /*********************************************************************************************************************
   * Desc 投票页面
   * Author LN
   * Date 2017-3-3
   * */
  .controller('castVoteCtrl', function ($scope, $stateParams, $ionicPopup, $state, Contact, voteService) {
    //参数准备
    $scope.surveyId = $stateParams.surveyId;
    $scope.surveyName = $stateParams.surveyName;
    $scope.workEffortId = $stateParams.workEffortId;
    var activityData = localStorage.getItem("activityData" + $scope.workEffortId);
    $scope.workEffortName = jQuery.parseJSON(activityData).workEffortName;
    $scope.siginUp = '投票';
    $scope.partyId = localStorage.getItem('partyId');

    //定义查询方法
    $scope.queryVoteList = function () {
      voteService.findActivityPollQuestions($scope.surveyId).success(function (data) {
        $scope.questions = data.resultMap.questions;
        $scope.ret = {choice: '0'};

        $scope.partyResponceAnswers = data.resultMap.partyResponceAnswer;
        $scope.partyResponceAnswersCount = $scope.partyResponceAnswers.length;

        $scope.vote = data.resultMap.vote;
        if ($scope.partyResponceAnswers.length > 0) {
          $scope.responceAnswersCount = $scope.partyResponceAnswers.length;
        } else {
          $scope.responceAnswersCount = 1
        }

        var voteArr = [];
        for (var i = 0; i < $scope.partyResponceAnswers.length; i++) {
          if ($scope.partyResponceAnswers[i].partyId == $scope.partyId) {
            $scope.mySelect = $scope.partyResponceAnswers[i].question
          }
        }
        $scope.voteArrs = voteArr;
        console.log($scope.voteArrs)
      });
    };

    $scope.$on('$ionicView.enter', function () {
      $scope.queryVoteList()
    });

    //点击投票
    $scope.doPollQuestion = function (surveyQuestionId) {
      if ($scope.mySelect != undefined) {
        alert('你已经投过票了，不能重复投票')
      } else {
        var confirmPopup = $ionicPopup.confirm({
          title: '确定投票',
          template: '确定投票不可修改，是否继续？'
        });
        confirmPopup.then(function (res) {
          if (res) {
            if (surveyQuestionId == '0') {
              $ionicPopup.alert({
                title: '提示',
                template: "请选择要投票的选项！"
              });
            }
            voteService.doPollQuestion($scope.surveyId, surveyQuestionId).success(function (data) {
              var alertPopup = $ionicPopup.alert({
                title: '成功',
                template: "投票成功！"
              });
              alertPopup.then(function (res) {
                $scope.queryVoteList()
              });
            }).error(function (data) {
              var alertPopup = $ionicPopup.alert({
                title: '错误',
                template: "添加失败，请重新添加！"
              });
            });
          } else {
            console.log('You are not sure');
          }
        });
      }
    };

    //微信分享投票
    $scope.voteShare = function () {
      Wechat.share({
        message: {
          title: '分享投票: ' + $scope.surveyName,
          description: '活动: ' + $scope.workEffortName,
          thumb: 'www/img/activityImg/btn_投票_n@2x.png',
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/viewVoteList?workEffortId=' + $scope.workEffortId + "&surveyId=" + $scope.surveyId,
          }
        },
        scene: Wechat.Scene.SESSION // share to SESSION
      }, function () {
        alert("Success");
      }, function (reason) {
        alert("Failed: " + reason);
      });
    }
  });


