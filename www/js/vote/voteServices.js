angular.module('vote.services', [])

  .service("voteService", function ($q, $rootScope) {
    var tarjeta = localStorage.getItem("tarjeta"); // token

    return {
      /* @Service 当前活动的投票标题列表
       * @Params 活动ID、活动标题、投票选项
       * */
      findActivityPollQuestionsTitle: function (workEffortId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.interfaceUrl + "findActivityPollQuestionsTitle",
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

      /* @Service 创建一个新的投票标题、和它的投票项
       * @Params 活动ID、活动标题、投票选项
       * */
      createSurveyAndQuestions: function (workEffortId, surveyName, questions) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.interfaceUrl + "createSurveyAndQuestions",
            type: "POST",
            data: {
              "tarjeta": tarjeta,
              "workEffortId": "10261",  // 活动id
              "surveyName":surveyName,
              "isAnonymous":"N",
              "allowMultiple":"Y",
              "allowUpdate":"Y",
              "questions":questions

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

      /* @Service 查询投票项的投票情况 和实际投票的人
       * @Params 投票标题ID
       * */
      findActivityPollQuestions: function (surveyId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.interfaceUrl + "findActivityPollQuestions",
            type: "POST",
            data: {
              "tarjeta": tarjeta,
              "surveyId":surveyId
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

      /* @Service 用户点击投票
       * @Params 投票标题ID,投票项ID
       * */
      doPollQuestion: function (surveyId, surveyQuestionId) {
        alert(surveyId+" "+surveyQuestionId);
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.interfaceUrl + "doPollQuestion",
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
      },



    };
  });
