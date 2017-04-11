angular.module('activity.services', [])

//活动连接后台************************************************************************************************************
  .factory('ActivityServer', function ($rootScope, $q, $http) {

    return {
      //上次UUID
      setUUID: function (uuid, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "getTarJetaFromUUID",
          data: {
            uuid:uuid
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
      //新建活动
      createActivity: function (tarjeta, workEffortName, actualStartDate, estimatedCompletionDate, locationDesc, description, specialTerms,themesId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createNewEvent",
          data: {
            tarjeta: tarjeta,
            workEffortName: workEffortName,
            actualStartDate: actualStartDate,
            estimatedCompletionDate: estimatedCompletionDate,
            locationDesc: locationDesc,
            description: description,
            specialTerms: specialTerms,
            themesId:themesId
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
      //编辑活动
      updateActivity: function (tarjeta, workEffortName, actualStartDate, estimatedCompletionDate, locationDesc,
                                description, specialTerms,workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "updateEvent",
          data: {
            tarjeta: tarjeta,
            workEffortName: workEffortName,
            actualStartDate: actualStartDate,
            estimatedCompletionDate: estimatedCompletionDate,
            locationDesc: locationDesc,
            description: description,
            specialTerms: specialTerms,
            workEffortId:workEffortId
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
      //新建活动项
      createActivityItem: function (tarjeta, workEffortId, workEffortName, actualStartDate, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createActivityProject",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            workEffortName: workEffortName,
            actualStartDate: actualStartDate
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
      //查询活动项
      findActivityItem: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryActivityProjects",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
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
      //活动主页活动列表
      myActivity: function (tarjeta, roleTypeId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryMyEvent",
          data: {
            tarjeta: tarjeta,
            roleTypeId: roleTypeId
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
      //活动详情
      getActivityDetails: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryMyEventDetail",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId
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
      //组织者信息填写
      userAppRegister: function (tarjeta, workEffortId,partyId,nickName,tel,captcha,cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userAppRegister",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            partyId:partyId,
            nickName:nickName,
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
      //活动报名
      signUp: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "translationActivity",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId
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
      //新建活动账单
      createActivityPayment: function (tarjeta, workEffortId, partyIdFrom, invoiceApplied, amountApplied, payDate, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createPartyPayment",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            partyIdFrom: partyIdFrom,
            invoiceApplied: invoiceApplied,
            amountApplied: amountApplied,
            payDate: payDate
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
      //查询活动账单
      findActivityPayment: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryActivityPayment",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
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
      //创建活动中的昵称
      createNickName: function (tarjeta,entityId,partyId,nickName,cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "createNickName",
          data: {
            tarjeta: tarjeta,
            entityId: entityId,
            nickNameTypeId:"10000",
            partyId:partyId,
            nickName:nickName
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
      //手动添加人员
      addConceptPersonToActivity: function (tarjeta,workEffortId,personInfoArray,cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "addConceptPersonToActivity",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            personInfoArray:personInfoArray,
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
      //上传图片到照片墙
      uploadPictureWall: function (tarjeta,workEffortId,imageData,cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "uploadPictureWall",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            imageData:imageData,
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
      //选择活动地址
      selectAddress: function (query, region, city_limit, output, ak) {
        var d = $q.defer();
        var promise = d.promise;
        $http.jsonp("http://api.map.baidu.com/place/v2/suggestion?query=" + query + "&region=" + region + "&output=" + output + "&ak=" + ak + "&city_limit=" + city_limit + "&callback=JSON_CALLBACK")
          .success(function (data) {
            d.resolve(data);
          })
          .error(function (error) {
            d.reject(error);
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
      //通过IP获得当前位置信息
      currentAddress: function (ak) {
        var d = $q.defer();
        var promise = d.promise;
        $http.jsonp("http://api.map.baidu.com/location/ip?ak=" + ak + "&callback=JSON_CALLBACK")
          .success(function (data) {
            console.log(data)
            d.resolve(data);
          })
          .error(function (error) {
            d.reject(error);
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
      //活动邀请好友发送短信
      sendInvitation: function (tarjeta, workEffortId, partyId, contact, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "sendInvitation",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            partyId: partyId,
            contact: contact
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
      //活动主题图片类型列表
      queryContentTypeList: function (cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "queryContentTypeList",
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
      //活动主题图片类型列表
      queryThemes: function (contentTypeId,cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "queryThemes",
          data:{
            contentTypeId:contentTypeId
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

  //活动主题图片＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  .factory('ThemeImage', function () {

    var shareImg = [
      {id: 'Pic_10021', img: 'img/share/Contact.png', name: '手机通讯录'},
      //{id:'Pic_10022',img:'img/share/QQ.jpeg',name:'QQ'},
      {id: 'Pic_10023', img: 'img/share/li1.jpeg', name: '梨友录'},
      {id: 'Pic_10024', img: 'img/share/微信.jpeg', name: '微信'},
      {id:'Pic_10025',img:'img/share/手动添加.jpeg',name:'手动添加'},
      {id: 'Pic_10026', img: 'img/share/朋友圈.jpeg', name: '朋友圈'},
     // {id: 'Pic_10027', img: 'img/share/facebook.png', name: 'faceBook'}
    ];
    var Img =
    {id: 'Pic_10080', img: 'img/resources/paobu3.jpeg', img2: 'img/team/img1-sm.jpg'};
    return {

      getRangeImg: function () {
        return Img;
      },
      getShareImg: function () {
        return shareImg;
      },
    }
  });



