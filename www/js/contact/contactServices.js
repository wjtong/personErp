angular.module('contact.services', [])

//联系人列表
  .factory('Contact', function ($rootScope) {
    var tarjeta = localStorage.getItem('tarjeta');

    return {
      //获得联系人列表
      queryAllActivityRelationPersons: function (cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryAllActivityRelationPersons",
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
      //更新用户个人信息
      updatePersonInfo: function (firstName, gender, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "updatePersonInfo",
          data: {
            tarjeta: tarjeta,
            firstName: firstName,
            gender: gender
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
      uploadPartyContent: function (dataCategoryId, contentTypeId, statusId, isPublic, partyContentTypeId, partyId, uploadedFile, cb) {
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
      //查询用户的个人信息
      queryPersonInfo: function (cb) {
        var tarjeta = localStorage.getItem('tarjeta');
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
      //绑定用户手机号码
      updateLoginTel: function (partyId, tel, captcha, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "updateLoginTel",
          data: {
            tarjeta: tarjeta,
            partyId: partyId,
            tel: tel,
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
      //查询联系人的信息详情
      findUserDetail: function (partyId, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.communicationfaceUrl + "findUserDetail",
          data: {
            tarjeta: tarjeta,
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
      //修改联系人备注名称
      remarksContact: function (partyId, markName, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.communicationfaceUrl + "remarksContact",
          data: {
            tarjeta: tarjeta,
            partyId: partyId,
            markName: markName
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




