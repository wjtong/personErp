angular.module('login.services', [])

//登陆＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  .factory('Login', function ($rootScope) {
    return {
      //登陆
      login: function (userLoginId, captcha, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userAppLogin",
          data: {
            userLoginId: userLoginId,
            captcha: captcha
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
      //验证用户是否存在
      userLoginExsit: function (userLoginId, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "isUserLoginExsits",
          data: {
            userLoginId: userLoginId
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
      //用户注册
      userAppRegister: function (teleNumber, captcha, nickName, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userAppRegister",
          data: {
            teleNumber: teleNumber,
            captcha: captcha,
            nickName: nickName
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
    }
  })
