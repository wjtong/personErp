angular.module('vote.services', [])

  .service("voteService", function ($q, $rootScope) {

    return {
      //查询投票
      findActivityPollQuestionsTitle: function (workEffortId) {
        var tarjeta = localStorage.getItem('tarjeta');
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.voteInterfaceUrl + "queryActivityVoteQuestionsTitle",
            type: "POST",
            data: {
              "tarjeta": tarjeta,
              "workEffortId": workEffortId
            },
            success: function (result) {
              console.log(result);
              if (result.resultMap.resultMsg == '成功') {
                deferred.resolve(result);
              } else {
                deferred.reject(result);
              }
            }
          });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      },
      //创建投票
      createSurveyAndQuestions: function (workEffortId, surveyName, questions) {
        var tarjeta = localStorage.getItem('tarjeta');
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.voteInterfaceUrl + "createSurveyAndQuestions",
            type: "POST",
            data: {
              "tarjeta": tarjeta,
              "workEffortId": workEffortId,  // 活动id
              "surveyName": surveyName,
              "isAnonymous": "N",
              "allowMultiple": "Y",
              "allowUpdate": "Y",
              "questions": questions

            },
            success: function (result) {
              console.log(result);
              if (result.resultMap.resultMsg == '成功') {
                deferred.resolve(result);
              } else {
                deferred.reject(result);
              }
            }
          });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      },
      //查询投票详情
      findActivityPollQuestions: function (surveyId) {
        var tarjeta = localStorage.getItem('tarjeta');
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.voteInterfaceUrl + "queryActivityVoteQuestions",
            type: "POST",
            data: {
              "tarjeta": tarjeta,
              "surveyId": surveyId
            },
            success: function (result) {
              console.log(result);
              if (result.resultMap.resultMsg == '成功') {
                deferred.resolve(result);
              } else {
                deferred.reject(result);
              }
            }
          });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      },
      //点击投票
      doPollQuestion: function (surveyId, surveyQuestionId) {
        var tarjeta = localStorage.getItem('tarjeta');
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.voteInterfaceUrl + "doVoteQuestion",
            type: "POST",
            data: {
              "tarjeta": tarjeta,
              "surveyId": surveyId,
              "surveyQuestionId": surveyQuestionId
            },
            success: function (result) {
              console.log(result);
              if (result.resultMap.resultMsg == '成功') {
                deferred.resolve(result);
              } else {
                deferred.reject(result);
              }
            }
          });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      }
    };
  });
