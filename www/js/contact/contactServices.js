angular.module('contact.services', [])

//联系人列表
  .factory('Contact', function ($rootScope) {

    return {
      //获得联系人(联动)
      queryAllActivityRelationPersons: function (partyId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryAllActivityRelationPersons",
          data: {partyId: partyId},
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
      //更新联系人信息
      updatePersonInfo: function (partyId,firstName,gender, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "updatePersonInfo",
          data: {
            partyId: partyId,
            firstName:firstName,
            gender:gender,
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
      //上传用户头像
      uploadPartyContent: function (dataCategoryId,contentTypeId, statusId,isPublic,partyContentTypeId,partyId,uploadedFile,cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "uploadPartyContent",
          data: {
            dataCategoryId: dataCategoryId,
            contentTypeId: contentTypeId,
            statusId: statusId,
            isPublic: isPublic,
            partyContentTypeId: partyContentTypeId,
            partyId: partyId,
            uploadedFile: uploadedFile,
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
      //查询联系人的个人信息
      queryPersonInfo: function (tarjeta, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryPersonInfo",
          data: {tarjeta: tarjeta},
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
      //绑定联系人手机号码
      updateLoginTel: function (tarjeta,partyId,tel,captcha,cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "updateLoginTel",
          data: {
            tarjeta: tarjeta,
            partyId:partyId,
            tel:tel,
            captcha:captcha
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
  });




