angular.module('bill.controllers', [])

/***********************************************************************************************************************
 * Desc 活动账单
 * Author LX
 * Date 2017-3-3
 * */
  .controller('activityBillCtrl', function ($scope, $ionicPopup, Contact, $state, $stateParams, billServer, SelectDate,
                                            $timeout, $ionicActionSheet) {

    //准备参数
    var id = $stateParams.workEffortId;
    $scope.partyId=localStorage.getItem('partyId');
    var activityData = localStorage.getItem("activityData" + id);
    $scope.workEffortName = jQuery.parseJSON(activityData).workEffortName;
    $scope.billEmpty = true;

    //查询账单信息
    billServer.findActivityPayment(id, function (data) {
      $scope.billList = data.paymentGroupList;
      $scope.activityAdminPartyId=data.activityAdminPartyId;

      if ($scope.billList.length > 0) {
        $scope.billEmpty = false
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

    //隐藏已付
    $scope.billHideText = '隐藏已付';
    $scope.billHide = function (billHideText) {
      var obj = document.getElementsByClassName('Payment-status');
      if (billHideText == '隐藏已付') {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].innerText == '已付') {
            obj[i].parentNode.style.display = 'none';
          }
        }
        $scope.billHideText = '显示已付';
      } else {
        $state.reload()
      }
    };

    //用户确认支付
    $scope.partyPay = function (partyIdFrom, paymentId,payMethod) {
      console.log(payMethod);
      // 显示上拉菜单
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: payMethod[0].description},
          {text: payMethod[1].description},
          {text: payMethod[2].description}
        ],
        destructiveText: '',
        titleText: '支付方式',
        cancelText: '取消',
        cancel: function () {
          // 这里添加取消代码
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              billServer.partyPay(partyIdFrom, paymentId, payMethod[0].paymentMethodId, function (data) {
                console.log(data);
                if (data.resultMsg == '成功') {
                  $state.reload()
                }
              });
              break;
            case 1:
              billServer.partyPay(partyIdFrom, paymentId,payMethod[1].paymentMethodId, function (data) {
                console.log(data);
                if (data.resultMsg == '成功') {
                  $state.reload()
                }
              });
              break;
            case 2:
              billServer.partyPay(partyIdFrom, paymentId,payMethod[2].paymentMethodId, function (data) {
                console.log(data);
                if (data.resultMsg == '成功') {
                  $state.reload()
                }
              });
              break;
            default:
              alert('请选择')
          }
        }
      });
    };

    //显示隐藏账单详情
    $scope.show=function (index) {
      $('.blii-list').eq(index).css({
        display: 'block'
      });
      $('.hide_bill').eq(index).css({
        display: 'none'
      });
    };
    $scope.hide=function (index) {
      $('.blii-list').eq(index).css({
        display: 'none'
      });
      $('.hide_bill').eq(index).css({
        display: 'block'
      });
    };

    //获取要修改金额焦点
    $scope.onfocus = function (paymentId) {
      console.log(paymentId);
      document.getElementById(paymentId).style.display = 'inline-block'
    };

    //修改金额
    $scope.updatePaymentAmount = function (paymentId) {
      var amount = document.getElementsByName(paymentId)[0].value;
      billServer.updatePaymentAmount(paymentId, amount, function (data) {
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

    //微信分享账单
    $scope.billShare = function (paymentGroupId, paymentGroupName) {
      Wechat.share({
        message: {
          title: '分享账单: ' + paymentGroupName,
          description: '活动: ' + $scope.workEffortName,
          thumb: 'www/img/activityImg/btn_账单_n@2x.png',
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
    $scope.Bill = {};

    //提交新录入账单
    $scope.createBill = function () {
      var public = document.getElementsByName("public");
      for (var i = 0; i < public.length; i++) {
        if (public[i].checked) {
          $scope.public = public[i].value
        }
      }
      billServer.createActivityInvoice($scope.workEffortId, $scope.Bill.billName, $scope.Bill.amount, $scope.public, function (data) {
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
