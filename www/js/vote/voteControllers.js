angular.module('vote.controllers', [])

/*
 * Desc 创建投票
 * Author LN
 * Date 2017-3-3
 * */
  .controller('editVoteCtrl', function($scope, $state, $stateParams, $ionicPopup, voteService) {
    $scope.workEffortId = $stateParams.workEffortId; // 活动ID
    // alert($scope.workEffortId);
    // 添加投票选项
    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea style='display: inline-block;width: 81%;resize:none' class='questions' placeholder='投票项'></textarea>" +
        "<img src='img/shanchu.jpeg' width=48px height=48px onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><hr>" +
        "");
    };

    // 创建投票
    $scope.createSurveyAndQuestions = function () {
      var voteTitle=$("input").val()
      var questions = ''; // 投票项

      for (var i = 0; i < $("textarea").length; i++) {
        var question = $("textarea").eq(i).val();
        if(question.trim() == ''){
          continue;
        }
        questions += question+"&";
      }

      voteService.createSurveyAndQuestions($scope.workEffortId, voteTitle, questions).success(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: '成功',
          template: "创建投票项成功！"
        });
        alertPopup.then(function(res) {
          $state.go("app.voteList", {"workEffortId": $scope.workEffortId});
        });
      }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: "添加失败，请重新添加！"
        });
      });

    };
  })


/*
 * Desc 投票页面
 * Author LN
 * Date 2017-3-3
 * */
  .controller('castVoteCtrl', function($scope, $stateParams, $ionicPopup, $state, Contact, voteService) {
    // 投票详情 展开/合拢
    $scope.onOff = false;
    $scope.changeOnOff = function (onOff) {
      if (onOff == true) {
        $scope.onOff = false;
      } else {
        $scope.onOff = true;
      }
    };

    $scope.surveyId = $stateParams.surveyId;          // 投票标题ID
    $scope.surveyName = $stateParams.surveyName;      // 投票标题
    $scope.workEffortId = $stateParams.workEffortId;  // 活动ID
    $scope.siginUp='投票';

    voteService.findActivityPollQuestions($scope.surveyId).success(function (data) {
      $scope.questions = data.resultMap.questions;                         // 投票项列表
      $scope.ret = {choice: '0'};                                          // 单选必须初始化 不然拿不到想要的值 卧槽

      var partyResponceAnswers = data.resultMap.partyResponceAnswer;       // 投票详情列表
      var voteArr = [];
      for(var i=0;i<partyResponceAnswers.length;i++){
        if(partyResponceAnswers[i] == null){
          continue;
        }else{
          voteArr.push({
            'question':partyResponceAnswers[i].question,
            'nickName':partyResponceAnswers[i].nickName
          });
        }
        //判断用户是否已经投票，不允许重复投票
        var partyId=localStorage.getItem("partyId");
        alert(partyId);
        if(partyResponceAnswers[i].partyId==partyId){
          $(function () {
            $('#signUp').attr("disabled",true);
            $scope.siginUp='已投票';
          })
        }
      }
      // console.log(voteArr);
      $scope.voteArrs = voteArr;
    });

    $scope.doPollQuestion = function (surveyQuestionId) {
      if(surveyQuestionId == '0'){
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
        alertPopup.then(function(res) {
          $state.go("app.voteList", {"workEffortId": $scope.workEffortId});
        });
      }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: "添加失败，请重新添加！"
        });
      });
    };

  })


/*
 * Desc 投票列表
 * Author LN
 * Date 2017-3-3
 * */
  .controller('voteListCtrl', function($scope, $state, $ionicPopup, $stateParams, voteService) {
    $scope.workEffortId = $stateParams.workEffortId; // 活动ID

    // alert($scope.workEffortId);
    voteService.findActivityPollQuestionsTitle($scope.workEffortId).success(function (data) {
      console.log(data.resultMap.activityPollQuestionsTitle);
      $scope.activityPollQuestionsTitles = data.resultMap.activityPollQuestionsTitle; // 投票列表
    });

  })


;


