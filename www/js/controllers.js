angular.module('starter.controllers', ['ngCordova', 'ionic-datepicker', 'ionic-timepicker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

.controller('HomeCtrl', function($scope,$ionicModal,Home,$location) {
    $scope.mainLists = Home.getAll();

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

    $scope.goInfo = function (id) {
        $location.path('app/playlists/'+id);
    }

})

.controller('ContactlistCtrl', function($scope,Contact,$location) {
    $scope.personmainLists = Contact.getAll();
    $scope.goInfo = function (id) {
        $location.path('/app/abouthim/'+id);
    }
})
.controller('UpdatePersonInfo',function ($scope,Contact,$stateParams) {
    var id = $stateParams.personId;
    //alert(id);
    $scope.personInfo = Contact.get(id);
})
.controller('AboutHim',function ($scope,Contact,$stateParams,$location) {
  var id = $stateParams.personId;
  //alert(id);
  $scope.personInfo = Contact.get(id);
  $scope.goInfo = function (id) {
    $location.path('/app/editPerson/'+id);
  }
  $scope.goResources = function () {
    $location.path('/app/getResources/');
  }
  $scope.goEvents = function () {
    $location.path('/app/getEvents/');
  }
  $scope.gobusiness = function () {
    $location.path('/app/getBusiness/');
  }
})
.controller('GetResources',function ($scope,myresources,$stateParams) {
  $scope.resourcesListOthers = myresources.getResourcesOthersAll()
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
.controller('AboutMe',function ($scope) {
    $scope.myInfo = { id:'1',name:'张文文',img:'img/team/img3-md.jpg',account:'zhangwenwen',sex:'男',address:'上海市松江区泗凯路61弄20号201室',phone:'15072200010'};
})
.controller('EditAddress',function ($scope) {
    $scope.countrys = [
        {id:'China',name:'中国'},
        {id:'America',name:'美国'},
        {id:'Japan',name:'日本'},
        {id:'Russia',name:'俄罗斯'},
        {id:'England',name:'英国'},
        {id:'Canada',name:'加拿大'},
        {id:'Australian',name:'澳大利亚'}
    ];
    $scope.provinces = [
        {id:'zhejiang',name:'浙江'},
        {id:'beijing',name:'北京'},
        {id:'shanghai',name:'上海'},
        {id:'tianjin',name:'天津'},
        {id:'chongqing',name:'重庆'},
    ];
    $scope.citys = [
        {id:'hangzhou',name:'杭州'},
        {id:'ningbo',name:'宁波'},
        {id:'wenzhou',name:'温州'},
        {id:'taizhou',name:'台州'},
        {id:'quzhou',name:'衢州'},
        {id:'jinhua',name:'金华'}
    ];
    $scope.address = '泗凯路61弄20号201室';
    $scope.phone = '0086 15072200010' ;
    $scope.emails = 'zhangwenwen1556@163.com';
})
.controller('myresources',function ($scope,$location,myresources) {
    $scope.resourcesList = myresources.getResourcesAll()
    $scope.selectOption = myresources.getSelectOption();
    $scope.newResources = function(){
        $location.path("/app/newResources");
    }
})
.controller('NewResources',function ($scope,$cordovaCamera) {
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

.controller('MyOrder',function ($scope,MyOrder) {
    $scope.orderList = MyOrder.getSalOrder();
    $scope.getSalOrder = function () {
        $scope.orderList = MyOrder.getSalOrder();
    }
    $scope.getPurOrder = function () {
        $scope.orderList = MyOrder.getPurOrder();
    }
    var dateOption = [
        {id:'Three',desc:'过去三天'},
        {id:'Seven',desc:'过去七天'},
        {id:'oneMonth',desc:'过去一个月'},
        {id:'sixMonth',desc:'过去半年'},
        {id:'oneYear',desc:'过去一年'},
        {id:'oneYear',desc:'一年前'},
    ];
})
.controller('ChatList',function ($scope,$location,ChatList) {
    $scope.ChatList = ChatList.getChatList();
    $scope.goInfo = function (id) {
      $location.path('/app/chatInfo/'+id);
    }
})
.controller('ChatInfo',function ($scope, $stateParams, $location, ChatList) {
    $scope.rightMenu = 'chat';
    $scope.userId = 10002;
    var chatId = $stateParams.chatId;
    $scope.chat = ChatList.getChatInfo(chatId);
    $scope.person = ChatList.getPersonInfo($scope.userId);

    $scope.goPersonList = function (id) {
      $location.path("/app/chatPersonList/"+id);
    }

})
.controller('ChatPersonList',function ($scope, $stateParams,ChatList) {
    $scope.chat = ChatList.getChatInfo($stateParams.chatId);
})
.controller('PersonLabel', function ($scope, $location, PersonLabel) {
    $scope.labelList = PersonLabel.getAllLabl();
    $scope.goLabelInPerson = function (labelId) {
      $location.path('/app/labelPersonList/'+labelId);
    }
})
.controller('LabelPersonList',function ($scope, $stateParams, $ionicModal, Contact, PersonLabel) {
    $scope.labelId = $stateParams.labelId;
    $scope.personList = Contact.getPersonLabel($scope.labelId);
    $scope.labelInfo = PersonLabel.getInfo($scope.labelId);
    $scope.personNoinLabel = Contact.getPersonNoinLabel($scope.labelId);
})
.controller('MyTime',function ($scope,MyTime,$location) {
    $scope.myTimes = MyTime.getAllMyTime();
    //$scope.lists = $filter('orderBy')($scope.myTimes, expression, reverse)
    $scope.goInfo = function (timeId,infoId) {
      $location.path('/app/tiemInfo/'+timeId+'/'+infoId);
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
        //alert(val);
        optionId = val ;
        ionicTimePicker.openTimePicker(ipObj2);
    }


})
;
