angular.module('starter.services', [])

.factory('Platform', function($rootScope) {
  // Might use a resource here that returns a JSON array

  return {
    //用户提交意见反馈
    createSuggest: function (suggest, cb) {
      var tarjeta = localStorage.getItem('tarjeta');
      $.ajax({
        url: $rootScope.platformInterfaceUrl + "createSuggest",
        data: {
          tarjeta:tarjeta,
          suggest: suggest
        },
        async: false,
        type: 'POST',
        success: function (result) {
          if (jQuery.type(result) === "string") {
            result = jQuery.parseJSON(result);
          }
          if (result.resultMap != null) {
            if ($.type(cb) === 'function') {
              cb(result.resultMap);
            }
          }
        }
      });
    },
    //查询BUG
    queryProblemList: function (statusId,cb) {
      var tarjeta = localStorage.getItem('tarjeta');
      $.ajax({
        url: $rootScope.platformInterfaceUrl + "queryProblemList",
        data: {
          tarjeta:tarjeta,
          statusId:statusId
        },
        async: false,
        type: 'POST',
        success: function (result) {
          if (jQuery.type(result) === "string") {
            result = jQuery.parseJSON(result);
          }
          if (result.resultMap != null) {
            if ($.type(cb) === 'function') {
              cb(result.resultMap);
            }
          }
        }
      });
    },
    //更新BUG状态
    updateProblem: function (statusId,pId,cb) {
      var tarjeta = localStorage.getItem('tarjeta');
      $.ajax({
        url: $rootScope.platformInterfaceUrl + "updateProblem",
        data: {
          tarjeta:tarjeta,
          statusId:statusId,
          pId:pId
        },
        async: false,
        type: 'POST',
        success: function (result) {
          if (jQuery.type(result) === "string") {
            result = jQuery.parseJSON(result);
          }
          if (result.resultMap != null) {
            if ($.type(cb) === 'function') {
              cb(result.resultMap);
            }
          }
        }
      });
    },
    //删除BUG记录
    removeProblem: function (pId,cb) {
      var tarjeta = localStorage.getItem('tarjeta');
      $.ajax({
        url: $rootScope.platformInterfaceUrl + "removeProblem",
        data: {
          tarjeta:tarjeta,
          pId:pId
        },
        async: false,
        type: 'POST',
        success: function (result) {
          if (jQuery.type(result) === "string") {
            result = jQuery.parseJSON(result);
          }
          if (result.resultMap != null) {
            if ($.type(cb) === 'function') {
              cb(result.resultMap);
            }
          }
        }
      });
    },
    //创建BUGqueryProblemList
    createProblem: function (description, cb) {
      var tarjeta = localStorage.getItem('tarjeta');
      $.ajax({
        url: $rootScope.platformInterfaceUrl + "createProblem",
        data: {
          tarjeta:tarjeta,
          description: description
        },
        async: false,
        type: 'POST',
        success: function (result) {
          if (jQuery.type(result) === "string") {
            result = jQuery.parseJSON(result);
          }
          if (result.resultMap != null) {
            if ($.type(cb) === 'function') {
              cb(result.resultMap);
            }
          }
        }
      });
    }
  };
});
