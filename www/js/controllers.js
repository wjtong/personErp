angular.module('starter.controllers', ['ngCordova', 'ionic-datepicker', 'ionic-timepicker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope,$ionicPopover) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  if(localStorage['partyId'] == null){
    localStorage['partyId'] = 'zhangwenwen';
  }
  $rootScope.partyId = localStorage['partyId'];

  if(localStorage['userLoginId'] == null){
    localStorage['userLoginId'] = 'admin';
  }
  $rootScope.userLoginId = localStorage['userLoginId'];

  if(localStorage['countryGeoId'] == null){
    localStorage['countryGeoId'] = 'CHN';
  }
  $rootScope.countryGeoId = localStorage['countryGeoId'];
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
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

.controller('PersonHomeCtrl', function($scope) {
  $scope.productlist = [
    { name: '小皮件加工', id: 1, price: 250, image: '/img/product/001.jpg', description: '加工小皮件服务' },
    { name: '大皮件加工', id: 2, price: 150, image: '/img/product/002.jpg', description: '加工大皮件服务' },
    { name: '皮件运输', id: 3, price: 260, image: '/img/product/003.jpg', description: '运输皮件' },
    { name: '运输纸箱小号', id: 4, price: 170, image: '/img/product/004.jpg', description: '用于运输的小号包装纸箱' },
    { name: '运输纸箱中号', id: 5, price: 180, image: '/img/product/005.jpg', description: '用于运输的中号包装纸箱' },
    { name: '运输纸箱大号', id: 6, price: 190, image: '/img/product/006.jpg', description: '用于运输的大号包装纸箱' }
  ];
})
.controller('ShoppingCart', function($scope,ShoppingCart,$location) {
  $scope.shoppingCartList=ShoppingCart.getAll();
  $scope.editOrderInfo = function () {
    $location.path("/app/editOrderInfo");
  }
})

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
.controller('FavoritesCtrl', function($scope,Favorites,$location) {
    $scope.favoritesList=Favorites.getAllfavorites();
    $scope.goInfo = function (id,orderId,type,orderType) {
      if(type == '订单'){
        $location.path('/app/myOrderInfo/'+orderId+"/"+orderType);
      }else if(type == '资源'){
        $location.path('/app/myResourcesInfo/'+id);
      }
    }
})

.controller('ContactlistCtrl', function($scope,Contact,$location,$rootScope) {
    //获得全部联系人
    // Contact.getAll($rootScope.partyId , function (data){
    //   $scope.personmainLists = data;
    // });
    $scope.personmainLists=Contact.getAll();
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
.controller('UpdateProduction',function ($scope,$stateParams,ReHistory) {
    var id = $stateParams.proId;
    $scope.productionList=ReHistory.getInfo(id)

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
.controller('GetResources',function ($scope,myresources,$stateParams,$location) {
    $scope.id = $stateParams.id;
    $scope.resourcesListOthers = myresources.getPersonList($scope.id);
    // $scope.resourcesListOthers = myresources.getResourcesOthersAll();
    $scope.goInfo = function (resourcesId,personId) {
        $location.path("/app/personResourcesInfo/"+resourcesId+"/"+personId);
    }
})
.controller('GetEvent',function ($scope,OtherTime,$stateParams) {
  $scope.timeListOther = OtherTime.getAllOtherTime()
})
.controller('NewGroupChat',function ($scope,GroupChat,$stateParams) {
  $scope.devList = GroupChat.getAll()
})

.controller('PlaylistCtrl', function($scope) {
  $scope.orders = [
    { time: '2016-03-04', id: 'CO10000' },
    { time: '2016-04-08', id: 'CO10001' },
    { time: '2016-07-23', id: 'CO10002' },
    { time: '2016-09-14', id: 'CO10003' },
    { time: '2016-10-09', id: 'CO10004' }
  ];
})
//活动首页
.controller('GetBusiness',function($scope,Activity,$location){
  $scope.active=Activity.getAllActivity();
  $scope.newActivity=function () {
    $location.path('/app/newActivity')
  };
  $scope.myTime=function () {
    $location.path('/app/myTime')
  };
  $scope.activityDetails=function (id) {
    $location.path("/app/activityDetails/"+id);
  };
  //定义：有我组织  往期活动 收藏
  $scope.typefinish='finish';
  $scope.typeMy='my';
  $scope.typeCollect='collect';
  $scope.goInfo=function (type) {
    $location.path("/app/activityList/"+type);
  }
})
//由我组织的活动
.controller('ActivityList',function($scope,Activity,$location,$rootScope,$stateParams){
  var type=$stateParams.type;
  var organizer=$rootScope.partyId;
  //定义由我组织的活动可以编辑
  $scope.edit=false;
  if(type=='my'){
    $scope.edit=true;
  }
  if(type=='finish'){
    $scope.myActivtyList=Activity.getFinishActivity();
    $scope.title='往期活动';
  }else if(type=='my'){
    $scope.myActivtyList=Activity.getMyActivty(organizer);
    $scope.title='由我组织'
  }else{
    $scope.myActivtyList=Activity.getRelatedActivities();
    $scope.title='相关活动'
  }
  $scope.type=type;
  $scope.goInfo=function(id){
    $location.path("/app/activityDetails/"+id);
  };
  //编辑活动
  $scope.editActivty=function(id){
    $location.path("/app/editActivty/"+id);
  };
  //发布子活动
  $scope.newActivity=function () {
    $location.path('/app/newActivity')
  };
})
  //活动投票
.controller('ActivtyVode',function($scope){
  $scope.vote=function(){
    for(var i = 0; i < document.getElementsByName("option").length; i++){
      if(document.getElementsByName("option")[i].checked == true){
        var width = document.getElementById(i).style.width; //获取到当前选项的宽度。
        width = parseInt(width);//将宽度转化为int型，因为获取到的width的单位是px
        width += 10;//改变width的值，这里就是定义每次投票的进度条的增速
        document.getElementById(i).style.width = width+"px";//修改原div的宽度
        var label = "label"+i;//lable标签里面写的是当前的投票数目。
        var num = document.getElementById(label).innerText;//获取到当前的票数
        document.getElementById(label).innerText = ++num;//票数加1，并修改原值
      }
    }
  }
})
  //活动详情
.controller('ActivityCrl',function ($stateParams,$scope,Activity,$rootScope,$ionicPopup,$ionicPopover,$ionicHistory,$location,$ionicModal,PersonLabel,$timeout) {
  var id = $stateParams.activityId;
  $scope.activityList = Activity.getActivityInfo(id);
  $scope.personList = Activity.getAllPerson();
  //获取讨论信息
  $scope.DiscussList=Activity.getAllDiscuss();
  //参与人员的详细页面展示
  $ionicModal.fromTemplateUrl('templates/lablePersonModle.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });
   //打开模态框的显示
  $scope.openModal = function () {
    $scope.modal.show();
  };
  //显示讨论
  $scope.showDiscuss=function(){
    document.getElementById("discuss").style.display="";
  };
  $scope.hideDiscuss=function(){
    document.getElementById("discuss").style.display="none"
  };
  //发表评论
  $scope.showAddLab = function() {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template:
      '<textarea name="content" cols="20" rows="8" ">评论内容</textarea>'+
      '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="createLabel();">发表</button><br/>' +
      '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">取消</button>' ,
      title: '编辑评论',
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
      PersonLabel.addPersonLab($scope.data.addLabel);
      $scope.addLab.close();
      PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
        $scope.labelList = data;
      });
    }
  };
  $scope.closeLab = function () {
    $scope.addLab.close();
  };
  //显示照片墙大图片
  $scope.shouBigImage=function(id){
    $location.path("/app/slide/"+id);
  };
  //百度地图
  $scope.map=false;
  $scope.tirarFoto=function(){
    $scope.map=true;
    navigator.geolocation.getCurrentPosition(function (data) {
      alert(data.coords.latitude);
      alert(data.coords.longitude);
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(data.coords.longitude, data.coords.latitude);   // 创建点坐标
      map.centerAndZoom(point, 19);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);   // 将标注添加到地图中
    }, function (error) {
      alert("网络不可用，请打开网络!!");
      console.log(error);
    },{timeout: 30000, enableHighAccuracy:true, maximumAge: 75000,coorType: 'bd09ll'});
  };
  //投票
  $scope.vote=function(){
    for(var i = 0; i < document.getElementsByName("option").length; i++){
      if(document.getElementsByName("option")[i].checked == true){
        var width = document.getElementById(i).style.width; //获取到当前选项的宽度。
        width = parseInt(width);//将宽度转化为int型，因为获取到的width的单位是px
        width += 10;//改变width的值，这里就是定义每次投票的进度条的增速
        document.getElementById(i).style.width = width+"px";//修改原div的宽度
        var label = "label"+i;//lable标签里面写的是当前的投票数目。
        var num = document.getElementById(label).innerText;//获取到当前的票数
        document.getElementById(label).innerText = ++num;//票数加1，并修改原值
      }
    }
  };
  //显示活动相关菜单
  $scope.popover = $ionicPopover.fromTemplateUrl('templates/my-popover.html', {
    scope: $scope
  });
  $ionicPopover.fromTemplateUrl('templates/my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  // 清除浮动框
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // 在隐藏浮动框后执行
  $scope.$on('popover.hidden', function() {
    // 执行代码
  });
  // 移除浮动框后执行
  $scope.$on('popover.removed', function() {
    // 执行代码
  });
  //返回
  $scope.goback=function () {
    $ionicHistory.goBack();
  };
  //相关活动
  $scope.relatedActivity=function (type) {
    $location.path("/app/activityList/"+type);
  };
  //报名
  $scope.showPopup = function() {
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '',
      title: '已加入当前活动中',
      scope: $scope,
      buttons: [

        {
          text: '返回'
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
      myPopup.close(); // 1.5秒后关闭弹窗
    }, 1500);
  };
  //显示子活动详情
  $scope.childActivity=true;
  var childtype=$scope.activityList.after;
  if(childtype==''){
    $scope.childActivity=false;
  }
  $scope.activityDetails=function (id,childId) {
      var childInfo=Activity.getActivityInfo(id).after;
      for (var i = 0; i < childInfo.length; i++) {
        if (childId == childInfo[i].id) {
          $scope.activityList=childInfo[i];
          $scope.childActivity=false;
        }
      }
  };
  //活动讨论
  $scope.activityDiscuss=function(id){
    $location.path("/app/activityDiscuss/"+id);
  }
})

//照片墙（大图片）
.controller('slideCrl',function ($scope,$stateParams,Activity,$ionicHistory) {
  var id=$stateParams.activityId;
  //获取活动照片墙图片
  $scope.pictureList=Activity.getActivityInfo(id);
  //返回活动详情
  $scope.goback=function () {
    $ionicHistory.goBack();
  }
})

//活动讨论
.controller('ActivityDiscuss',function ($scope, $rootScope,$stateParams,Activity) {
  var id=$stateParams.id
  $scope.discussList=Activity.getActivityInfo(id);

})

//浮动框的弹出
.controller('floatCtrl',function ($scope,Contact, $rootScope, PersonData) {
  //查找所有的联系人
  $scope.plist=Contact.getAll();
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

//关于我
.controller('AboutMe',function ($scope, $rootScope, PersonData) {
PersonData.getPersonInfo($rootScope.partyId , function (data){
    $scope.myInfo = data;
  });
  //alert($scope.myInfo.personName);
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
.controller('myresources',function ($scope,$location,myresources) {
    $scope.resourcesList = myresources.getResourcesAll();
    $scope.selectOption = myresources.getSelectOption();
    $scope.newResources = function(){
        $location.path("/app/newResources");
    }
    $scope.goInfo = function (resourcesId) {
      $location.path("/app/myResourcesInfo/"+resourcesId);
    }
})

.controller('PersonResourcesInfo',function ($scope,$stateParams,myresources,$location,$ionicModal,Contact,$ionicPopup,$timeout) {
    $scope.personList = Contact.getAll();
    var resourcesId = $stateParams.resourcesId;
    var personId = $stateParams.personId;
    $scope.resources = myresources.getPersonInfo(personId,resourcesId);
    $scope.resourcesOther = myresources.getResourceOtherInfo(resourcesId);
    $scope.personId=personId;
    $scope.createOrder = function (resourcesId,personId) {
      $location.path('/app/createOrder/pur/'+resourcesId+"/"+personId);
    }
    $ionicModal.fromTemplateUrl('templates/priceToPerson.html', {
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
    });
    //加入购物车
    $scope.showPopup = function() {
        $scope.data = {}

        // 自定义弹窗
        var myPopup = $ionicPopup.show({
            template: '',
            title: '已加入购物车',
            scope: $scope,
            buttons: [

                {
                    text: '返回',
                },
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        $timeout(function() {
            myPopup.close(); // 1.5秒后关闭弹窗
        }, 1500);
    };
    //规格参数
    $scope.addgongxu = function () {
      $(function () {
        $("#de").hide()
      })
    }
    $scope.show = function () {
      $(function () {
        $("#de").show()
      })
    }
})
.controller('MyResourcesInfo',function ($scope,$stateParams,myresources,$location,$ionicModal,Contact,$ionicPopup) {
    $scope.personList = Contact.getAll();
    var resourcesId = $stateParams.resourcesId;
    $scope.resources = myresources.getResourceInfo(resourcesId);
    $scope.resourcesOther = myresources.getResourceOtherInfo(resourcesId);
    $scope.createOrder = function(){
      $location.path("/app/createOrder/pur");
    };
    $ionicModal.fromTemplateUrl('templates/priceToPerson.html', {
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
    });
    //编辑价格弹出框
    $scope.showPopup = function() {
      $scope.data = {}

      // 自定义弹窗
      var myPopup = $ionicPopup.show({
        template: '<input type="text" >',
        title: '请输入你要修改的价格',
        scope: $scope,
        buttons: [
          { text: '保存',
            type: 'button-positive',},
          {
            text: '取消',
          },
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $timeout(function() {
        myPopup.close(); // 3秒后关闭弹窗
      }, 3000);
    };
  })
//主题图片界面
.controller('ThemeImage',function ($scope,$ionicSlideBoxDelegate,ThemeImage) {
  //滑动选择类型
  $scope.slideIndex = 0;
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
    console.log("slide Change");
    if ($scope.slideIndex == 0){
      console.log("slide 1");
    }
    else if ($scope.slideIndex == 1){
      console.log("slide 2");
    }
    else if ($scope.slideIndex == 2){
      console.log("slide 3");
    }
  };
  $scope.activeSlide = function (index) {
    $ionicSlideBoxDelegate.slide(index);
  };
  //获得不同类型图片
  $scope.partyImgList=ThemeImage.getPartyImg();
  $scope.sportsImgList=ThemeImage.getSportsImg();
  $scope.fimilyImgList=ThemeImage.getFamilyImg()
  $scope.businessImgList=ThemeImage.getBusinessImg()
})
//新建活动
.controller('NewActivity',function ($scope,$cordovaCamera,$cordovaImagePicker,$ionicPopup,$location,Activity,$ionicModal,ThemeImage,ionicDatePicker, ionicTimePicker) {
  var ipObj1 = {
    callback: function (val) {  //Mandatory
      var selectDate = new Date(val);
      $("#startDate").val(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
    },
    templateType: 'modal'       //Optional
  };
  var ipObj2 = {
    callback: function (val) {  //Mandatory
      var selectDate = new Date(val);
      $("#endDate").val(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
    },
    templateType: 'modal'       //Optional
  };


  $scope.openDatePicker = function(startOrend){
    if(startOrend == 'start'){
      ionicDatePicker.openDatePicker(ipObj1);
    }else{
      ionicDatePicker.openDatePicker(ipObj2);
    }
  };

  var ipObj3 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $("#startTime").val(selectedTime.getUTCHours()+":"+selectedTime.getUTCMinutes());
      }
    }
  };

  var ipObj4 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        $("#endTime").val(selectedTime.getUTCHours()+":"+selectedTime.getUTCMinutes());
      }
    }
  };



  $scope.openTimePicker = function(startOrend){
    if(startOrend == 'start'){
      ionicTimePicker.openTimePicker(ipObj3);
    }else{
      ionicTimePicker.openTimePicker(ipObj4);
    }
  };



  //选择插入图片方式
  $scope.selectImg = function() {
    $scope.data = {}
    var myPopup = $ionicPopup.show({
      template: '<button class="button" style="width:100%;background-color: mintcream;" ng-click="selectPhoto()">相册</button><br/>' +
      '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="takePhoto()">照相机</button><br/>' +
      '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="goThemeImage()">主题</button>' +
      '<button class="button" style="width: 100%;background-color: cadetblue;margin-top: 2px;" ng-click="closeMyPopup()">取消</button>',
      title: '添加方式',
      scope: $scope
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $scope.statusPopup = myPopup;
  };
  //关闭选择框
  $scope.closeMyPopup = function () {
    $scope.statusPopup.close();
  };
  $scope.goThemeImage = function () {
    $scope.statusPopup.close();
    $location.path('/app/themeImage');
  }
  //调用照相机
  $scope.imageSrc = "";
  $scope.takePhoto=function(){
    var options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: false,                                        //在选择之前允许修改截图
      encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      //CommonJs.AlertPopup(imageData);
      var image = document.getElementById('myImage');
      image.src=imageData;
      image.style.height='200px';
      image.style.width='330px';
      //image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
      //CommonJs.AlertPopup(err.message);
    });
    $scope.statusPopup.close();
  };
  //调用手机相册
  $scope.selectPhoto=function () {
    var options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 100
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        var image = document.getElementById('myImage');
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);//返回参数是图片地址 results 是一个数组
          image.src=results[i];
          image.style.height='200px';
          image.style.width='330px';
        }
      }, function(error) {
        // error getting photos
      });
    $scope.statusPopup.close();
  }
  //添加照片墙
  $scope.getPhoto=function(){
    var options = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 100
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        $scope.imageSrc1 = results;
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);//返回参数是图片地址 results 是一个数组
        }
      }, function(error) {
        // error getting photos
      });
    $scope.statusPopup.close();
  }
  //高级选项
  $scope.hight=false;
  $scope.advancedOptions=function () {
    if($scope.hight==false){
      $scope.hight=true;
    }else if($scope.hight==true){
      $scope.hight=false;
    }
  }
  //获取参与者必选项
  $scope.buttonList=Activity.getAllButton();
  $scope.changeColor=function (id) {
    if(document.getElementById(id).style.background=='red'){
      document.getElementById(id).style.background='#11c1f3'
    }else {
      document.getElementById(id).style.background='red';
    }
  }
  //邀请好友
  $scope.invite=false;
  $ionicModal.fromTemplateUrl('templates/lablePersonModle.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  });
  $scope.inviteFriends=function (type) {
    $scope.modal.show();
    if(type='invite'){
      alert(type)
      document.getElementById("invite").style.display="none"
    }
  }
  //分享好友
  $ionicModal.fromTemplateUrl('templates/shareAvtivity.html', function(modal) {
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
  $scope.shareImgList=ThemeImage.getShareImg()
})
.controller('NewDevOrder',function ($scope,$cordovaCamera) {
  $scope.imageSrc = "";
  $scope.takePhoto=function(){
    var options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: false,                                        //在选择之前允许修改截图
      encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      //CommonJs.AlertPopup(imageData);
      var image = document.getElementById('myImage');
      image.src=imageData;
      //image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
      //CommonJs.AlertPopup(err.message);
    });
  };
})
.controller('EditActivity',function($scope,$stateParams,Activity,$ionicPopup,$cordovaCamera,$cordovaImagePicker){
  var id=$stateParams.id;
  $scope.myActivtyList=Activity.getActivityInfo(id);
  //选择插入图片方式
  $scope.selectImg = function() {
    $scope.data = {}
    var myPopup = $ionicPopup.show({
      template: '<button class="button" style="width:100%;background-color: mintcream;" ng-click="selectPhoto()">相册</button><br/>' +
      '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="takePhoto()">照相机</button><br/>' +
      '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="goThemeImage()">主题</button>' +
      '<button class="button" style="width: 100%;background-color: cadetblue;margin-top: 2px;" ng-click="closeMyPopup()">取消</button>',
      title: '添加方式',
      scope: $scope
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $scope.statusPopup = myPopup;
  };
  //关闭选择框
  $scope.closeMyPopup = function () {
    $scope.statusPopup.close();
  };
  $scope.goThemeImage = function () {
    $scope.statusPopup.close();
    $location.path('/app/themeImage');
  }
  //调用照相机
  $scope.imageSrc = "";
  $scope.takePhoto=function(){
    var options = {
      //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
      quality: 100,                                            //相片质量0-100
      destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
      sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
      allowEdit: false,                                        //在选择之前允许修改截图
      encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
      targetWidth: 200,                                        //照片宽度
      targetHeight: 200,                                       //照片高度
      mediaType:0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
      cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true                                   //保存进手机相册
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      //CommonJs.AlertPopup(imageData);
      var image = document.getElementById('myImage');
      image.src=imageData;
      //image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
      //CommonJs.AlertPopup(err.message);
    });
    $scope.statusPopup.close();
  };
  //调用手机相册
  $scope.selectPhoto=function () {
    var options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 100
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        var image = document.getElementById('myImage');
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);//返回参数是图片地址 results 是一个数组
          image.src=results[i];
        }
      }, function(error) {
        // error getting photos
      });
    $scope.statusPopup.close();
  }
  //添加照片墙
  $scope.getPhoto=function() {
    var options = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 100
    };
    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        $scope.imageSrc1 = results;
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);//返回参数是图片地址 results 是一个数组
        }
      }, function (error) {
        // error getting photos
      });
    $scope.statusPopup.close();
  }
})
.controller('MyOrder',function ($scope,$location, $ionicPopup, MyOrder,$stateParams) {
    var personName = $stateParams.personName;
    $scope.personName=personName
    $scope.orderList = MyOrder.getSalOrder();
    $scope.getSalOrder = function () {
        $scope.orderList = MyOrder.getSalOrder();
    }
    $scope.getPurOrder = function () {
        $scope.orderList = MyOrder.getPurOrder();
    }
    $scope.getDevOrder = function () {
      $scope.orderList = MyOrder.getDevOrder();
    }
    $scope.goOrderInf = function (orderId,orderTypeId) {
      $location.path('/app/myOrderInfo/'+orderId+'/'+orderTypeId);
    }
    $scope.dateOption = [
        {id:'Three',desc:'过去三天'},
        {id:'Seven',desc:'过去七天'},
        {id:'oneMonth',desc:'过去一个月'},
        {id:'sixMonth',desc:'过去半年'},
        {id:'oneYear',desc:'过去一年'},
        {id:'oneYear',desc:'一年前'},
    ];
    $scope.choiceOrderType = function () {
      $scope.selOrder = 'sal';
      $scope.purOrder = 'pur' ;
      $scope.data = {};
      var orderType = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: wheat;" ng-click="goCreateOrder(purOrder)">采购订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="goCreateOrder(selOrder)">销售订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="goCreateDevOrder()">开发订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: red;margin-top: 2px;" ng-click="closeChoiceOrderType();">关闭</button>',
        title: '请选择需要创建的订单类型',
        scope: $scope

      });
      orderType.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.orderType = orderType;
    }
    $scope.closeChoiceOrderType = function () {
      $scope.orderType.close();
    }
    $scope.goCreateOrder = function (type) {
      //alert(types);
      $scope.orderType.close();
      $location.path('/app/createOrder/'+type);
    }
    $scope.goCreateDevOrder = function () {
      $scope.orderType.close();
      $location.path('/app/newDevOrder/');
    }

})
.controller('CreateProduct',function ($scope,$ionicModal,$stateParams,MyOrder,$location,ReHistory,Material) {
    $scope.MaterialList= Material.getAllMaterialList();
    $scope.MaterialListAll=Material.getMaterialAll();
    $scope.addMAll = function (resources) {
      Material.setMaterial(resources);
      $scope.material.hide();
    };
    $scope.addgongxu = function () {
      $(function () {
        $("#addgx").removeAttr("hidden");
      })
    }
    var orderId = $stateParams.orderId;
    $scope.itemList = MyOrder.getSalOrderInfo(orderId);
    //增加工序
    $ionicModal.fromTemplateUrl('templates/addProcess.html', {
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
    });
    //参考历史工序
    $scope.reHistory = ReHistory.getAllHistory();
    $scope.goInfo = function (id){
      $scope.productionList=ReHistory.getInfo(id);
      $scope.History.hide();

    }
    $ionicModal.fromTemplateUrl('templates/reHistory.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(History) {
      $scope.History = History;
    });
    $scope.goHistory = function() {
      $scope.History.show();
    };
    $scope.closeHistory = function() {
      $scope.History.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.History.remove();
    });
    // Execute action on hide modal
    $scope.$on('History.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('History.removed', function() {
      // Execute action
    });
    //选择原料
    $scope.reHistory = ReHistory.getAllHistory();
    $scope.goInfo = function (id){
      $scope.productionList=ReHistory.getInfo(id);
      $scope.History.hide();

    }
    $ionicModal.fromTemplateUrl('templates/material.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(material) {
      $scope.material = material;
    });
    $scope.goMaterial = function() {
      $scope.material.show();
    };
    $scope.closeModal = function() {
      $scope.material.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.material.remove();
    });
    // Execute action on hide modal
    $scope.$on('History.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('History.removed', function() {
      // Execute action
    });
})

