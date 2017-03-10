angular.module('activity.controllers', [])


//活动首页***************************************************************************************************************
  .controller('GetBusiness',function($scope,$location,ActivityServer){
    //显示缺省图片
    $scope.img=localStorage.getItem("activityImg");
    //获得我的全部活动列表(我参与的活动)
    var roleTypeId='ACTIVITY_MEMBER';
    var tarjeta=localStorage.getItem("tarjeta");
    ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
      $scope.active=data.partyEventsList;
      console.log("查询我参与的活动"+"---------"+data.resultMsg)
    });
    //新建活动
    $scope.newActivity=function () {
      $location.path('/app/newActivity')
    };
    //活动详情
    $scope.activityDetails=function (id) {
      $location.path("/app/activityDetails/"+id);
    };

    //定义：有我组织  往期活动 收藏######################################################################################
    $scope.typefinish='finish';
    $scope.typeMy='my';
    $scope.typeInvitation='invitation';
    $scope.goInfo=function (type) {
      $location.path("/app/activityList/"+type);
    };

  })

//由我组织   往期活动  活动邀请***************************************************************************************************************
  .controller('ActivityList',function($scope,$location,$rootScope,$stateParams,ActivityServer){
    //获得token
    var tarjeta=localStorage.getItem("tarjeta");
    //显示缺省图片
    $scope.img=localStorage.getItem("activityImg");

    //通过类型  分别显示不同的数据   由我组织  往期活动  活动邀请
    var type=$stateParams.type;
    if(type=='finish'){
      $scope.title='往期活动';
    }else if(type=='my'){
      //查询我组织的活动列表
      var roleTypeId='ACTIVITY_ADMIN';
      ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
        $scope.myActivtyList=data.partyEventsList;
        console.log("查询我我组织的活动"+"---------"+data.resultMsg)
      });
      $scope.title='由我组织'
    }else if(type=='invitation'){
      //查询邀请我的活动列表
      var invitationRoleTypeId='ACTIVITY_INVITATION';
      console.log(tarjeta);
      ActivityServer.myActivity(tarjeta,invitationRoleTypeId,function (data) {
        $scope.myActivtyList=data.partyEventsList;
        console.log(data.resultMsg+'返回数据')
      });
      $scope.title='邀请列表'
    }else{

    }
    $scope.type=type;
    $scope.goInfo=function(id,type){
      $location.path("/app/activityDetails2/"+id+'/'+type);
    };
  })

