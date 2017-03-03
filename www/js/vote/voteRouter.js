/**************************** 投票 *****************************************/
angular.module('starter')

.config(function ($stateProvider) {
  $stateProvider

    .state('app.voteList', {
      url: '/voteList',
      cache :false,
      params: {'workEffortId': null},
      views: {
        'menuContent': {
          templateUrl: 'templates/vote/voteList.html',
          controller: 'voteListCtrl'
        }
      }
    })

    .state('app.goEditVote', {
      url: '/goEditVote',
      cache :false,
      params: {
        'workEffortId': null
      },
      views: {
        'menuContent': {
          templateUrl: 'templates/vote/editVote.html',
          controller: 'editVoteCtrl'
        }
      }
    })

    .state('app.goCastVote', {
      url: '/goCastVote',
      params: {
        'surveyId': null,
        'surveyName': null,
        'workEffortId': null
      },
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/vote/castVote.html',
          controller: 'castVoteCtrl'
        }
      }
    })
    .state('app.visualRange',{
      url:'/visualRange/',
      disableBack:true,
      cache :false,
      views: {
        'menuContent': {
          templateUrl: 'templates/activityVisualRange.html',
          controller: 'VisualRange'
        }
      }
    })

});
