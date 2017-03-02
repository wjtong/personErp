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
//联系人
.controller('ContactlistCtrl', function($scope,Contact,$location,$rootScope) {
    //获得全部联系人
    Contact.getAll($rootScope.partyId , function (data){
      $scope.personmainLists = data;
    });
    // $scope.personmainLists=Contact.getAll();
    //删除联系人
    $scope.deletePerson=function (partyIdFrom) {
      Contact.deleteContects($rootScope.partyId,partyIdFrom,function (data) {
        $scope.reInfo = data;
      });
      Contact.getAll($rootScope.partyId , function (data){
        $scope.personmainLists = data;
      });
    }
    $scope.goInfo = function (id) {
        $location.path('/app/abouthim/'+id);
    }
})
//更新联系人
.controller('UpdatePersonInfo',function ($scope,Contact,$stateParams,PersonData,PersonLabel,$rootScope) {
    var partyId = $stateParams.personId;
    $scope.partyId=partyId
    $scope.title="编辑人员";
    $scope.Persondata={};
    //获取联系人个人信息
    PersonData.getContactInfo($scope.partyId, function (data){
      $scope.personInfo = data;
      $scope.Persondata.personName=data.personName;
      $scope.Persondata.contactNumber=data.contactNumber;
      $scope.Persondata.gender=data.gender;
      $scope.Persondata.lable=data.lable;
      $scope.Persondata.email=data.email;
      $scope.Persondata.company=data.company;
    });
    //更新联系人信息
    $scope.addContact=function () {
      PersonData.updatePerson($scope.partyId,$scope.Persondata.personName,$scope.Persondata.contactNumber,$scope.Persondata.email,$scope.Persondata.company,
        $scope.Persondata.lable,$scope.Persondata.gender,$scope.Persondata.area,$scope.Persondata.city,$scope.Persondata.stateProvinceGeoId,$scope.Persondata.address,function (data) {
          $scope.infoList = data;
        })
      $scope.$ionicGoBack();
    }
    //获取用户拥有的标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
      $scope.labelList = data;
    });
    //省市区下拉菜单
    PersonData.showPersonAddress($scope.partyId , function (data){
      $scope.data = data;
      $scope.provinceList = [];
      $scope.Persondata.stateProvinceGeoId=data.stateProvinceGeoId;
      $scope.Persondata.area=data.geoIdArea;
      $scope.Persondata.city=data.geoIdCity;
      $scope.Persondata.address=data.address1
      if(data.addressSelectData!=null){
        for(var i=0;i<data.addressSelectData.length;i++){
          var provinceMap = {'id':data.addressSelectData[i].geoId,"name":data.addressSelectData[i].geoName};
          $scope.provinceList.push(provinceMap);

          if($scope.Persondata.stateProvinceGeoId!=null && $scope.Persondata.stateProvinceGeoId == data.addressSelectData[i].geoId){
            $scope.cityList = [];
            var thisCityList = data.addressSelectData[i].child;
            for(var j=0;j<thisCityList.length;j++){
              var cityMap = {"id":thisCityList[j].geoId,"name":thisCityList[j].geoName};
              $scope.cityList.push(cityMap);

              if($scope.Persondata.city != null && $scope.Persondata.city == thisCityList[j].geoId){
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for(var w=0;w<areaList.length;w++){
                  var areaMap = {"id":areaList[w].geoId,"name":areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }

            }

          }
        }
      }
    });

    $scope.changeProvince = function (stateProvinceGeoId) {
      $scope.stateProvinceGeoId = stateProvinceGeoId;
      $scope.cityList = [];
      if($scope.data.addressSelectData!=null) {
        for (var i = 0; i < $scope.data.addressSelectData.length; i++) {
          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId) {
            var thisCityList = $scope.data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              var cityMap = {"id": thisCityList[j].geoId, "name": thisCityList[j].geoName};
              $scope.cityList.push(cityMap);
            }
          }
        }
        $scope.areaList = [];
      }
    }

    $scope.changeCity = function (geoIdCity) {
      $scope.geoIdCity = geoIdCity;
      if($scope.data.addressSelectData!=null){
        for(var i=0;i<$scope.data.addressSelectData.length;i++){
          if($scope.stateProvinceGeoId!=null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId){
            var thisCityList = $scope.data.addressSelectData[i].child;
            for(var j=0;j<thisCityList.length;j++){
              if($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId){
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for(var w=0;w<areaList.length;w++){
                  var areaMap = {"id":areaList[w].geoId,"name":areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }
            }
          }
        }
      }
    }
})