//活动详情***************************************************************************************************************
  .controller('ActivityCrl',function ($stateParams,$state,ionicDatePicker,$scope,ActivityServer,$rootScope,$ionicPopup,$ionicPopover,$ionicHistory,$location,$ionicModal,PersonLabel,$timeout) {
    //获得token
    var tarjeta=localStorage.getItem("tarjeta");
    //获得App使用者partyId
    var partyId=localStorage.getItem("partyId");
    //显示缺省图片
    $scope.img=localStorage.getItem("activityImg");

    //获得活动的详细信息＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃
    var id = $stateParams.activityId;
    $scope.workEffortId = $stateParams.activityId;
    ActivityServer.goActivityDetails(tarjeta,id,function (data) {
      $scope.activityList=data.eventDetail[0];
      $scope.partyId=data.partyId;//组织者partyId
      $scope.activityChild=data.childActivityList;//子活动数据
      $scope.iAmAdmin=data.iAmAdmin;//判断是否是组织者
      $scope.createPersonInfoList=data.createPersonInfoList[0]
      console.log('活动详情信息返回'+"----------"+data.resultMsg)
    });

    //显示讨论*****************************************************
    $scope.showDiscuss=function(){
      document.getElementById("discuss").style.display="";
    };
    $scope.hideDiscuss=function(){
      document.getElementById("discuss").style.display="none"
    };

    //发表评论#####################################################
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

    //显示照片墙幻灯片###################################################
    $scope.shouBigImage=function(id){
      $location.path("/app/slide/"+id);
    };

    //百度地图###################################################
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

    //显示活动相关菜单（右上。。。）###################################################
    $ionicPopover.fromTemplateUrl('templates/activity/activityDetails-popover.html', {
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
    //返回
    $scope.goback=function () {
      $state.go("app.activityHome")
    };

    //活动报名###################################################
    $scope.showPopup = function(id) {
      var tarjeta=localStorage.getItem("tarjeta");
      $scope.workEffortId=id;
      console.log($scope.workEffortId+tarjeta);
      ActivityServer.signUp(tarjeta,$scope.workEffortId,function (data) {
            console.log(data.resultMsg)
      });
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
      //执行一次活动查询刷新活动列表
      var roleTypeId='ACTIVITY_MEMBER';
      ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
        $scope.active=data.partyEventsList;
        console.log("查询我参与的活动"+"---------"+data.resultMsg)
      });
    };


    //进入活动讨论###############################################################
    $scope.activityDiscuss=function(id){
      $state.go("app.activityDiscuss", {"activityId":id}, {reload: true});
      $scope.popover.hide();
    };
    //进入活动项###############################################################
    $scope.activityItem=function(id){
      $location.path("/app/activityItem/"+id);
      $scope.popover.hide();
    };
    //进入活动账单###############################################################
    $scope.aboutPayment=function(id){
      $location.path("/app/activityBill/"+id);
      $scope.popover.hide();
    };

    //判断是否是组织者 界面调整####################################################
    var type= $stateParams.type;
    $scope.myActivity=false;//我是组织者
    $scope.otherActivity=true;//我是参与者
    if($scope.iAmAdmin=='Y'){
      $scope.myActivity=true;
      $scope.otherActivity=false;
    }

    //判断是否有子活动 界面调整####################################################
    $scope.childActivity=false;
    if($scope.activityChild==''||$scope.activityChild==null){
      $scope.childActivity=false;
    }else {
      $scope.childActivity=true;
    }

    //新建子活动####################################################
    $scope.createChild=function (id) {
      $location.path("/app/newActivityChild/"+id);
    };

    //录入时间####################################################
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var selectDate = new Date(val);
        console.log(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
        $scope.itemData.time=selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate()+" "+"00"+":"+"00"+":"+"00"
      },
      to: new Date(2020, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    //新建活动项弹出框####################################################
    $scope.newActivityItem=function () {
      $scope.itemData = {};
      var itemPopup = $ionicPopup.show({
        template:
        '<input type="text" placeholder="时间" ng-model="itemData.time" readonly=“readonly” style="background-color: white" ng-click="openDatePicker()"><br>'+
        '<input type="text" placeholder="安排" ng-model="itemData.name"><br>'+
        '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="createLabel();">创建</button><br/>' +
        '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">取消</button>' ,
        title: '新建活动项',
        scope: $scope
      });
      itemPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.addLab = itemPopup;
    };
    $scope.createLabel = function () {
      if($scope.itemData.time == null || $scope.itemData.time == ''){
        $scope.addLab.close();
      }else{
        console.log($scope.itemData.time+$scope.itemData.name);
        ActivityServer.createActivityItem(tarjeta,id,$scope.itemData.name,$scope.itemData.time,function(data){
          console.log(data.resultMsg)
        })
        $scope.addLab.close();
      }
    };
    $scope.closeLab = function () {
      $scope.addLab.close();
    };

    //编辑活动####################################################
    $scope.editActivty=function(id){
      $location.path("/app/editActivty/"+id);
    };

    //显示子活动信息####################################################
    $scope.activityChildInfo=function (id) {
      $state.go("app.activityDetails", {"activityId":id}, {reload: true});
    }

    //邀请好友#############################################################
    $scope.inviteFriends=function (workEffortId,partyId) {
      $state.go("app.activityInvitation",{"workEffortId":workEffortId,"partyId":partyId})
    };
  })

//活动照片墙（大图片）***************************************************************************************************************
  .controller('slideCrl',function ($scope,$stateParams,Activity,$ionicHistory) {
    var id=$stateParams.activityId;
    //获取活动照片墙图片
    $scope.pictureList=Activity.getActivityInfo(id);
    //返回活动详情
    $scope.goback=function () {
      $ionicHistory.goBack();
    }
  })

//活动讨论***************************************************************************************************************
  .controller('ActivityDiscuss',function ($scope, $rootScope,$stateParams,Activity) {
    var id=$stateParams.id
    //$scope.discussList=Activity.getActivityInfo(id);
    //融云初始化
    alert('连接融云')
    RongCloudLibPlugin.init({
        appKey: 'z3v5yqkbzfup0'},
      function(ret, err){
        alert('融云初始化状态:'+ret.status);
        if (ret.status == 'error')
          alert(err.code);
      });
    //连接融云
    RongCloudLibPlugin.connect({
        token: 'qjS0KXGHOGE3sOm0vSXRxwvlHRTZ6CzKR21cRT0lXGG3FC6of4MnjBXOIsxdbSmG5oSPZ5cfNejqUaRhxZpT4GsVsESawrMc'},
      function(ret, err){
        alert('融云连接状态:'+ret.status);
        if (ret.status == 'success')
          alert('当前用户ID:'+ret.result.userId);
      });
    //获取当前用户信息
    RongCloudLibPlugin.getCurrentUserId( function (ret, err) {
      alert('当前连接用户:'+ret.result);
    })
    //设置连接状态监听器
    RongCloudLibPlugin.setConnectionStatusListener(function(ret, err){
      alert('当前连接状态:'+ret.result.connectionStatus);
    });
  })

//新建活动********************************************************************************************************************
  .controller('NewActivity',function ($scope,$state,$ionicModal,Contact,$ionicHistory,$cordovaContacts,$rootScope,$stateParams,$cordovaCamera,$cordovaImagePicker,ActivityServer,$ionicPopup,$location,$ionicModal,ThemeImage,ionicDatePicker, ionicTimePicker) {
    /************************** Start 时间日期控件加入 ********************************/
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
          $("#startTime").val(selectedTime.getUTCHours()+":"+selectedTime.getUTCMinutes()+":"+"00");
        }
      }
    };
    var ipObj4 = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          $("#endTime").val(selectedTime.getUTCHours()+":"+selectedTime.getUTCMinutes()+":"+"00");
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
    /************************** End 时间日期控件加入 ********************************/

    //选择插入图片方式########################################################
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
      $location.path('/app/activity/themeImage');
    };

    //调用照相机########################################################
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

    //调用手机相册########################################################
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
    };

    //添加照片墙#########################################################
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
    };

    //活动地点########################################################################
    $ionicModal.fromTemplateUrl('templates/activity/activityAddress.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(address) {
      $scope.address = address;
    });
    $scope.openModalAddress = function() {
      $scope.address.show();
    };
    $scope.closeModalAddress = function() {

      $scope.address.hide();
    };
    $scope.addressData={}
    var city_limit=true;
    var output='json';
    var ak='z89D54HRzvzF8jobhBktAbqRIKue8gQN';
    $scope.getAddressInfo=function () {
      //获得当前地址
      ActivityServer.currentAddress(ak).success(function (data){
        $scope.region=data.content.address
      });
      ActivityServer.selectAddress($scope.addressData.address,$scope.region,city_limit,output,ak).success(function (data) {
        $scope.addressInfoList=data.result;
      })
    };
    //选定地址
    $scope.chosenAddress=function (item) {
      $scope.address.hide();
      $scope.ActivityData.address=item.city+" "+item.district+" "+item.name;
      $scope.locationAddress=item.location.lat+"/"+item.location.lng//活动地点经纬度
    };
    //新建活动连接后台###############################################################
    var parentId=$stateParams.id;
    $scope.ActivityData={};
    $scope.createNewActivity=function(){
      //准备数据提交＃＃＃＃＃＃＃＃＃＃＃＃＃
      $scope.ActivityData.startDate=$("#startDate").val()+" "+$("#startTime").val();
      $scope.ActivityData.endDate=$("#endDate").val()+" "+$("#endTime").val();
      $scope.Token=localStorage.getItem("tarjeta");
      console.log(
        $scope.Token,
        $scope.ActivityData.workEffortName,
        $scope.ActivityData.startDate,
        $scope.ActivityData.endDate,
        $scope.ActivityData.address,
        $scope.ActivityData.information,
        $scope.locationAddress
      );
      if(parentId==null){
        ActivityServer.createActivity(
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          function(data){
            console.log(data);
            if(data==null){
              alert("发生错误！！！！！！！")
            }
          }
        );
        $ionicHistory.goBack()
      }else{
        //新建子活动**********************************************
        alert('新建子活动');
        ActivityServer.createChildActivity(
          parentId,
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          function(data){
            console.log(data);
            if(data==null){
              alert("发生错误！！！！！！！")
            }
          }
        );
        $ionicHistory.goBack()
      }
    };
  })

