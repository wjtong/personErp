angular.module('activity.services', [])

//活动连接后台************************************************************************************************************
  .factory('ActivityServer', function ($rootScope, $q, $http) {

    return {
      //设置UUID
      setUUID: function (uuid, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "getTarJetaFromUUID",
          data: {
            uuid: uuid
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
      createActivity: function (tarjeta, workEffortName, actualStartDate, estimatedCompletionDate,
                                locationDesc, description, specialTerms, themesId, universalId, cb) {
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
            themesId: themesId,
            universalId: universalId
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
                                description, specialTerms,workEffortId,themesId, cb) {
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
            workEffortId:workEffortId,
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
      //更新活动状态
      updateEventStatus: function (tarjeta, workEffortId,currentStatusId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "updateEventStatus",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            currentStatusId: currentStatusId,
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
      //活动讨论的相关参数
      queryActivityChatGroupInfo: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryActivityChatGroupInfo",
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
      //删除活动消息通知
      deleteSystemInfoNote: function (tarjeta, noteId, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "removeSysInfo",
          data: {
            tarjeta: tarjeta,
            noteId: noteId
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
      userAppRegister: function (tarjeta, workEffortId, partyId, nickName, tel, captcha, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "userAppRegister",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            partyId: partyId,
            nickName: nickName,
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
      createNickName: function (tarjeta, entityId, partyId, nickName, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "createNickName",
          data: {
            tarjeta: tarjeta,
            entityId: entityId,
            nickNameTypeId: "10000",
            partyId: partyId,
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
      //手动添加人员
      addConceptPersonToActivity: function (tarjeta, workEffortId, personInfoArray, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "addConceptPersonToActivity",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            personInfoArray: personInfoArray,
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
      uploadPictureWall: function (tarjeta, workEffortId, imageData, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "uploadPictureWall",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            imageData: imageData,
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
      //查询照片墙图片
      queryMyEventContents: function (tarjeta, workEffortId, contentTypeId, viewSize, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryMyEventContents",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            contentTypeId: contentTypeId,
            viewSize: viewSize,
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.contentsList != null) {
              if ($.type(cb) === 'function') {
                cb(result);
              }
            }
          }
        });
      },
      //删除照片墙图片
      deletePictureWall: function (tarjeta, workEffortId, contentId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "deletePictureWall",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            contentId: contentId,
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
      //照片墙图片 赞踩
      praisePicture: function (tarjeta, partyContentTypeId, contentId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "praisePicture",
          data: {
            tarjeta: tarjeta,
            partyContentTypeId: partyContentTypeId,
            contentId: contentId,
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
      //查询消息列表
      querySystemInfoList: function (tarjeta, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "querySystemInfoList",
          data: {
            tarjeta: tarjeta,
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
      //获取微信用户信息
      wachatInfo: function (appid, secret, code, grant_type) {
        var d = $q.defer();
        var promise = d.promise;
        $http.jsonp("http://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=" + grant_type)
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
      //活动主题图片
      createPeSystemInfoAboutActivity: function (partyIdTo, moreInfoUrl, noteInfo, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "createPeSystemInfoAboutActivity",
          data: {
            partyIdTo: partyIdTo,
            moreInfoUrl: moreInfoUrl,
            noteInfo: noteInfo
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
      //活动主题图片
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
      queryThemes: function (contentTypeId, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "queryThemes",
          data: {
            contentTypeId: contentTypeId
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

    //活动分享方式图片
    var shareImg = [
      {id: 'Pic_10021', img: 'img/shareActivity/btn_微信_n@2x.png', name: '微信'},
      {id: 'Pic_10022', img: 'img/shareActivity/btn_朋友圈_n@2x.png', name: '朋友圈'},
      {id: 'Pic_10023', img: 'img/shareActivity/btn_通讯录_n@2x.png', name: '短信'},
      {id: 'Pic_10024', img: 'img/shareActivity/btn_梨友_n@2x.png', name: '梨友'},
      {id: 'Pic_10025', img: 'img/shareActivity/btn_手动添加_n@2x.png', name: '手动添加'},
      {id: 'Pic_10026', img: 'img/shareActivity/btn_复制链接7@2x.png', name: '复制链接'},
      {id: 'Pic_10027', img: 'img/shareActivity/btn_二维码@2x.png', name: '二维码'}
    ];

    //活动首页顶部功能图片
    var topImg = [
      {id: 'Pic_10027', img: 'img/tabs/扫一扫@3x.png', name: '扫一扫'},
      {id: 'Pic_10028', img: 'img/tabs/拍照@3x.png', name: '拍照'},
      {id: 'Pic_10029', img: 'img/tabs/随笔记@3x.png', name: '随笔记'}
    ];

    //活动详情功能导航栏
    var activityImgTabs = [
      {id: 'Pic_10030', img: 'img/activityImg/btn_照片墙_n@2x.png', name: '照片墙'},
      {id: 'Pic_10031', img: 'img/activityImg/btn_投票_n@2x.png', name: '投票'},
      {id: 'Pic_10032', img: 'img/activityImg/btn_账单_n@2x.png', name: '账单'},
      {id: 'Pic_10033', img: 'img/activityImg/btn_附件_n@2x.png', name: '附件'}
    ];

    return {
      getTopImg: function () {
        return topImg;
      },
      getShareImg: function () {
        return shareImg;
      },
      getActivityImgTabs: function () {
        return activityImgTabs;
      }
    }
  });