.controller('AddPerson',function ($scope,PersonLabel,$rootScope,$location,PersonData,$ionicHistory) {
    $scope.title="添加人员"
    //获得全部标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
      $scope.labelList = data;
    })
    var partyId=""
    //编辑地址
    $scope.addAddress = function () {
      $location.path("/app/addAddress");
    }
    //提交联系人数据
    $scope.Persondata={};
    $scope.addContact=function () {
      PersonData.createPerson($rootScope.partyId,$scope.Persondata.personName,$scope.Persondata.contactNumber,$scope.Persondata.email,$scope.Persondata.company,
        $scope.Persondata.lable,$scope.Persondata.gender,$scope.Persondata.area,$scope.Persondata.city,$scope.Persondata.stateProvinceGeoId,$scope.Persondata.address,function (data) {
          $scope.infoList = data;
        });
      $ionicHistory.goBack();

    }
    //省市区下拉菜单
    PersonData.showPersonAddress($rootScope.partyId , function (data){
      $scope.data = data;
      $scope.provinceList = [];
      if(data.addressSelectData!=null){
        for(var i=0;i<data.addressSelectData.length;i++){
          var provinceMap = {'id':data.addressSelectData[i].geoId,"name":data.addressSelectData[i].geoName};
          $scope.provinceList.push(provinceMap);

          if($scope.stateProvinceGeoId!=null && $scope.stateProvinceGeoId == data.addressSelectData[i].geoId){
            $scope.cityList = [];
            var thisCityList = data.addressSelectData[i].child;
            for(var j=0;j<thisCityList.length;j++){
              var cityMap = {"id":thisCityList[j].geoId,"name":thisCityList[j].geoName};
              $scope.cityList.push(cityMap);

              if($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId){
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for(var w=0;w<areaList.length;w++){
                  var areaMap = {"id":areaList[w].geoId,"name":areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }

            }

          }
        }
      }
    });

    $scope.changeProvince = function (stateProvinceGeoId) {
      $scope.stateProvinceGeoId = stateProvinceGeoId;
      $scope.cityList = [];
      if($scope.data.addressSelectData!=null) {
        for (var i = 0; i < $scope.data.addressSelectData.length; i++) {
          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId) {
            var thisCityList = $scope.data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              var cityMap = {"id": thisCityList[j].geoId, "name": thisCityList[j].geoName};
              $scope.cityList.push(cityMap);
            }
          }
        }
        $scope.areaList = [];
      }
    }

    $scope.changeCity = function (geoIdCity) {
      $scope.geoIdCity = geoIdCity;
      if($scope.data.addressSelectData!=null){
        for(var i=0;i<$scope.data.addressSelectData.length;i++){
          if($scope.stateProvinceGeoId!=null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId){
            var thisCityList = $scope.data.addressSelectData[i].child;
            for(var j=0;j<thisCityList.length;j++){
              if($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId){
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for(var w=0;w<areaList.length;w++){
                  var areaMap = {"id":areaList[w].geoId,"name":areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }
            }
          }
        }
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
//关于他
.controller('AboutHim',function ($scope,Contact,$stateParams,$location,PersonData) {
  var partyId = $stateParams.personId;
  PersonData.getPersonInfo(partyId, function (data){
    $scope.personInfo = data;
  });
  //$scope.personInfo = Contact.get(id);
  $scope.goInfo = function (id) {
    $location.path('/app/editPerson/'+id);
  };
  $scope.goResources = function (id) {
    $location.path('/app/getResources/'+id);
  };
  $scope.goEvents = function () {
    $location.path('/app/getEvents/');
  };
  $scope.goOrder = function (name) {
    $location.path('/app/assOrder/'+name);
  };
  $scope.gobusiness = function () {
    $location.path('/app/getBusiness/');
  };
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
//编辑地址
.controller('EditAddress',function ($scope,PersonData,$rootScope,popupUtil,$ionicLoading,$ionicHistory) {
    PersonData.showPersonAddress($rootScope.partyId , function (data){
      //alert($rootScope.partyId);
      $scope.data = data;
      $scope.provinceList = [];
      $scope.stateProvinceGeoId = data.stateProvinceGeoId;
      $scope.geoIdCity = data.geoIdCity;
      $scope.geoIdArea = data.geoIdArea;
      $scope.address1 = data.address1;
      //alert(data.addressSelectData.length);
      //alert("asdadf");
      if(data.addressSelectData!=null){
        for(var i=0;i<data.addressSelectData.length;i++){
          var provinceMap = {'id':data.addressSelectData[i].geoId,"name":data.addressSelectData[i].geoName};
          $scope.provinceList.push(provinceMap);

          if($scope.stateProvinceGeoId!=null && $scope.stateProvinceGeoId == data.addressSelectData[i].geoId){
            $scope.cityList = [];
            var thisCityList = data.addressSelectData[i].child;
            for(var j=0;j<thisCityList.length;j++){
              var cityMap = {"id":thisCityList[j].geoId,"name":thisCityList[j].geoName};
              $scope.cityList.push(cityMap);

              if($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId){
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for(var w=0;w<areaList.length;w++){
                  var areaMap = {"id":areaList[w].geoId,"name":areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }

            }

          }
        }
      }
    });
    $scope.changeProvince = function (stateProvinceGeoId) {
      $scope.data.stateProvinceGeoId = stateProvinceGeoId;
      $scope.cityList = [];
      $scope.data.geoIdCity = '';
      if($scope.data.addressSelectData!=null) {
          for (var i = 0; i < $scope.data.addressSelectData.length; i++) {
              if ($scope.data.stateProvinceGeoId != null && $scope.data.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId) {
                  var thisCityList = $scope.data.addressSelectData[i].child;
                  for (var j = 0; j < thisCityList.length; j++) {
                      var cityMap = {"id": thisCityList[j].geoId, "name": thisCityList[j].geoName};
                      $scope.cityList.push(cityMap);
                  }
              }
          }
          $scope.areaList = [];
          $scope.data.geoIdArea = '';
      }
    }
    $scope.changeCity = function (geoIdCity) {
      $scope.data.geoIdCity = geoIdCity;
      $scope.data.geoIdArea = '';
      if($scope.data.addressSelectData!=null){
        for(var i=0;i<$scope.data.addressSelectData.length;i++){
          if($scope.stateProvinceGeoId!=null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId){
            var thisCityList = $scope.data.addressSelectData[i].child;
            for(var j=0;j<thisCityList.length;j++){
              if($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId){
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for(var w=0;w<areaList.length;w++){
                  var areaMap = {"id":areaList[w].geoId,"name":areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }
            }
          }
        }
      }
    }

    $scope.submintFrom = function (input) {
        //alert(input.address1);
        //验证表单
        var msg = "" ;
        if(input.geoIdCity == null || input.geoIdCity == '')msg += '市不能为空<br>';
        if(input.geoIdArea == null || input.geoIdArea == '')msg += '区不能为空<br>';
        if(input.address1 == null || input.address1 == '')msg += '详细地址不能为空<br>';
        if(input.contactNumber == null || input.contactNumber == '')msg += '电话号码不能为空<br>';
        if(input.email == null || input.email == '')msg += '电子邮箱不能为空<br>';
        if(msg != ""){
            popupUtil.showAlert('error',msg);
            return ;
        }
        //加载动画
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var dataMap = {
            stateProvinceGeoId:$scope.data.stateProvinceGeoId,
            geoIdCity:$scope.data.geoIdCity,
            geoIdArea:$scope.data.geoIdArea,
            address1:$scope.data.address1,
            contactNumber:$scope.data.contactNumber,
            email:$scope.data.email,
            partyId:$rootScope.partyId
        };
        //alert("test");

        PersonData.editPersonAddress(dataMap,function (data) {
            //alert("成功了");
            $ionicLoading.hide();
            if(data.resultMsg == 'Success' ||  data.resultMsg == '成功'){
                $ionicHistory.goBack();
            }else{
                popupUtil.showAlert('error',data.resultMsg);
            }
        });

    }

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
//标签
.controller('PersonLabel', function ($scope, $location,$ionicPopup, PersonLabel,$rootScope) {
    //$scope.labelList = PersonLabel.getAllLabl();
    //查询用户拥有标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
      $scope.labelList = data;
    });
    $scope.goLableInfo = function (partyId) {
      $location.path("/app/labelPersonList/"+partyId);
    };
    //创建标签
    $scope.showAddLab = function() {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
            template:
            '<input type="text" ng-model="data.addLabel"/>' +
            '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="createLabel();">创建</button><br/>' +
            '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">关闭</button>' ,
            title: '创建标签',
            scope: $scope
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        $scope.addLab = myPopup;
    };
    $scope.createLabel = function () {
        if($scope.data.addLabel == null || $scope.data.addLabel == ''){
        }else{
            PersonLabel.addPersonLab($scope.data.addLabel,$rootScope.userLoginId,function (data) {
              console.log(data.partyId)
            });
            $scope.addLab.close();
            PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
              $scope.labelList = data;
            });
        }
    }
    $scope.closeLab = function () {
        $scope.addLab.close();
    }
    //删除标签
    $scope.deleteLable=function (partyId) {
      PersonLabel.removeLable(partyId);
      PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
        $scope.labelList = data;
      });
     // location.replace("http://localhost:63342/personErp/www/index.html?_ijt=tvc45tmh1jv443vv2cp2mvnf6j#/app/personLabel")
    }
    //下拉刷新
    $scope.doRefresh = function() {
      PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
        $scope.labelList = data;
      });
      $scope.$broadcast("scroll.refreshComplete");
    };


})
//标签内人员
.controller('LabelPersonList',function ($scope, $stateParams, $ionicModal, Contact, PersonLabel,ChatList,GroupChat,$rootScope) {
    var partyId=$stateParams.partyId;
    //获得标签内人员
    PersonLabel.getLablPersonList(partyId, function (data){
      $scope.personList = data;
    });
    $scope.partyId=partyId;
    //获得联系人列表
    //Contact.getAll($rootScope.partyId , function (data){
  //  $scope.personmainLists = data;
  //});
  $scope.plist=Contact.getAll();
    $scope.devList = GroupChat.getAll();
    //$scope.chat = ChatList.getChatInfo($stateParams.chatId);
  //为了数据保持统一,尽量与参与人员数保持一致
    $scope.personList = Contact.getAll();
    //$scope.labelId = $stateParams.labelId;
    //$scope.personList = Contact.getPersonLabel($scope.labelId);
    //$scope.labelInfo = PersonLabel.getInfo($scope.labelId);
    $scope.personNoinLabel = Contact.getPersonNoinLabel($scope.labelId);
    //添加联系人到标签(弹出框)
    $ionicModal.fromTemplateUrl('templates/lablePersonModle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    })
    //标签内添加联系人
    $scope.addLablePerson= function (partyId) {
      var partyIdTo=partyId;
      var partyIdFrom=$scope.partyId;
      PersonLabel.addLablePerson(partyIdFrom,partyIdTo);
      $scope.modal.hide();
      PersonLabel.getLablPersonList(partyIdFrom, function (data){
        $scope.personList = data;
      });
    };
    //删除内添加联系人
    $scope.deletePerson=function (partyId) {

    }
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
  //活动账单的展示页面
  .controller('activityBillCtrl', function($scope, Account, $ionicPopup,Contact, ionicDatePicker,$state) {
    $scope.billList = Account.getAll();

    $scope.addBill = function () {
      $state.go("app.addPersonBill");
    };

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var selectDate = new Date(val);
        console.log(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
        $("#mydate").val(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
      },
      // disabledDates: [            //Optional
      //   new Date(2016, 2, 16),
      //   new Date(2015, 3, 16),
      //   new Date(2015, 4, 16),
      //   new Date(2015, 5, 16),
      //   new Date('Wednesday, August 12, 2015'),
      //   new Date("08-16-2016"),
      //   new Date(1439676000000)
      // ],
      // from: new Date(2017, 1, 1), //Optional
      to: new Date(2020, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };


  })
   //添加账单的控制
  .controller('addPersonBillCtrl', function($scope,Contact, ionicDatePicker,$state,$ionicModal) {
    $scope.plist=Contact.getAll();
    $ionicModal.fromTemplateUrl('templates/radioPersonList.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.selectOne=function(person){
      //将选择的值放入到页面里面
      $("#pname").val(person.name);
      //选择完成之后就将模态框关掉
      $scope.modal.hide();
    }

  })

;