//新建活动可见范围***************************************************************************************************************
  .controller('VisualRange',function ($scope,$ionicModal,$ionicPopup,PersonLabel,$rootScope,Contact) {
    $scope.clientSideList = [
      { text: "全局可见", value: "all" },
      { text: "仅自己", value: "me" },
      { text: "部分可见", value: "part" }
    ];
    //查询用户拥有标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
      $scope.devList = data.lable;
    });
    //获得全部联系人
    Contact.getAll($rootScope.partyId , function (data){
      $scope.personmainLists = data.contact;
    });
    //默认选中
    $scope.data = {
      clientSide: 'all'
    };
    //选中部分可见时显示标签列表
    $scope.lable=false;
    $scope.serverSideChange=function(item){
      if(item =='part'){
        $scope.lable=true;
      }else{
        $scope.lable=false;
      }
    };
    $scope.cancelRange=function () {
      $scope.visual.hide();
    };
    //添加新范围选择联系人弹窗
    $ionicModal.fromTemplateUrl('templates/contact/contactModle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(contact) {
      $scope.contact = contact;
    });
    $scope.openContact = function() {
      $scope.contact.show();
    };
    $scope.closeModal = function() {
      $scope.contact.hide();
    };
    //全选联系人弹窗联系人
    $scope.selectAll = function (personmain) {
      //进入的时候检查复选框是否被选中
      if ($scope.all == true) {
        for (var i = 0; i < personmain.length; i++) {
          $scope.personmain[i].checked = false;//这是全选的操作
        }
      } else {
        for (var i = 0; i < personmain.length; i++) {
          personmain[i].checked = true;//这是取消全选的操作
        }
      }
    };
    //创建新的联系人标签组（可忽略，生成临时联系人组）
    $scope.createRangeLable=function () {
      $scope.rangeData = {};
      var selectedList=[];
      for(var j=0;j<$scope.personmainLists.length;j++){
        if($scope.personmainLists[j].checked==true){
          selectedList.push($scope.personmainLists[j].partyId);
        }
      }
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template:
        '<input type="text" placeholder="新建标签名称" ng-model="data.addLabel"/>' +
        '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="createLabel();">存为标签</button><br/>' +
        '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">忽略</button>' ,
        title: '保存为标签，下次可直接选用',
        scope: $scope
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
      $scope.addLab = myPopup;
    };
    $scope.createLabel = function () {
      if($scope.data.addLabel == null || $scope.data.addLabel == ''){
        alert('标签名不能为空')
      }else{
        PersonLabel.addPersonLab($scope.data.addLabel,$rootScope.userLoginId,function (data) {
          console.log(data.partyId)
          $scope.lableId=data.partyId;
        });
        $scope.addLab.close();//成功后关闭弹框
        $scope.contact.hide();
        PersonLabel.getAllLabl($rootScope.userLoginId, function (data){
          $scope.devList = data.lable;
        });
        $scope.addLab.close();
      }
    }
    //创建标签＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
    $scope.showAddLab = function() {
    };
    $scope.closeLab = function () {
      $scope.addLab.close();
    };
    //确定范围传值
    $scope.selectRange=function () {
      var range=$scope.data.clientSide;
      if(range=='all'||range=='me'){
        for(var i=0;i<$scope.clientSideList.length;i++){
          if($scope.clientSideList[i].value==range){
            var rangeText=$scope.clientSideList[i];
            $(document).ready(function(){
              $("#range").val(rangeText.text)
            });
          }
        }
      }else{
        var selectedList=[];
        for(var j=0;j<$scope.devList.length;j++){
          if($scope.devList[j].checked==true){
            selectedList.push($scope.devList[j].groupName);
          }
        }
        console.log(selectedList);
        if(selectedList){
          $(document).ready(function(){
            $("#range").val(selectedList)
          });
        }else{
          $(document).ready(function(){
            $("#range").val('公开')
          });
        }
      }
      $scope.visual.hide();
    };
  })

