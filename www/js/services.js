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
  };
});
