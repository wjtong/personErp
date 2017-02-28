angular.module('vote.services', [])

  .service("voteService", function ($q, $rootScope) {
    var token = $.cookie("token");
    var organizationPartyId = $.cookie("organizationPartyId");
    return {
      // 圈主发起结算，需要等待圈友确认结算后，才会生效
      bizDoSettlement: function (storeId, settlementAmount, actualSettlementAmount) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $.ajax(
          {
            url: $rootScope.interfaceUrl + "bizDoSettlement",
            type: "POST",
            data: {
              "token": token,
              "organizationPartyId": organizationPartyId,
              "storeId": storeId,
              "settlementAmount":settlementAmount,
              "actualSettlementAmount": actualSettlementAmount
            },
            success: function (result) {
              console.log(result);
              if (result.code == '200') {
                deferred.resolve(result);
              } else {
                deferred.reject(result);
              }
            }
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
      }

    };
  });
