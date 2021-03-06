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
      userWeChatAppLogin: function (code, partyId, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userWeChatAppLogin",
          data: {
            code: code,
            partyId: partyId
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
      userAppRegister: function (tel, captcha, nickName, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userAppRegister",
          data: {
            tel: teleNumber,
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
      //获取验证码
      getLoginCaptcha: function (teleNumber, smsType, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "getLoginCaptcha",
          data: {
            teleNumber: teleNumber,
            smsType: smsType
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
      //获取更改手机号验证码
      getUpdateInfoCaptcha: function (teleNumber, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "getUpdateInfoCaptcha",
          data: {
            teleNumber: teleNumber,
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
