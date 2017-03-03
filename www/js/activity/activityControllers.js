angular.module('activity.controllers', [])


//活动首页***************************************************************************************************************
  .controller('GetBusiness',function($scope,$location,ActivityServer){
    //显示图片
    $scope.img=localStorage.getItem("activityImg")
    //获得我的全部活动列表(我参与的活动)
    //$scope.active=Activity.getAllActivity();死数据
    var roleTypeId='ACTIVITY_MEMBER';
    var tarjeta=localStorage.getItem("tarjeta");
    console.log(tarjeta)
    ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
      $scope.active=data.partyEventsList;
      console.log(data.resultMsg+'返回数据'+data.partyEventsList)
    });
    //首页上部分导航
    $scope.selectType=function (type) {
      if(type='my'){
        var roleTypeId1='ACTIVITY_ADMIN';
        console.log(tarjeta)
        ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
          $scope.active=data.partyEventsList;
          console.log(data.resultMsg+'返回数据'+data.partyEventsList)
        });
      }else{
        var roleTypeId2='ACTIVITY_MEMBER';
        console.log(tarjeta)
        ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
          $scope.active=data.partyEventsList;
          console.log(data.resultMsg+'返回数据'+data.partyEventsList)
        });
      }
    }
    //新建活动
    $scope.newActivity=function () {
      $location.path('/app/newActivity')
    };
    //我的时间
    $scope.myTime=function () {
      $location.path('/app/myTime')
    };
    //活动详情
    $scope.activityDetails=function (id) {
      $location.path("/app/activityDetails/"+id);
    };
    //定义：有我组织  往期活动 收藏
    $scope.typefinish='finish';
    $scope.typeMy='my';
    $scope.typeInvitation='invitation';
    $scope.goInfo=function (type) {
      $location.path("/app/activityList/"+type);
    };
    //标记活动由我组织
    var myPartyId=localStorage.getItem("partyId");
    $(document).ready(function(){
      $("."+myPartyId).css('display','');
    });
  })

