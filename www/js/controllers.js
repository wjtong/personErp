angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope,$ionicPopover,Login) {
  if(localStorage['partyId'] == null){
    localStorage['partyId'] = 'jinlongxi';
  }
  $rootScope.partyId = localStorage['partyId'];

  if(localStorage['userLoginId'] == null){
    localStorage['userLoginId'] = 'jinlongxi';
  }
  $rootScope.userLoginId = localStorage['userLoginId'];

  if(localStorage['countryGeoId'] == null){
    localStorage['countryGeoId'] = 'CHN';
  }
  $rootScope.countryGeoId = localStorage['countryGeoId'];

})
  //联系人的全选和全不选
.controller('selectAllCtrl', function($scope,$ionicPopup) {
  $scope.selectAll = function (personmain) {
    //进入的时候检查复选框是否被选中
    if ($scope.qx == true) {
      for (var i = 0; i < personmain.length; i++) {
        //alert(personmain[i].partyId+":"+personmain[i].personName);
        personmain[i].checked = true;//这是全选的操作
      }
    } else {
      for (var i = 0; i < personmain.length; i++) {
        personmain[i].checked = false;//这是取消全选的操作
      }
    }
  }
  //单独选一个的传值
  $scope.selectOne=function(person){
    //alert(person.partyId);
  }
//111

//参与人员的详细页面展示

     //打开模态框的显示
  $scope.takeMoney = function () {
    $scope.data = {}
    // 一个精心制作的自定义弹窗
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.money"  placeholder="请输入金额" required style="text-align: center">',
      title: '向客户筹款',
      scope: $scope,
      buttons: [
        {
          text: '取消',
          type: 'button-positive'
        },
        {
          text: '<b>发送</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (!$scope.data.money) {
              //为了避免用户填入空的内容，我循环死你，让你对着干。。
              e.preventDefault();
              $ionicPopup.alert({
                title: "温馨提示",
                template: "请将内容填写完整",
                okText: "确定",
              })
            } else {

              return $scope.data.money;
            }
          }
        },
      ]
    });
    //弹出框弹出后的验证
    myPopup.then(function (res) {
      //正则验证输入金额是否合法
      if (res) {//判断所选的是确定还是取消
        var moneyReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
        if (moneyReg.test(res)) {
          if (res > 0) {//如果输入的金额大于0的话，说明输入的数字是正确的，什么也不提示

          } else {
            $ionicPopup.alert({
              title: "温馨提示",
              template: "您输入的数字没有意义",
              okText: "确定",
            })
          }
        } else {
          $ionicPopup.alert({
            title: "温馨提示",
            template: "金额输入有误,请重新输入",
            okText: "确定",
          })
        }

      }

    });
  };

})
//主页
.controller('HomeCtrl', function($scope,$ionicModal,Home,$location,MyOrder,myresources) {
    var salOrderList = MyOrder.getSalOrder();
    var purOrderList = MyOrder.getPurOrder();
    var resourcesList = myresources.getResourcesAll();
    $scope.mainLists = [];
    for(var i=0;i<salOrderList.length;i++){salOrderList[i].type='order';$scope.mainLists.push(salOrderList[i]);}
    for(var i=0;i<purOrderList.length;i++){purOrderList[i].type='order';$scope.mainLists.push(purOrderList[i]);}
    for(var i=0;i<resourcesList.length;i++){resourcesList[i].type='server';$scope.mainLists.push(resourcesList[i]);}

    $ionicModal.fromTemplateUrl('templates/new-task-main.html', function(modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });

    $scope.newTask = function() {
        $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
        $scope.taskModal.hide();
    }

    $scope.goInfo = function (id,orderId,type,orderType) {
      if(type == 'order'){
        $location.path('/app/myOrderInfo/'+orderId+"/"+orderType);
      }else if(type == 'server'){
        $location.path('/app/myResourcesInfo/'+id);
      }
    }

})

