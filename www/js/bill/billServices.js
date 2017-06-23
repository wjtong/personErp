angular.module('bill.services', [])

/*********************************************************************************************************************
 * Desc 活动邀请
 * Author LX
 * Date 2017-6-6
 * */
  .factory('billServer', function ($rootScope) {

    return {
      //新建活动账单
      createActivityInvoice: function (workEffortId, invoiceName, amount, isPrivate, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createActivityPaymentGroup",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            invoiceName: invoiceName,
            amount: amount,
            isPrivate: isPrivate
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
      findActivityPayment: function (workEffortId, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryActivityPaymentGroup",
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
      //保存活动账单
      updatePartyPayment: function (paymentList, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "updatePartyPayment",
          data: {
            tarjeta: tarjeta,
            paymentList: paymentList,
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
      //用户确认支付
      partyPay: function (partyIdFrom, paymentId,paymentMethodId, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "partyPay",
          data: {
            tarjeta: tarjeta,
            partyIdFrom: partyIdFrom,
            paymentId: paymentId,
            paymentMethodId:paymentMethodId
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
      //用户修改金额
      updatePaymentAmount: function (paymentId, amount, cb) {
        var tarjeta = localStorage.getItem('tarjeta');
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "updatePaymentAmount",
          data: {
            tarjeta: tarjeta,
            paymentId: paymentId,
            amount: amount
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
