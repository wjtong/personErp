angular.module('bill.controllers', [])

/***********************************************************************************************************************
 * Desc 活动账单
 * Author LX
 * Date 2017-3-3
 * */
  .controller('activityBillCtrl', function ($scope, $ionicPopup, Contact, $state, $stateParams, billServer, SelectDate,
                                            $timeout) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    var id = $stateParams.workEffortId;
    var activityData=localStorage.getItem("activityData"+id);
    $scope.workEffortName=jQuery.parseJSON(activityData).workEffortName;
    $scope.billEmpty=true;

    //查询账单信息
    billServer.findActivityPayment(tarjeta, id, function (data) {
      $scope.billList = data.paymentGroupList;
      if($scope.billList.length>0){
        $scope.billEmpty=false
      }
      console.log("查询活动列表——————————" + data.resultMsg)
    });

    //添加账单
    $scope.addBill = function () {
      $state.go("tab.addPersonBill", {workEffortId: id});
    };

    //返回
    $scope.goBack = function () {
      $state.go("tab.activityDetails", {activityId: id});
    };

    //保存账单
    $scope.saveBill = function () {
      console.log('paymentList----------' + $scope.billList);
      billServer.updatePartyPayment(tarjeta, JSON.stringify($scope.billList), function (data) {
        console.log('保存账单' + data.resultMsg);
        if (data.resultMsg == '成功') {
          var myPopup = $ionicPopup.show({
            template: '',
            title: '保存成功',
            scope: $scope,
            buttons: [
              {
                text: '返回'
              }
            ]
          });
          myPopup.then(function (res) {
            console.log('Tapped!', res);
          });
          $timeout(function () {
            myPopup.close();
          }, 1500);
        }
      })
    };

    //用户确认支付
    $scope.partyPay = function (partyIdFrom, paymentId) {
      billServer.partyPay(tarjeta, partyIdFrom, paymentId, function (data) {
        console.log(data);
        if (data.resultMsg == '成功') {
          $state.reload()
        }
      })
    };

    //获取要修改金额焦点
    $scope.onfocus = function (paymentId) {
      console.log(paymentId);
      document.getElementById(paymentId).style.display = 'inline-block'
    };

    //修改金额
    $scope.updatePaymentAmount = function (paymentId) {
      var amount = document.getElementsByName(paymentId)[0].value;
      billServer.updatePaymentAmount(tarjeta, paymentId, amount, function (data) {
        console.log(data);
        if (data.resultMsg == '成功') {
          $state.reload()
        }
      })
    };

    //缴费日期
    $scope.payDate = function (index) {
      SelectDate.nativeDate(function (data) {
        $scope.billList[index].payDate = data.substring(0, 10);
      });
    };

    //微信分析账单
    $scope.billShare=function (paymentGroupId,paymentGroupName) {
      Wechat.share({
        message: {
          title: '分享账单: ' +paymentGroupName,
          description: '活动: '+$scope.workEffortName,
          thumb: 'www/img/shareActivity/btn_梨友_n@2x.png',
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/viewAccountList?workEffortId=' + id + "&paymentGroupId=" + paymentGroupId,
          }
        },
        scene: Wechat.Scene.SESSION // share to SESSION
      }, function () {
        alert("Success");
      }, function (reason) {
        alert("Failed: " + reason);
      });
    }
  })

  /*********************************************************************************************************************
   * Desc 新建活动账单
   * Author LX
   * Date 2017-6-6
   * */
  .controller('addPersonBillCtrl', function ($scope, $ionicHistory, ionicDatePicker, $state, $ionicModal, $rootScope, Contact,
                                             $stateParams, billServer, $ionicPopup) {
    //准备参数
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.tarjeta = localStorage.getItem("tarjeta");
    $scope.Bill = {};

    //提交新录入账单
    $scope.createBill = function () {
      billServer.createActivityInvoice($scope.tarjeta, $scope.workEffortId, $scope.Bill.billName, $scope.Bill.amount, function (data) {
        console.log("创建账单:" + data);
        if (data.resultMsg == '账单创建成功!') {
          $ionicPopup.alert({
            title: '账单创建成功',
            template: "你可以通过微信分享账单内容"
          });
          $state.go('tab.activityBill', {'workEffortId': $scope.workEffortId})
        }
      })
    };
  });
