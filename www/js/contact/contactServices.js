angular.module('contact.services', [])

//联系人列表
  .factory('Contact', function ($rootScope) {


    var personmainLists = [
      {
        id: 'PERS_10001',
        img: 'img/team/fenghao.png',
        name: '冯浩',
        company: '上海班富电子商务',
        address: '中国，浙江，杭州',
        price: '80',
        phone: '13801887706',
        sex: 'F',
        email: 'hao.feng@banff-tech.com',
        labelId: '1'
      },
      {
        id: 'PERS_10002',
        img: 'img/team/shenyinling.png',
        name: '沈寅麟',
        company: '上海班富电子商务',
        address: '中国，上海',
        price: '100',
        phone: '15000035538',
        sex: 'F',
        email: 'yinlin.shen@banff-tech.com',
        labelId: '3'
      },
      {
        id: 'PERS_10004',
        img: 'img/team/wangkun.jpg',
        name: '王坤',
        company: '上海班富电子商务',
        address: '中国,上海，长宁',
        price: '110',
        phone: '18772115070',
        sex: 'F',
        email: 'kun.wang@banff-tech.com',
        labelId: '4'
      },
      {
        id: 'PERS_10005',
        img: 'img/team/lining.jpg',
        name: '李宁',
        company: '上海班富电子商务',
        address: '中国，上海，长宁',
        price: '120',
        phone: '18702104254',
        sex: 'F',
        email: 'ning.li@banff-tech.com',
        labelId: '3'
      },
      {
        id: 'PERS_10006',
        img: 'img/team/shubenkun.jpg',
        name: '苏本坤',
        company: '上海班富电子商务',
        address: '中国 ，浙江，杭州',
        price: '130',
        phone: '18614055178',
        sex: 'F',
        email: 'benkun.su@banff-tech.com',
        labelId: '2'
      },
      {
        id: 'PERS_10007',
        img: 'img/team/chenyu.jpg',
        name: '陈宇',
        company: '上海班富电子商务',
        address: '中国 ，浙江，杭州',
        price: '140',
        phone: '15910989807',
        sex: 'F',
        email: 'yu.chen@banff-tech.com',
        labelId: '1'
      },
      {
        id: 'PERS_10008',
        img: 'img/team/jinlongxi.png',
        name: '金龙熙',
        company: '上海班富电子商务',
        address: '中国，上海，嘉定',
        price: '150',
        phone: '15618323607',
        sex: 'F',
        email: 'longxi.mei@banff-tech.com',
        labelId: '1'
      }
    ];
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
      updatePersonInfo: function (partyId,firstName, cb) {
        $.ajax({
          url: $rootScope.platformInterfaceUrl + "updatePersonInfo",
          data: {
            partyId: partyId,
            firstName:firstName
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
      //创建标签
      createLable: function (tarjeta,lableName, cb) {
        $.ajax({
          url: $rootScope.communicationfaceUrl + "createLable",
          data: {
            tarjeta: tarjeta,
            lableName:lableName
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
      //删除联系人
      deleteContects: function (partyIdTo, partyIdFrom, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "deleteContacts",
          data: {
            partyIdTo: partyIdTo,
            partyIdFrom: partyIdFrom
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
      //编辑联系人
      updatePerson: function (partyId, personName, contactNumber, contactEmail, contactCompany, contactGroup,
                              gender, contactAddress1, contactCity, contactGeoName, contactAddress2, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "updateContects",
          data: {
            personName: personName,
            gender: gender,
            contactNumber: contactNumber,
            contactAddress1: contactAddress1,
            contactCity: contactCity,
            contactPostalCode: "123456",
            contactAddress2: contactAddress2,
            contactEmail: contactEmail,
            contactGroup: contactGroup,
            contactGeoName: contactGeoName,
            contactCompany: contactCompany,
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
      //添加联系人
      createPerson: function (partyId, personName, contactNumber, contactEmail, contactCompany, contactGroup,
                              gender, contactAddress1, contactCity, contactGeoName, contactAddress2, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "addContects",
          data: {
            personName: personName,
            gender: gender,
            contactNumber: contactNumber,
            contactAddress1: contactAddress1,
            contactCity: contactCity,
            contactPostalCode: "123456",
            contactAddress2: contactAddress2,
            contactEmail: contactEmail,
            contactGroup: contactGroup,
            contactGeoName: contactGeoName,
            contactCompany: contactCompany,
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
    }
  })

  //标签****************************************************************************************************************
  .factory('PersonLabel', function ($rootScope) {

    return {
      //获得全部标签
      getAllLabl: function (userLoginId, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "findLable",
          data: {userLoginId: userLoginId},
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
      //获得标签内人员
      getLablPersonList: function (partyId, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "findLablePerson",
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
      //删除标签
      removeLable: function (partyId, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "deleteLable",
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
      //添加标签内成员
      addLablePerson: function (partyIdFrom, partyIdTo) {
        $.ajax({
          url: $rootScope.interfaceUrl + "addLablePerson",
          data: {
            partyIdFrom: partyIdFrom,
            partyIdTo: partyIdTo,
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
      //创建标签
      addPersonLab: function (lableName, userLoginId, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "createLable",
          data: {
            lableName: lableName,
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
      }
    }
  })

  //个人信息  GEO信息*****************************************************************************************************
  .factory("PersonData", function ($rootScope) {

    return {
      //获得用户信息（关于我，联系人信息）
      getPersonInfo: function (partyId, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "findPerson",
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

      //获得省列表
      showPersonAddress: function (partyId, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "showPersonAddress",
          data: {partyId: partyId},
          async: false,
          type: 'POST',
          success: function (result) {
            //alert("testSuccess");
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
      //编辑省信息
      editPersonAddress: function (dataMap, cb) {
        $.ajax({
          url: $rootScope.interfaceUrl + "editPersonAddress",
          data: dataMap,
          async: false,
          type: 'POST',
          success: function (result) {
            //alert("testSuccess");
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