//编辑活动**************************************************************************************************************************
  .controller('EditActivity',function($scope,$stateParams,$ionicPopup,$cordovaCamera,$cordovaImagePicker){
    var id=$stateParams.id;
    //$scope.myActivtyList=Activity.getActivityInfo(id);

    //选择插入图片方式
    $scope.selectImg = function() {
      $scope.data = {};
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
    };
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

//活动主题图片界面**********************************************************************************************************************************
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
    $scope.fimilyImgList=ThemeImage.getFamilyImg();
    $scope.businessImgList=ThemeImage.getBusinessImg()
  })

//活动项****************************************************************************************************************************
  .controller('ActivityItem',function ($scope, $rootScope,$stateParams,ActivityServer) {
    var id=$stateParams.id;
    alert(id);
    //获得token
    var tarjeta=localStorage.getItem("tarjeta");
    //获得App使用者partyId
    var partyId=localStorage.getItem("partyId");
    //显示图片
    $scope.img=localStorage.getItem("activityImg");
    ActivityServer.findActivityItem(tarjeta,id,function (data) {
      console.log(data);
      $scope.activityItemList=data.projectList
    });
  })

//联系人的全选和全不选**********************************************************************************************
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

//活动邀请************************************************************************************************************************
  .controller('ActivityInvitation', function($scope,$cordovaContacts,$cordovaSms,$stateParams,ActivityServer) {
    var workEffortId=$stateParams.workEffortId
    var partyId=$stateParams.partyId
    var tarjeta=localStorage.getItem("tarjeta");
    // 打开通讯录查询
      var options = {};
      options.filter = "";
      options.multiple = true;
      $cordovaContacts.find(options).then(function (allContacts) {
        $scope.contact = allContacts
        alert(JSON.stringify(allContacts));
        //document.getElementById('phoneNums').value = $scope.contact;
      });

    //选择想要邀请的联系人
    $scope.selectContacts=function(){
      var invitation=[];
      for(var i=0;i<$scope.contact.length;i++){
        if($scope.contact[i].checked==true){
          invitation.push($scope.contact[i].name.formatted+"/"+$scope.contact[i].phoneNumbers[0].value)
        }
      }
      alert(invitation+" "+workEffortId+" "+partyId+" "+tarjeta);
      var contact=invitation.toString();
      ActivityServer.sendInvitation(tarjeta,workEffortId,partyId,contact,function (data) {
        alert("邀请成功"+" "+JSON.stringify(data))
        $state.go("app.activityDetails",{"activityId":workEffortId})
      })
    };
    //打开发送短信*************************
    $scope.sendMsg = function () {
      console.log("发送消息:" + "15618323607");
      var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: 'INTENT' // send SMS with the native android SMS messaging
      //intent: '' // send SMS without open any other app
        }
      };
      $cordovaSms.send("15618323607", '内容', options)
    }
  })

