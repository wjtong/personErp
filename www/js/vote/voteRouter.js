/**************************** 投票 *****************************************/
angular.module('starter')

.config(function ($stateProvider) {
  $stateProvider
    //相关投票列表
    .state('tab.voteList', {
      url: '/voteList/:workEffortId',
      cache :false,
      params: {'workEffortId': null},
      views: {
        'tab-dash': {
          templateUrl: 'templates/vote/voteList.html',
          controller: 'voteListCtrl'
        }
      }
    })
    //创建投票
    .state('tab.goEditVote', {
      url: '/goEditVote/:workEffortId',
      cache :false,
      params: {
        'workEffortId': null
      },
      views: {
        'tab-dash': {
          templateUrl: 'templates/vote/editVote.html',
          controller: 'editVoteCtrl'
        }
      }
    })
    //投票
    .state('tab.goCastVote', {
      url: '/goCastVote',
      params: {
        'surveyId': null,
        'surveyName': null,
        'workEffortId': null
      },
      cache :false,
      views: {
        'tab-dash': {
          templateUrl: 'templates/vote/castVote.html',
          controller: 'castVoteCtrl'
        }
      }
    })

});