//关于我
  .controller('AboutMe',function ($scope, $rootScope, PersonData) {
    PersonData.getPersonInfo($rootScope.partyId , function (data){
      $scope.myInfo = data;
    });
    //alert($scope.myInfo.personName);
  })

//浮动框的弹出
.controller('floatCtrl',function ($scope,Contact, $rootScope, PersonData) {
  //查找所有的联系人
  //$scope.plist=Contact.getAll();
  //获得全部联系人
  Contact.getAll($rootScope.partyId , function (data){
    $scope.plist = data;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

//聊天列表
.controller('ChatList',function ($scope,$location,ChatList) {
    $scope.ChatList = ChatList.getChatList();
    $scope.goInfo = function (id) {
      $location.path('/app/chatInfo/'+id);
    }
})
//聊天人员信息
.controller('ChatInfo',function ($scope, $stateParams, $location, ChatList) {
    $scope.rightMenu = 'chat';
    $scope.userId = 'PERS_10008';
    var chatId = $stateParams.chatId;
    $scope.chat = ChatList.getChatInfo(chatId);
    $scope.person = ChatList.getPersonInfo($scope.userId);
    $scope.goPersonList = function (id) {
      $location.path("/app/chatPersonList/"+id);
    }
    $scope.editChat = function () {
      $location.path("/app/newGroupChat");
    }

})
//聊天人员列表
.controller('ChatPersonList',function ($scope, $stateParams,ChatList) {
    $scope.chat = ChatList.getChatInfo($stateParams.chatId);
})

//我的时间
.controller('MyTime',function ($scope,MyTime,$location) {
    $scope.myTimes = MyTime.getAllMyTime();
    //$scope.lists = $filter('orderBy')($scope.myTimes, expression, reverse)
    $scope.goInfo = function (timeId,infoId) {
      $location.path('/app/tiemInfo/'+timeId+'/'+infoId);
    }
    $scope.goMyTimeList = function (timeId) {
      $location.path('/app/timeList/'+timeId);
    }
})
.controller('TimeList',function ($scope, $stateParams, $ionicModal, $location, MyTime) {
    $scope.timeId = $stateParams.timeId;
    $scope.timeListInfo = MyTime.getTimeList($scope.timeId);
    $scope.goTimeInfo = function (infoId) {
      //alert('testest');
      $location.path('/app/tiemInfo/'+$scope.timeId+'/'+infoId);
    }
})
.controller('TiemInfo',function ($scope, $stateParams, MyTime, ionicDatePicker, ionicTimePicker) {
    var timeId = $stateParams.timeId;
    var infoId = $stateParams.infoId;
    $scope.time = MyTime.getTimeInfo(timeId,infoId);
    $scope.date = $scope.time.biginTime;
    $scope.beginTime = $scope.time.biginTime;
    $scope.endTime = $scope.time.endTime;
    var today=new Date();
    var fromYear= today.getYear()+1900;
    var toYear= today.getYear()+1901;
    var intMonth=today.getMonth();
    var intDay=today.getDate();
    var ipObj1 = {
        callback: function (val) {  //Mandatory
            $scope.date = new Date(val);
            //console.log('Return value from the datepicker popup is : ' + date, new Date(val));
        },
        disabledDates: [            //Optional
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(fromYear, intMonth, intDay), //Optional
        to: new Date(toYear, intMonth, intDay), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        //disableWeekdays: [0],       //Optional  这里是选择是否将周六周末不可选
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
    };

    var optionId = '';
    var ipObj2 = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
              var selectedTime = new Date(val * 1000);
                if(optionId == 'beginTime'){
                  $scope.beginTime = (selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00');
                }else{
                  $scope.endTime = (selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00');
                }
                // var selectedTime = new Date(val * 1000);
                // document.getElementById(optionId).value = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00';
                // document.getElementById(optionId+"Div").html = selectedTime.getUTCHours()+':'+selectedTime.getUTCMinutes()+':00';
                // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: '选择'    //Optional
    };
    $scope.getIime = function (val) {
        optionId = val ;
        ionicTimePicker.openTimePicker(ipObj2);
    }
})

;