//活动账单的展示页面************************************************************************************************************************
  .controller('activityBillCtrl', function($scope, Account, $ionicPopup,Contact,$state,$stateParams,ActivityServer) {
    //准备参数
    var tarjeta=localStorage.getItem("tarjeta");
    var id=$stateParams.workEffortId;
    $scope.contactImg=localStorage.getItem("contactImg");//人物头像缺省图片
    ActivityServer.findActivityPayment(tarjeta,id,function (data) {
      $scope.billList=data.payList;
      console.log("查询活动列表——————————"+data.resultMsg)
    })
    $scope.addBill = function () {
      $state.go("app.addPersonBill",{workEffortId:id});
    };
  })

//添加账单的控制************************************************************************************************************************
  .controller('addPersonBillCtrl', function($scope,$ionicHistory,ionicDatePicker,$state,$ionicModal,$rootScope,Contact,$stateParams,ActivityServer) {
    //准备参数
    var workEffortId=$stateParams.workEffortId;
    var tarjeta=localStorage.getItem("tarjeta");
    //获得全部联系人
    Contact.getAll($rootScope.partyId , function (data){
      $scope.personmainLists = data.contact;
    });
    $scope.plist=Contact.getAll();
    //添加新范围选择联系人弹窗
    $ionicModal.fromTemplateUrl('templates/contact/contactModle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(contact) {
      $scope.contact = contact;
    });
    $scope.openContact = function() {
      $scope.contact.show();
    };
    $scope.closeModal = function() {
      $scope.contact.hide();
    };
    //将选择的值放入到页面里面
    $scope.createRangeLable=function(){
      for(var i=0;i<$scope.personmainLists.length;i++){
        if($scope.personmainLists[i].checked==true){
          $("#pname").val($scope.personmainLists[i].personName);
          $scope.personId=$scope.personmainLists[i].partyId;
          alert($scope.personId);
        }
      }
      //选择完成之后就将模态框关掉
      $scope.contact.hide();
    };
    //提交新录入账单
    $scope.Order={};
    $scope.createOrder=function () {
      $scope.Order.date=$("#mydate").val();
      console.log($scope.personId+$scope.Order.money+$scope.Order.ymoney+$scope.Order.date);
      ActivityServer.createActivityPayment(tarjeta,workEffortId,$scope.personId,$scope.Order.money,$scope.Order.ymoney,$scope.Order.date,function (data) {
        console.log("创建活动账单————————"+data.resultMsg)
        $state.go("app.activityBill")
        $ionicHistory.goBack()
      })
    };
    //选着订单录入时间
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var selectDate = new Date(val);
        console.log(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
        $("#mydate").val(selectDate.getFullYear()+"-"+parseFloat(selectDate.getMonth()+1)+"-"+selectDate.getDate());
      },
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