//由我组织   往期活动  活动邀请***************************************************************************************************************
  .controller('ActivityList',function($scope,Activity,$location,$rootScope,$stateParams,ActivityServer){
    //获得token
    var tarjeta=localStorage.getItem("tarjeta");
    //显示图片
    $scope.img=localStorage.getItem("activityImg");
    //定义由我组织的活动可以编辑
    var type=$stateParams.type;
    if(type=='finish'){
      $scope.myActivtyList=Activity.getFinishActivity();
      $scope.title='往期活动';
    }else if(type=='my'){
      //查询我组织的活动列表
      var roleTypeId='ACTIVITY_ADMIN';
      ActivityServer.myActivity(tarjeta,roleTypeId,function (data) {
        $scope.myActivtyList=data.partyEventsList;
        console.log(data.resultMsg+'返回数据')
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
      $scope.myActivtyList=Activity.getRelatedActivities();
      $scope.title='相关活动'
    }
    $scope.type=type;
    $scope.goInfo=function(id,type){
      $location.path("/app/activityDetails2/"+id+'/'+type);
    };
  })

//活动详情***************************************************************************************************************
  .controller('ActivityCrl',function ($stateParams,$scope,ActivityServer,Activity,$rootScope,$ionicPopup,$ionicPopover,$ionicHistory,$location,$ionicModal,PersonLabel,$timeout) {
    //获得token
    var tarjeta=localStorage.getItem("tarjeta");
    //获得App使用者partyId
    var partyId=localStorage.getItem("partyId");
    //显示图片
    $scope.img=localStorage.getItem("activityImg");
    //获得活动的详细信息
    var id = $stateParams.activityId;

    ActivityServer.goActivityDetails(tarjeta,id,function (data) {

      $scope.activityList=data.eventDetail[0];
      $scope.activityChild=data.childActivityList;//子活动数据
    });
    //$scope.activityList = Activity.getActivityInfo(id);(死数据)
    //活动参与人员
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
    //显示活动相关菜单
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
      $ionicHistory.goBack();
    };
    //相关活动
    $scope.relatedActivity=function (type) {
      $location.path("/app/activityList/"+type);
    };
    //活动报名
    $scope.showPopup = function() {
      var tarjeta=localStorage.getItem("tarjeta");
      $scope.workEffortId='10201';
      console.log($scope.workEffortId+tarjeta+'11111111');
      ActivityServer.signUp(tarjeta,$scope.workEffortId,function (data) {

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
    };
    //显示子活动详情
    $scope.childActivity=true;
    var childtype=$scope.activityList;
    if(childtype==''){
      $scope.childActivity=false;
    }
    //活动讨论
    $scope.activityDiscuss=function(id){
      $location.path("/app/activityDiscuss/"+id);
    };
    //活动项
    $scope.activityItem=function(id){
      $location.path("/app/activityItem/"+id);
    };
    //判断是否是组织者 界面调整
    var type= $stateParams.type;
    $scope.myActivity=true;
    $scope.childActivity=false;
    if(type=='my'){
      $scope.myActivity=false;
      $scope.childActivity=true;
    }
    //新建子活动
    $scope.createChild=function (id) {
      $location.path("/app/newActivityChild/"+id);
    };
    //新建活动项
    $scope.newActivityItem=function () {
      $scope.itemData = {};
      var itemPopup = $ionicPopup.show({
        template:
        '<input type="text" placeholder="时间" ng-model="itemData.time"><br>'+
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
        alert($scope.itemData.time+$scope.itemData.name+tarjeta)
        ActivityServer.createActivityItem(tarjeta,id,$scope.itemData.name,$scope.itemData.time,function(data){
          console.log(data.resultMsg)
          $scope.addLab.close();
        })
      }else{
        alert($scope.itemData.time+$scope.itemData.name+tarjeta)
        ActivityServer.createActivityItem(tarjeta,id,$scope.itemData.name,$scope.itemData.time,function(data){
          console.log(data.resultMsg)
          $scope.addLab.close();
        })
      }
    };
    $scope.closeLab = function () {
      $scope.addLab.close();
    };
    //编辑活动
    $scope.editActivty=function(id){
      $location.path("/app/editActivty/"+id);
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
    $scope.discussList=Activity.getActivityInfo(id);
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
  .controller('NewActivity',function ($scope,Contact,$ionicHistory,$rootScope,$stateParams,$cordovaCamera,$cordovaImagePicker,ActivityServer,$ionicPopup,$location,Activity,$ionicModal,ThemeImage,ionicDatePicker, ionicTimePicker) {

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
      $location.path('/app/activity/themeImage');
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

    //分享好友
    $ionicModal.fromTemplateUrl('templates/activity/shareAvtivity.html', function(modal) {
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
    $scope.shareImgList=ThemeImage.getShareImg();
    //新建活动连接后台
    var parentId=$stateParams.id
    $scope.ActivityData={};
    $scope.createNewActivity=function(){
      $scope.ActivityData.startDate=$("#startDate").val()+" "+$("#startTime").val();
      $scope.ActivityData.endDate=$("#endDate").val()+" "+$("#endTime").val();
      $scope.ActivityData.visualRange=$("#range").val();
      $scope.Token=localStorage.getItem("tarjeta");
      console.log(
        $scope.Token,
        $scope.ActivityData.workEffortName,
        $scope.ActivityData.startDate,
        $scope.ActivityData.endDate,
        $scope.ActivityData.address,
        $scope.ActivityData.information,
        //$scope.ActivityData.visualRange,
        $scope.contactsList
      );
      if($scope.contactsList!=null){
        var contactsList=$scope.contactsList.toString();
      }
      if(parentId==null){
        ActivityServer.createActivity(
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          contactsList,
          function(data){
            console.log(data)
            if(data==null){
              alert("发生错误！！！！！！！")
            }
          }
        )
        $ionicHistory.goBack()
      }else{
        //新建子活动
        alert('新建子活动')
        ActivityServer.createChildActivity(
          parentId,
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          contactsList,
          function(data){
            console.log(data)
            if(data==null){
              alert("发生错误！！！！！！！")
            }
          }
        )
        $ionicHistory.goBack()
      }
    };
    //可见范围
    $ionicModal.fromTemplateUrl('templates/activity/activityVisualRange.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(visual) {
      $scope.visual = visual;
    });
    $scope.openModal = function() {
      $scope.visual.show();
    };
    $scope.closeModal = function() {
      $scope.visual.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.visual.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    //选定可见范围
    $scope.visualRange=function () {
      $scope.visual.show();
    };
    //获得全部联系人
    Contact.getAll($rootScope.partyId , function (data){
      $scope.personmainLists = data.contact;
    });
    //邀请选择联系人弹窗
    $ionicModal.fromTemplateUrl('templates/contactModle.html', {
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
    //确定邀请好友
    $scope.createRangeLable=function () {
      $scope.rangeData = {};
      var contactsList=[];
      for(var j=0;j<$scope.personmainLists.length;j++){
        if($scope.personmainLists[j].checked==true){
          contactsList.push($scope.personmainLists[j].partyId);
        }
      }
      $scope.contactsList=contactsList;
      $scope.contact.hide();
    };
    //邀请好友
    $scope.invite=false;
    $scope.inviteFriends=function (type) {
      $scope.contact.show();
      if(type='invite'){
        $(document).ready(function(){
          $("#invite").css("display", "none");
        });
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
    $ionicModal.fromTemplateUrl('templates/contactModle.html', {
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
  .controller('EditActivity',function($scope,$stateParams,Activity,$ionicPopup,$cordovaCamera,$cordovaImagePicker){
    var id=$stateParams.id;
    $scope.myActivtyList=Activity.getActivityInfo(id);

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
//活动主题图片界面
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
  .controller('ActivityItem',function ($scope, $rootScope,$stateParams,Activity,ActivityServer) {
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
    //$scope.activityItemList=Activity.getActivityInfo(id);
  })
;
