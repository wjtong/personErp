angular.module('login.services', [])

  //登陆*****************************************************************************************************************
  .factory('Login', function ($rootScope) {
    return {
      //手机好登陆（找回）
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
      //微信登陆(找回)
      userWeChatAppLoginBack: function (code, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userWeChatAppLoginBack",
          data: {
            code: code
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
      //微信登陆(绑定)
      userWeChatAppLogin: function (code,partyId, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userWeChatAppLogin",
          data: {
            code: code,
            partyId:partyId
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
    }
  });
