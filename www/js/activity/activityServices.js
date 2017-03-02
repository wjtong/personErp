angular.module('activity.services', [])

//活动连接后台
  .factory('ActivityServer',function(){
    var url = 'http://192.168.3.62:3400/personContacts/control/';
    return {
      //新建活动
      createActivity: function (tarjeta,workEffortName,actualStartDate,estimatedCompletionDate,locationDesc,description,contactsList,cb) {
        $.ajax({
          url: url + "createNewEvent",
          data: {
            tarjeta: tarjeta,
            workEffortName:workEffortName,
            actualStartDate:actualStartDate,
            estimatedCompletionDate:estimatedCompletionDate,
            locationDesc:locationDesc,
            description:description,
            contactsList:contactsList
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
      //由我组织的活动
      myActivity: function (tarjeta,roleTypeId, cb) {
        $.ajax({
          url: url + "findMyEvent",
          data: {
            tarjeta: tarjeta,
            roleTypeId:roleTypeId
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
      signUp: function (tarjeta,workEffortId, cb) {
        $.ajax({
          url: url + "translationActivity",
          data: {
            tarjeta: tarjeta,
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
    }
  })