.controller('ProDet',function($scope,$stateParams,ProductionDetails){
    var productionId=$stateParams.ProductionId;
    $scope.productionList=ProductionDetails.getInfo();

})

.controller('MyOrderInfo', function ($scope,$stateParams,$ionicModal,$ionicPopup,MyOrder,Contact,ChatList,MyOrderInfo,$location) {
    $scope.goProduction = function (orderId) {
      $location.path('/app/createProduction/'+orderId);
    };
    $scope.goInfoPro = function (productionId) {
      $location.path('/app/ProductionDetails/'+productionId);
    };
    var orderId = $stateParams.orderId;
    var orderTypeId = $stateParams.orderTypeId;
    $scope.personList = Contact.getAll();
    $scope.ChatList = ChatList.getChatList();
    $scope.itemList = MyOrderInfo.getInfo(orderId);
    $scope.orderId = orderId;

    if(orderTypeId == 'sal'){
      $scope.orderInfo = MyOrder.getSalOrderInfo(orderId);

    }else if(orderTypeId == 'pur') {
      $scope.orderInfo = MyOrder.getPurOrderInfo(orderId);

    }else if(orderTypeId == 'dev'){
      $scope.orderInfo = MyOrder.getDevOrderInfo(orderId);
    }

    $ionicModal.fromTemplateUrl('templates/showOrderShowPerson.html', function(modal) {
      $scope.person = modal;
    }, {
      scope: $scope
    });
    $ionicModal.fromTemplateUrl('templates/orderChat.html', function(modal) {
      $scope.orderChat = modal;
    }, {
      scope: $scope
    });

    $scope.showPerson = function () {
      $scope.person.show();
    }
    $scope.hiddenPerson = function () {
      $scope.person.hide();
    }
    $scope.showOrderChat = function () {
      $scope.orderChat.show();
    }
    $scope.hiddenOrderChat = function () {
      $scope.orderChat.hide();
    }

    $scope.statusPopup = null;
    //订单状态弹出
    $scope.showStatusPopup = function() {
      $scope.cancelledOrder = '取消订单';
      $scope.completedOrder = '完成订单' ;
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: wheat;" ng-click="updateOrderStatus(cancelledOrder)">取消订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="updateOrderStatus(completedOrder)">完成订单</button><br/>' +
        '<button class="button" style="width: 100%;background-color: red;margin-top: 2px;" ng-click="closeStatusPopup();">关闭</button>',
        title: '请选择需要更改的订单状态',
        scope: $scope

      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.statusPopup = myPopup;
    };
    $scope.closeStatusPopup = function () {
      $scope.statusPopup.close();
    }
    $scope.updateOrderStatus = function (statusName) {
      MyOrder.updateOrderStatus($scope.orderId,statusName);
      $scope.statusPopup.close();
    }
  //订单调整添加
  $scope.orderAdjustment = function() {
    $scope.data = {}
    // 自定义弹窗
    var Adjustment = $ionicPopup.show({
      template: '<input type="number" placeholder="调整金额" ng-model="data.adjustmentPrice">' +
      '<input style="margin-top: 6px;" type="text" placeholder="调整原因" ng-model="data.adjustmentReason">',
      title: '订单调整',
      subTitle: '输入框都为必填',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>添加</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.adjustmentPrice || !$scope.data.adjustmentReason) {
              e.preventDefault();
            } else {
              MyOrder.addAdjustment(orderId,$scope.data.adjustmentPrice,$scope.data.adjustmentReason,'zhangwenwen')
              return $scope.data.adjustmentPrice;
            }
          }
        },
      ]
    });
    Adjustment.then(function(res) {
      console.log('Tapped!', res);
    });
  };
})
.controller('CreateOrder',function ($scope,$stateParams,$ionicModal,$ionicPopup,CreateOrder,Contact,myresources,$location) {
    var typeId = $stateParams.typeId;
    var resourcesId = $stateParams.resourcesId;
    var id = $stateParams.personId;
    var personId = $stateParams.personId;
    $scope.personInfo= Contact.get(id);
    //$scope.resourcesList = myresources.getPersonList(personId);
    $scope.resourcesNew = myresources.getPersonInfo(personId,resourcesId);
    $scope.contactList = Contact.getAll();
    $scope.resourcesList = myresources.getResourcesAll();
    $scope.typeId = typeId;
    if(typeId == 'sal'){
      $scope.pageTitle = '销售订单录入' ;
      $scope.orderInfo = CreateOrder.getSalOrderInfo();
    }else if(typeId == 'pur'){
      $scope.pageTitle = '采购订单录入' ;
      $scope.orderInfo = CreateOrder.getPurOrderInfo();
    }

    $ionicModal.fromTemplateUrl('templates/orderContact.html', function(modal) {
      $scope.contact = modal;
    }, {
      scope: $scope
    });

    $ionicModal.fromTemplateUrl('templates/addResourcesToOrder.html', function(modal) {
      $scope.resources = modal;
    }, {
      scope: $scope
    });

    $scope.addressConfirm = null;
    //我的地址是否应用到订单状态弹出
    $scope.showAddressConfirm = function(partyId) {
      $scope.partyId = partyId;
      $scope.used = 'Y';
      $scope.notUsed = 'N' ;
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: wheat;" ng-click="addAddressToOrder(used)">应用</button><br/>' +
        '<button class="button" style="width: 100%;background-color: wheat;margin-top: 2px;" ng-click="addAddressToOrder(notUsed)">不应用</button><br/>' +
        '<button class="button" style="width: 100%;background-color: red;margin-top: 2px;" ng-click="closeAddressConfim();">关闭</button>',
        title: '自己的联系地址是否应用到订单',
        scope: $scope

      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.addressConfirm = myPopup;
    };

    $scope.showContact = function () {
      $scope.contact.show();
    }
    $scope.hiddenContact = function () {
      $scope.contact.hide();
    }
    $scope.showResources = function () {
      $scope.resources.show();
    }
    $scope.hiddenResources = function () {
      $scope.resources.hide();
    }

    $scope.closeAddressConfim = function () {
      $scope.addressConfirm.close();
    }
    $scope.addAddressToOrder = function (flag) {
      var contect = Contact.get($scope.partyId);
      if(typeId=='sal'){
        CreateOrder.setPartyToSalOrder(contect.id,contect.name,contect.phone);
        if(flag=='Y'){
          CreateOrder.setAddressToSalOrder(contect.address);
        }else{
          CreateOrder.setAddressToSalOrder("");
        }
      }else if(typeId == 'pur'){
        CreateOrder.setPartyToPurOrder(contect.id,contect.name,contect.phone);
        if(flag=='Y'){
          CreateOrder.setAddressToPurOrder(contect.address);
        }else{
          CreateOrder.setAddressToPurOrder("");
        }
      }
      $scope.addressConfirm.close();
      $scope.contact.hide();
    }
    $scope.addResources = function (resources) {
      if(typeId == 'sal'){
        CreateOrder.setSalResources(resources);
      }else if(typeId == 'pur'){
        CreateOrder.setPurResources(resources);
      }
      $scope.resources.hide();
    }
    $scope.removeResourcesToOrder = function (resources) {
      if(typeId == 'sal'){
        CreateOrder.removeResourcesToSalOrder(resources);
      }else if(typeId == 'pur'){
        CreateOrder.removeResourcesToPurOrder(resources);
      }
    }
    $scope.editOrderInfo = function () {
      $location.path("/app/editOrderInfo");
    }

    // $scope.orderInfo.partyId = '100020';
    // $scope.orderInfo.partyName = '张文文';
})
.controller('ChatList',function ($scope,$location,ChatList) {
    $scope.ChatList = ChatList.getChatList();
    $scope.goInfo = function (id) {
      $location.path('/app/chatInfo/'+id);
    }
})
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
            PersonLabel.addPersonLab($scope.data.addLabel);
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
.controller('Stock', function ($scope,Stock) {
    $scope.stockList = Stock.getAllStockList();
})
.controller('StockInfo',function ($scope, $stateParams,$ionicPopup,$ionicModal, Stock) {
    var productId = $stateParams.productId;
    var inventoryId = $stateParams.inventoryId;
    $scope.inventoryInfo = Stock.goInventoryInfo(productId,inventoryId);

    $scope.shouItemInfo = function(item) {
        $scope.data = {};
        var myPopup = $ionicPopup.show({
          template: '<div class="list"><label class="item item-input"><span class="input-label" style="text-align: right">序列号：</span><div>'+item.itemSeqId+'</div></label>' +
          '<label class="item item-input"><span class="input-label" style="text-align: right">实际库存：</span><div>'+item.quantityOnHeadDiff+'</div></label>' +
          '<label class="item item-input"><span class="input-label" style="text-align: right">承诺库存：</span><div>'+item.quantityPromiseDiff+'</div></label>' +
          '<label class="item item-input"><span class="input-label" style="text-align: right">日期：</span><div>'+item.date+'</div></label>' +
          '<label class="item item-input"><span class="input-label" style="text-align: right">创建人：</span><div>'+item.createUserLogin+'</div></label>' +
          '<label class="item item-input"><span class="input-label" style="text-align: right">明细：</span><div>'+item.itemTxt+'</div></label>' +
          '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeInfo();">关闭</button>' ,
          title: '库存消耗明细',
          scope: $scope
        });
        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });
        $scope.itemInfo = myPopup;
    };
    $scope.closeInfo = function () {
      $scope.itemInfo.close();
    }

    $ionicModal.fromTemplateUrl('templates/stockOut.html', function(modal) {
      $scope.stockout = modal;
    }, {
      scope: $scope
    });
    $scope.showStockOut = function () {
      $scope.stockout.show();
    }
    $scope.hideStockOut = function () {
      $scope.stockout.hide();
    }

})
.controller('ReceiveStock',function ($scope,$ionicModal, myresources,Contact) {
    $scope.resourcesList = myresources.getResourcesAll();
    $scope.contactList = Contact.getAll();

    $ionicModal.fromTemplateUrl('templates/addResourcesToOrder.html', function(modal) {
      $scope.resources = modal;
    }, {
      scope: $scope
    });
    $ionicModal.fromTemplateUrl('templates/orderContact.html', function(modal) {
      $scope.contact = modal;
    }, {
      scope: $scope
    });

    $scope.showResources = function () {
      $scope.resources.show();
    }
    $scope.hiddenResources = function () {
      $scope.resources.hide();
    }
    $scope.showContact = function () {
      $scope.contact.show();
    }
    $scope.hiddenContact = function () {
      $scope.contact.hide();
    }
    $scope.addResources = function (resources) {
      $scope.productName = resources.title;
      $scope.productId = resources.id;
      $scope.resources.hide();
    }
    $scope.showAddressConfirm = function (partyId, partyName) {
      $scope.supplier = partyName;
      $scope.supplierPartyId = partyId;
      $scope.contact.hide();
    }
})
.controller('StockList', function ($scope, $stateParams, $location, Stock) {
    $scope.productId = $stateParams.productId;
    $scope.stockList = Stock.getProductInfo($scope.productId);
    $scope.goInfo = function (productId, inventoryId) {
      $location.path('/app/stockInfo/'+productId+'/'+inventoryId);
    }
})
.controller('ReceivePurOrderList',function ($scope,$location,MyOrder) {
    $scope.purOrderList = MyOrder.getPurOrder();
    $scope.goInfo = function (orderId) {
      $location.path('/app/receiveOrderInfo/'+orderId);
    }
}).controller('ReceiveOrderInfo',function ($scope, $stateParams,$ionicModal, MyOrder,MyOrderInfo) {
    var orderId = $stateParams.orderId;
    $scope.orderInfo = MyOrder.getPurOrderInfo(orderId);
    $scope.itemList = MyOrderInfo.getInfo(orderId);
    $ionicModal.fromTemplateUrl('templates/receiveOrderInfoConfirm.html', function(modal) {
      $scope.orderInfoConfirm = modal;
    }, {
      scope: $scope
    });
    $scope.orderInfoConfirmShow = function () {
      $scope.orderInfoConfirm.show();
    }
    $scope.orderInfoConfirmHidden = function () {
      $scope.orderInfoConfirm.hide();
    }
    $scope.receiveOne = function (productInfo) {
      var productList = [productInfo];
      $scope.itemListReceive = productList;
      $scope.orderInfoConfirm.show();
    }
    $scope.receiveAll = function (productInfo) {
      $scope.itemListReceive = MyOrderInfo.getInfo(orderId);
      $scope.orderInfoConfirm.show();
    }
})

  .controller('editVoteCtrl', function($scope) {

    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea style='display: inline-block;width: 80%'></textarea>" +
        "<img src='img/delNode.gif' onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><br>" +
        "");
    };
  })

  .controller('castVoteCtrl', function($scope) {

  })


  .controller('voteListCtrl', function($scope) {

  })



  //活动账单的展示页面
  .controller('activityBillCtrl', function($scope, Contact, $ionicPopup, ionicDatePicker) {
    $scope.personList = Contact.getAll();

    $scope.addBill = function () {
      $scope.data = {}
      // 一个精心制作的自定义弹窗
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.name"  placeholder="姓名" required style="text-align: center">'
                  +'<input type="text" ng-model="data.money"  placeholder="请输入金额" required style="text-align: center">'
                  +'<input ng-model="mydate"  placeholder="请输入时间" id="mydate"  style="text-align: center" ng-click="openDatePicker()">',

        title: '账单的录入',
        scope: $scope,
        buttons: [
          {
            text: '取消',
            type: 'button-positive'
          },
          {
            text: '<b>确定</b>',
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
                //将文本框中的内容返回回去哈，不然得不到所填的内容
                  var obj={"money":$scope.data.money,"name":$scope.data.name};
                return obj;
              }
            }
          },
        ]
      });
      //弹出框弹出后的验证
      myPopup.then(function (res) {
        //正则验证输入金额是否合法
        if (res) {//判断所选的是确定还是取消
          var name=res.name;
          var money=res.money;
          alert(name);
          alert(money);
          var moneyReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
          if (moneyReg.test(res.money)) {
            if (res.money > 0) {//如果输入的金额大于0的话，说明输入的数字是正确的，什么也不提示

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

;
