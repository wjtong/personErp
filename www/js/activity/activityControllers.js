angular.module('activity.controllers', [])

//活动首页***************************************************************************************************************
  .controller('ActivityHome', function ($scope, ThemeImage, $ionicHistory, $location, ActivityServer, $state, $ionicPopover, $cordovaBarcodeScanner, $ionicModal) {

    //获得我的全部活动列表(我参与的活动)
    $scope.activityHomeNull = true;
    $scope.$on('$ionicView.beforeEnter', function () {
      //准备参数
      $scope.tarjeta = localStorage.getItem("tarjeta");
      $scope.partyId = localStorage.getItem('partyId');
      var roleTypeId = 'ACTIVITY_MEMBER';
      ActivityServer.myActivity($scope.tarjeta, roleTypeId, function (data) {
        $scope.active = data.partyEventsList;
        console.log("查询我参与的活动" + "---------" + data.resultMsg);
        //如果没有活动  页面调整
        if (data.resultMsg == '成功') {
          $scope.activityHomeNull = false;
        }
      });
    });

    //进入详情页
    $scope.activityDetails = function (id) {
      $location.path("/tab/activityDetails/" + id);
    };

    //找回历史活动
    $scope.getHistory = function () {
      $state.go("login")
    };

    //下拉刷新
    $scope.doRefresh = function () {
      var roleTypeId = 'ACTIVITY_MEMBER';
      $scope.tarjeta = localStorage.getItem("tarjeta");
      ActivityServer.myActivity($scope.tarjeta, roleTypeId, function (data) {
        $scope.active = data.partyEventsList;
        console.log("查询我参与的活动" + "---------" + data.resultMsg);
        if (data != null) {
          $scope.activityHome = true;
          $scope.activityHomeNull = false;
        }
      });
      $scope.$broadcast("scroll.refreshComplete");
    };

    //顶部功能导航栏
    $scope.topImgList = ThemeImage.getTopImg();

    //创建活动模态框
    $ionicModal.fromTemplateUrl('templates/activity/createActivityModle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.openModal = function () {
      $scope.modal.show();
      //初始化聊天SDK  活动名称就是讨论群组名称
      var resp = RL_YTX.init('8a216da85b3c225d015b585bbf490c2f');
      if (170002 == resp.code) {
        //缺少必要参数，详情见msg参数
        //用户逻辑处理
      } else if (174001 == resp.code) {
        //不支持HTML5，关闭页面
        //用户逻辑处理
      } else if (200 == resp.code) {
        //alert("初始化成功")
        //判断不支持的功能，屏蔽页面展示
        var unsupport = resp.unsupport;
      }

      //账号登录参数设置
      var appId = '8a216da85b3c225d015b585bbf490c2f';
      var appToken = '8da3f790a40bbb6607c03c948b8e7c6b';
      var user_account = 'ddf112';
      var timeStamp = IM._getTimeStamp();
      var sig = hex_md5(appId + user_account + timeStamp + appToken);
      var loginBuilder = new RL_YTX.LoginBuilder();

      loginBuilder.setType(1);//登录类型 1账号登录，3通讯账号密码登录
      loginBuilder.setUserName(user_account);//设置用户名
      loginBuilder.setPwd();//type值为1时，密码可以不赋值
      loginBuilder.setSig(sig);//设置sig
      loginBuilder.setTimestamp(timeStamp);//设置时间戳
      //执行用户登录
      RL_YTX.login(loginBuilder, function (obj) {
        //登录成功回调
        console.log('融云登陆成功');
      }, function (obj) {
        //登录失败方法回调
      });
    };
  })

  //活动消息通知*********************************************************************************************************
  .controller('ActivityNotice', function ($scope, ActivityServer, $location) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");

    //查询活动消息列表
    ActivityServer.querySystemInfoList(tarjeta, function (data) {
      console.log('查询我的消息列表————————' + data);
      $scope.noticeList = data.systemInfos;
      if ($scope.noticeList.length != 0) {
        $scope.moreInfoUrl = data.systemInfos[0].moreInfoUrl;
      }
    });

    //跳转到消息相关界面
    $scope.goInfo = function () {
      $location.path($scope.moreInfoUrl);
    };

    //删除消息
    $scope.deleteNotice = function (id) {
      ActivityServer.deleteSystemInfoNote(tarjeta, id, function (data) {
        console.log('删除消息:' + data)
      });
      ActivityServer.querySystemInfoList(tarjeta, function (data) {
        $scope.noticeList = data.systemInfos;
        $scope.moreInfoUrl = data.systemInfos[0].moreInfoUrl;
      });
    }

  })

  //新建活动*************************************************************************************************************
  .controller('NewActivity', function ($scope, $state, $ionicModal, Contact, $ionicHistory, $cordovaContacts,
                                       $rootScope, $stateParams, $cordovaCamera, $cordovaImagePicker, ActivityServer,
                                       $ionicPopup, $location, ThemeImage, ionicDatePicker, $cordovaFileTransfer,
                                       ionicTimePicker, $cordovaDatePicker, $cordovaVibration, $cordovaProgress) {

    //参数准备
    $scope.ActivityData = {};
    $scope.workEffortId = $stateParams.id;//活动编辑带来的活动ID
    $scope.token = localStorage.getItem("tarjeta");
    $scope.partyId = localStorage.getItem("partyId");//获得App使用者partyId

    //选择活动开始结束时间
    $scope.startDate = function () {
      document.addEventListener("deviceready", function () {
        var options = {
          date: new Date(),
          mode: 'dateTime', // or 'time'
          minDate: new Date() - 10000,
          maxDate: new Date() + 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: '确定',
          doneButtonColor: '#000000',
          cancelButtonLabel: '取消',
          cancelButtonColor: '#000000',
          locale: "zh_cn",
          minuteInterval: 30
        };
        $cordovaDatePicker.show(options).then(function (date) {
          $scope.startDateTime = Date.parse(date);
          var Hours = date.getHours();
          if (Hours < 10) {
            Hours = '0' + Hours;
          }
          var Minutes = date.getMinutes();
          if (Minutes < 10) {
            Minutes = '0' + Minutes;
          }
          $("#startDate").val(date.getFullYear() + "-" + parseFloat(date.getMonth() + 1) + "-" + date.getDate() + " " + Hours + ":" + Minutes + ":" + "00");
        });

      }, false);
    };
    $scope.endDate = function () {
      document.addEventListener("deviceready", function () {
        var options = {
          date: new Date(),
          mode: 'dateTime', // or 'time'
          minDate: new Date() - 10000,
          maxDate: new Date() + 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: '确定',
          doneButtonColor: '#000000',
          cancelButtonLabel: '取消',
          cancelButtonColor: '#000000',
          locale: "zh_cn",
          minuteInterval: 30
        };
        $cordovaDatePicker.show(options).then(function (date) {
          $scope.endDateTime = Date.parse(date);
          var Hours = date.getHours();
          if (Hours < 10) {
            Hours = '0' + Hours;
          }
          var Minutes = date.getMinutes();
          if (Minutes < 10) {
            Minutes = '0' + Minutes;
          }
          var eq = $("#startDate").val();
          if ($scope.endDateTime < $scope.startDateTime || eq == '') {
            alert("结束时间应在开始时间之后")
          } else {
            $("#endDate").val(date.getFullYear() + "-" + parseFloat(date.getMonth() + 1) + "-" + date.getDate() + " " + Hours + ":" + Minutes + ":" + "00");
          }
        });

      }, false);
    };

    //选择插入图片方式
    $scope.selectImg = function () {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: mintcream;" ng-click="selectPhoto()">相册</button><br/>' +
        '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="goThemeImage()">主题</button>' +
        '<button class="button" style="width: 100%;background-color: cadetblue;margin-top: 2px;" ng-click="closeMyPopup()">取消</button>',
        title: '添加方式',
        scope: $scope
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
      $scope.statusPopup = myPopup;
    };
    $scope.closeMyPopup = function () {
      $scope.statusPopup.close();
    };
    $scope.goThemeImage = function () {
      $scope.statusPopup.close();
      $scope.Theme.show();
    };

    //预设主题图片模态框
    $ionicModal.fromTemplateUrl('templates/activity/activityThemeImage.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (Theme) {
      $scope.Theme = Theme;
    });
    $scope.openThemeModal = function () {
      $scope.Theme.show();
    };
    $scope.closeThemeModal = function () {
      $scope.Theme.hide();
    };

    //上传主题图片（手机相册）
    $scope.selectPhoto = function () {
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
            image.src = results[i];
            image.style.height = '200px';
            image.style.width = '330px';
            $cordovaProgress.showSimpleWithLabel(true, "上传中");
            document.addEventListener('deviceready', function () {
              var url = $rootScope.activityInterfaceUrl + "uploadThemes";
              var options = {};
              $cordovaFileTransfer.upload(url, results[i], options)
                .then(function (result) {
                  var ImgId = JSON.stringify(result.response);
                  $scope.themeImgId = ImgId.substring(18, 23);
                  //alert($scope.themeImgId);
                  localStorage.setItem("themeImg", results[i]);
                  $cordovaProgress.hide();
                  //alert(result.message);
                }, function (err) {
                  //alert(JSON.stringify(err));
                  //alert(err.message);
                  alert("上传失败");
                }, function (progress) {
                  // constant progress updates
                });
            }, false);
          }
        }, function (error) {
          // error getting photos
        });
      $scope.statusPopup.close();
    };

    //主题图片选定显示
    if (localStorage.getItem("themeImg") == '' || localStorage.getItem("themeImg") == null) {
      $scope.imageSrc = localStorage.getItem("themeImg")
    }

    //活动地点调用百度公共接口
    $ionicModal.fromTemplateUrl('templates/activity/activityAddress.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (address) {
      $scope.address = address;
    });
    $scope.openModalAddress = function () {
      $scope.address.show();
    };
    $scope.closeModalAddress = function () {

      $scope.address.hide();
    };
    $scope.addressData = {};
    var city_limit = false;
    var output = 'json';
    var ak = 'z89D54HRzvzF8jobhBktAbqRIKue8gQN';
    $scope.getAddressInfo = function () {
      //获得当前地址
      ActivityServer.currentAddress(ak).success(function (data) {
        $scope.region = data.content.address
      });
      ActivityServer.selectAddress($scope.addressData.address, $scope.region, city_limit, output, ak).success(function (data) {
        $scope.addressInfoList = data.result;
      })
    };

    //选定地址后操作
    $scope.doneAddress = function () {
      $scope.address.hide();
      $scope.ActivityData.address = $scope.addressData.address
    };
    $scope.chosenAddress = function (item) {
      $scope.address.hide();
      $scope.ActivityData.address = item.city + " " + item.district + " " + item.name;
      $scope.locationAddress = item.location.lat + "/" + item.location.lng; //活动地点经纬度
    };

    //创建活动讨论组
    $scope.groupName = function () {
      //创建群组对象
      var obj = new RL_YTX.CreateGroupBuilder();
      //设置群组名称
      obj.setGroupName($scope.ActivityData.workEffortName);
      //设置群组公告
      obj.setDeclared('这个挺好玩的');
      // 设置群组类型，如：1临时群组（100人）
      obj.setScope(1);
      // 设置群组验证权限，如：需要身份验证2
      obj.setPermission(1);
      //设置为讨论组 该字段默认为2 表示群组，创建讨论组时设置为1
      obj.setTarget(2);
      //发送消息

      //创建讨论组
      RL_YTX.createGroup(obj, function (obj) {
        //获取新建群组id
        var groupId = obj.data;
        //alert('创建群组成功');
        $scope.groupId = groupId;
      }, function (obj) {
        //创建群组失败
        alert("创建失败")
      });
    };

    //取消新建
    $scope.goActivityHome = function () {
      $scope.modal.hide();
      RL_YTX.logout(function () {
        console.log('退出初始化');
        //登出成功处理
      }, function (obj) {
        //登出失败处理
      });
    };

    //新建活动连接后台
    $scope.createNewActivity = function () {
      if ($scope.ActivityData.workEffortName == '' || $scope.ActivityData.workEffortName == undefined) {
        alert('活动标题不能为空');
        return false
      } else {
        $scope.ActivityData.startDate = $("#startDate").val();
        $scope.ActivityData.endDate = $("#endDate").val();
        if ($scope.themeImgId == null) {
          $scope.themeImgId = localStorage.getItem("themeImgId")
        }
        var token = localStorage.getItem("tarjeta");
        console.log($scope.ActivityData.startDate + '_______' + $scope.ActivityData.endDate)
        ActivityServer.createActivity(
          token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          $scope.themeImgId,
          $scope.groupId,
          function (data) {
            console.log(data);
            RL_YTX.logout(function () {
              console.log('退出初始化');
              //登出成功处理
            }, function (obj) {
              //登出失败处理
            });
            //震动一下
            var id = data.workEffortId;
            $location.path("/tab/activityDetails/" + id);
            $scope.modal.hide();
            // $cordovaProgress.showDeterminateWithLabel(true, 15000, "创建中");
            // $cordovaVibration.vibrate(3000);
          }
        );
        localStorage.removeItem("themeImg");
        localStorage.removeItem("themeImgId");
      }
    };

  })

  //由我组织,往期活动,消息邀请**********************************************************************************************
  .controller('ActivityList', function ($scope, $location, $rootScope, $stateParams, ActivityServer) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    var type = $stateParams.type;
    $scope.img = localStorage.getItem("activityImg");
    $scope.adminOpenId = localStorage.getItem('adminOpenId');

    //通过类型  分别显示不同的数据   由我组织  往期活动  活动邀请
    if (type == 'finish') {
      $scope.title = '往期活动';
    } else if (type == 'my') {
      $scope.title = '由我组织';
      var roleTypeId = 'ACTIVITY_ADMIN';
      ActivityServer.myActivity(tarjeta, roleTypeId, function (data) {
        $scope.myActivtyList = data.partyEventsList;
      });
    }

    //点击进入活动详情界面
    $scope.goInfo = function (id, type) {
      $location.path("/tab/activityDetails2/" + id + '/' + type);
    };

  })

  //活动详情*************************************************************************************************************
  .controller('ActivityDetails', function ($stateParams, $state, ThemeImage, ionicDatePicker, $scope, ActivityServer,
                                           $rootScope, $ionicPopup, $ionicPopover, $ionicHistory, $location, $ionicModal, $timeout, $cordovaLaunchNavigator, $cordovaImagePicker,
                                           $cordovaFileTransfer, $ionicLoading, $cordovaProgress, Login,
                                           $cordovaClipboard, $cordovaGeolocation, Contact, $cordovaDatePicker) {

    //准备参数
    $scope.tarjeta = localStorage.getItem("tarjeta");
    $scope.partyId = localStorage.getItem("partyId");
    $scope.workEffortId = $stateParams.activityId;
    $scope.adminOpenId = localStorage.getItem('adminOpenId');

    //功能导航栏
    $scope.activityTabsImg = ThemeImage.getActivityImgTabs();
    $scope.goNavigation = function (name) {
      if (name == '账单') {
        $location.path("/tab/activityBill/" + $scope.workEffortId);
      } else if (name == '投票') {
        $state.go('tab.voteList', {'workEffortId': $scope.workEffortId})
      }
    };

    //返回活动首页
    $scope.goActivityHome = function () {
      $state.go("tab.dash")
    };

    //修改活动状态
    $scope.updateEventStatus = function () {
      var currentStatusId = "CAL_CONFIRMED";
      ActivityServer.updateEventStatus($scope.tarjeta, $scope.workEffortId, currentStatusId, function (data) {
        console.log(data)
      })
    };

    //获得活动的详细信息
    ActivityServer.getActivityDetails($scope.tarjeta, $scope.workEffortId, function (data) {

      //获取需要用到的参数
      $scope.activityList = data.eventDetail;                       //活动基本信息
      $scope.themeImgList = data.theme;                             //活动组题图片
      $scope.userLoginId = data.userLoginId;                        //组织
      $scope.partyId = data.partyId;                                //组织者partyId
      $scope.iAmAdmin = data.iAmAdmin;                              //判断是否是组织者
      $scope.createPersonInfoList = data.createPersonInfoList[0];   //组织者信息
      $scope.pitcureWallList = data.pictureWallList;                //照片墙图片
      $scope.groupMemberList = data.partyJoinEventsList;            //参与人员、
      if ($scope.groupMemberList.length != 0) {
        $scope.number = $scope.groupMemberList.length;              //参与人数
      } else {
        $scope.number = 1;
        $scope.groupMemberList.push({"firstName": '仅自己'});
      }

      $scope.edit = true;
      $scope.editIf = true;
      if ($scope.iAmAdmin == 'Y') {
        $scope.editIf = false;
      }
      //把时间撮转化格式
      Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };

      if (typeof data.eventDetail.actualStartDate == 'string') {
        $scope.activityStartDate = data.eventDetail.actualStartDate;
      } else {
        var activityStartDate = new Date(data.eventDetail.actualStartDate);
        $scope.activityStartDate = activityStartDate.Format("yyyy-MM-dd hh:mm:ss");
      }
      if (typeof data.eventDetail.estimatedCompletionDate == 'string') {
        $scope.activityEndDate = data.eventDetail.estimatedCompletionDate;
      } else {
        var activityEndDate = new Date(data.eventDetail.estimatedCompletionDate);
        $scope.activityEndDate = activityEndDate.Format("yyyy-MM-dd hh:mm:ss");
      }

      //如果报名成功   禁用报名按钮
      $scope.activitySignUp = '算我一个';
      if ($scope.groupMemberList.length != 0) {
        for (var i = 0; i < $scope.groupMemberList.length; i++) {
          if ($scope.groupMemberList[i].partyId == $scope.partyId) {
            $scope.activitySignUp = '我已加入';
            $(function () {
              $('#join').attr('disabled', true);
            });
          }
        }
      }
    });

    //判断是否是组织者 界面调整
    $scope.myActivity = false;//我是组织者
    $scope.otherActivity = true;//我是参与者
    $scope.activityBill = false;
    if ($scope.iAmAdmin == 'Y') {
      $scope.myActivity = true;
      $scope.otherActivity = false;
      $scope.activityBill = true;
    }

    // //活动位置导航（调用本机导航）
    // $scope.launchNavigator = function () {
    //   var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //   $cordovaGeolocation
    //     .getCurrentPosition(posOptions)
    //     .then(function (position) {
    //       var lat = position.coords.latitude;
    //       var long = position.coords.longitude;
    //       $scope.start = [lat, long];
    //       $scope.destination = [$scope.longitude, $scope.latitude];
    //       console.log("111------------" + $scope.start);
    //       console.log("222---------" + $scope.destination);
    //       $cordovaLaunchNavigator.navigate($scope.destination, $scope.start).then(function () {
    //         console.log("Navigator launched");
    //       }, function (err) {
    //         console.error(err);
    //       });
    //     }, function (err) {
    //       // error
    //     });
    // };
    //组织者可以编辑活动

    $scope.editButton = '编辑';
    $scope.editEvent = function (editButton) {
      if (editButton == '编辑') {
        $scope.edit = false;
        $scope.editButton = '完成';
        $('input').css({
          'color': 'red'
        });
        $('textarea').css('color', 'red');
      } else {
        $('#editEvent').attr('disabled',true);
        $('input').css({
          'color': 'black'
        });
        $('textarea').css('color', 'black');
        $scope.startDate = $("#startDate").val();
        $scope.endDate = $("#endDate").val();
        if($scope.startDate=='开始时间待定'){
          $scope.startDate=''
        }
        if($scope.endDate=='结束时间待定'){
          $scope.endDate=''
        }
        $scope.address = $("#address").val();
        var token = localStorage.getItem("tarjeta");
        ActivityServer.updateActivity(
          token,
          $scope.activityList.workEffortName,
          $scope.startDate,
          $scope.endDate,
          $scope.address,
          $scope.activityList.description,
          $scope.activityList.specialTerms,
          $scope.workEffortId,
          null,
          function (data) {
            console.log(data);
          }
        );
        $scope.edit = true;
        $scope.editIf = false;
        $scope.editButton = '编辑';
        $state.reload()
      }
    };
    //选择活动开始结束时间
    $scope.startDate = function () {
      document.addEventListener("deviceready", function () {
        var options = {
          date: new Date(),
          mode: 'dateTime', // or 'time'
          minDate: new Date() - 10000,
          maxDate: new Date() + 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: '确定',
          doneButtonColor: '#000000',
          cancelButtonLabel: '取消',
          cancelButtonColor: '#000000',
          locale: "zh_cn",
          minuteInterval: 30
        };
        $cordovaDatePicker.show(options).then(function (date) {
          $scope.startDateTime = Date.parse(date);
          var Hours = date.getHours();
          if (Hours < 10) {
            Hours = '0' + Hours;
          }
          var Minutes = date.getMinutes();
          if (Minutes < 10) {
            Minutes = '0' + Minutes;
          }
          $("#startDate").val(date.getFullYear() + "-" + parseFloat(date.getMonth() + 1) + "-" + date.getDate() + " " + Hours + ":" + Minutes + ":" + "00");
        });

      }, false);
    };
    $scope.endDate = function () {
      document.addEventListener("deviceready", function () {
        var options = {
          date: new Date(),
          mode: 'dateTime', // or 'time'
          minDate: new Date() - 10000,
          maxDate: new Date() + 10000,
          allowOldDates: true,
          allowFutureDates: true,
          doneButtonLabel: '确定',
          doneButtonColor: '#000000',
          cancelButtonLabel: '取消',
          cancelButtonColor: '#000000',
          locale: "zh_cn",
          minuteInterval: 30
        };
        $cordovaDatePicker.show(options).then(function (date) {
          $scope.endDateTime = Date.parse(date);
          var Hours = date.getHours();
          if (Hours < 10) {
            Hours = '0' + Hours;
          }
          var Minutes = date.getMinutes();
          if (Minutes < 10) {
            Minutes = '0' + Minutes;
          }
          var eq = $("#startDate").val();
          if ($scope.endDateTime < $scope.startDateTime || eq == '') {
            alert("结束时间应在开始时间之后")
          } else {
            $("#endDate").val(date.getFullYear() + "-" + parseFloat(date.getMonth() + 1) + "-" + date.getDate() + " " + Hours + ":" + Minutes + ":" + "00");
          }
        });

      }, false);
    };

    //活动地点调用百度公共接口
    $ionicModal.fromTemplateUrl('templates/activity/activityAddress.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (address) {
      $scope.address = address;
    });
    $scope.openModalAddress = function () {
      $scope.address.show();
    };
    $scope.closeModalAddress = function () {

      $scope.address.hide();
    };
    $scope.addressData = {};
    var city_limit = false;
    var output = 'json';
    var ak = 'z89D54HRzvzF8jobhBktAbqRIKue8gQN';
    $scope.getAddressInfo = function () {
      //获得当前地址
      ActivityServer.currentAddress(ak).success(function (data) {
        $scope.region = data.content.address
      });
      ActivityServer.selectAddress($scope.addressData.address, $scope.region, city_limit, output, ak).success(function (data) {
        $scope.addressInfoList = data.result;
      })
    };

    //选定地址后操作
    $scope.doneAddress = function () {
      $scope.address.hide();
      $scope.activityList.specialTerms = $scope.addressData.address
    };
    $scope.chosenAddress = function (item) {
      $scope.address.hide();
      $("#address").val(item.city + " " + item.district + " " + item.name);
      $scope.activityList.specialTerms = item.location.lat + "/" + item.location.lng;//活动地点经纬度
    };

    //显示照片墙幻灯片（大图片）
    $scope.shouBigImage = function (index) {
      $location.path("/tab/slide/" + $scope.workEffortId + '/' + index);
    };

    //进入活动讨论
    $scope.activityDiscuss = function () {
      $state.go("tab.activityDiscuss", {"activityId": $scope.workEffortId}, {reload: false});
      $scope.popover.hide();
    };

    //进入活动项
    $scope.activityItem = function (id) {
      $location.path("/tab/activityItem/" + id);
      $scope.popover.hide();
    };

    //进入活动账单
    $scope.aboutPayment = function (id) {
      $location.path("/tab/activityBill/" + id);
      $scope.popover.hide();
    };

    //活动报名功能
    $scope.showPopup = function () {
      ActivityServer.signUp($scope.tarjeta, $scope.workEffortId, function (data) {
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
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
      $timeout(function () {
        myPopup.close();
      }, 1500);

      //执行一次活动查询刷新活动列表
      var roleTypeId = 'ACTIVITY_MEMBER';
      ActivityServer.myActivity($scope.tarjeta, roleTypeId, function (data) {
        $scope.active = data.partyEventsList;
      });
      $ionicHistory.goBack();

    };

    //照片墙相片
    $scope.images_list = [];
    if ($scope.pitcureWallList.length != 0) {
      for (var i = 0; i < $scope.pitcureWallList.length; i++) {
        $scope.images_list.push($scope.pitcureWallList[i])
      }
    }

    //上传图片照片墙 活动的图片添加到照片墙中显示
    $scope.upLoadImage = function () {
      var options = {
        maximumImagesCount: 9,
        width: 800,
        height: 800,
        quality: 100
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            $scope.images_list.push({"objectInfo": results[i]});
            $cordovaProgress.showBarWithLabel(false, 30000, "上传中");
            document.addEventListener('deviceready', function () {
              var url = $rootScope.activityInterfaceUrl + "uploadPictureWall?workEffortId=" + $scope.workEffortId + '&partyId=' + $scope.partyId;
              var options = {};
              $cordovaFileTransfer.upload(url, results[i], options)
                .then(function (result) {
                  //alert(JSON.stringify(result.response));
                  //alert(result.message);
                }, function (err) {
                  //alert(JSON.stringify(err));
                  //alert(err.message);
                  alert("上传失败");
                }, function (progress) {
                  // constant progress updates
                });
            }, true);
          }
        }, function (error) {
          // error getting photos
        });
    };

    //我的联系人弹出框
    $ionicPopover.fromTemplateUrl('templates/contact/contactModle.html', {
      scope: $scope
    }).then(function (contact) {
      $scope.contact = contact;
    });
    $scope.openContact = function () {
      $scope.contact.show();
    };
    $scope.closeContact = function () {
      $scope.contact.hide();
    };

    //邀请好友参与活动方式弹出框
    $scope.shareImgList = ThemeImage.getShareImg();  //显示邀请好友方式图片
    $ionicModal.fromTemplateUrl('templates/activity/shareAvtivity.html', function (modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope
    });
    $scope.InviteModal = function () {
      $scope.taskModal.show();
    };
    $scope.closeNewTask = function () {
      $scope.taskModal.hide();
    };

    //修改用户昵称
    $scope.updateUserName = function () {
      Contact.updatePersonInfo($scope.partyId, $scope.originator.nickName, null, function (data) {
        console.log('修改用户昵称' + data)
      })
    };

    //使用微信信息
    $scope.userWeixinInfo = function () {
      $scope.scope = "snsapi_userinfo";
      Wechat.auth($scope.scope, function (response) {
        // you may use response.code to get the access token.
        console.log(JSON.stringify(response) + "微信返回值");
        var code = response.code;
        Login.userWeChatAppLogin(code, $scope.partyId, function (data) {
          console.log(data.tarjeta);
          if (data.tarjeta) {
            localStorage.removeItem("openId");
            localStorage.setItem("adminOpenId", data.openId); //设置partyId登陆人
          }
        });
        //location.reload(true);
        $state.reload();
      }, function (reason) {
        alert("Failed: " + reason);
      });
    };

    //如果用户不是组织者不可以邀请好友
    if ($scope.createPersonInfoList.activityAdminPartyId != $scope.partyId) {
      $('#invent').attr('disabled', true);
    }

    //判断组织者是否绑定微信,如果绑定不显示绑定按钮
    $scope.weixin = true;
    $scope.changeName = false;
    $scope.originator = {};
    if ($scope.adminOpenId != 'NA' && $scope.adminOpenId != null) {
      $scope.weixin = false;
      $scope.changeName = true;
      $scope.originator.nickName = $scope.createPersonInfoList.firstName;
      $scope.originatorHeadImg = $scope.createPersonInfoList.objectInfo;
    } else {
      if ($scope.createPersonInfoList.firstName == '本人') {
        $scope.originator.nickName = '';
        $scope.originatorHeadImg = '../www/img/shareActivity/形状-12@2x.png';
      } else {
        $scope.originator.nickName = $scope.createPersonInfoList.firstName;
        $scope.originatorHeadImg = $scope.createPersonInfoList.objectInfo;
      }
    }

    //选择哪种方式邀请好友
    $scope.chooseWay = function (name, workEffortId, partyId) {
      if ($scope.originator.nickName == '') {
        $ionicPopup.alert({
          title: '昵称不能为空',
          template: "填写您的昵称，以便好友加入活动"
        });
      } else {
        if (name == '短信') {
          $state.go("tab.activityInvitation", {"workEffortId": workEffortId, "partyId": partyId});
        } else if (name == '微信') {
          console.log($scope.adminOpenId);
          Wechat.share({
            message: {
              title: $scope.originator.nickName + '邀请您加入活动: ' + $scope.activityList.workEffortName,
              description: $scope.activityList.description,
              thumb: 'www/img/shareActivity/btn_梨友_n@2x.png',
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/main?workEffortId=' + $scope.workEffortId + "&adminOpenId=" + $scope.adminOpenId,
              }
            },
            scene: Wechat.Scene.SESSION // share to SESSION
          }, function () {
            alert("Success");
          }, function (reason) {
            alert("Failed: " + reason);
          });
        } else if (name == '朋友圈') {
          Wechat.share({
            message: {
              title: $scope.originator.nickName + '邀请您加入活动: ' + $scope.activityList.workEffortName,
              description: $scope.activityList.description,
              thumb: 'www/img/shareActivity/btn_梨友_n@2x.png',
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/main?workEffortId=' + $scope.workEffortId
              }
            },
            scene: Wechat.Scene.TIMELINE // share to SESSION
          }, function () {
            alert("Success");
          }, function (reason) {
            alert("Failed: " + reason);
          });
        } else if (name == '手动添加') {
          $state.go("tab.activityAddPerson", {"workEffortId": $scope.workEffortId});
          $scope.taskModal.hide();
        } else if (name == '梨友') {
          $scope.contact.show();
          //获得我的全部联系人列表(我参与的活动)
          Contact.queryAllActivityRelationPersons($scope.partyId, function (data) {
            $scope.allPersonList = data.allPersonList
          });
          //发送邀请
          $scope.sendInvitation = function (partyId) {
            localStorage.setItem("invited")
            var moreInfoUrl = '/tab/activityDetails/' + $scope.workEffortId;
            var noteInfo = $scope.createPersonInfoList.firstName + '邀请您加入活动:' + $scope.activityList.workEffortName;
            ActivityServer.createPeSystemInfoAboutActivity(partyId, moreInfoUrl, noteInfo, function (data) {
              console.log(data);
              if (data.resultMsg == '成功') {
                $scope.isJoind = true;
                alert('邀请成功')
              }
            })
          }
        } else if (name == '复制链接') {
          $ionicPopup.alert({
            title: '复制成功',
            template: "粘贴链接邀请好友"
          });
          $cordovaClipboard
            .copy('http://www.vivafoo.com:3400/pewebview/control/otherView?workEffortId=' + $scope.workEffortId)
            .then(function () {
              // success
            }, function () {
              // error
            });
        } else if (name == '二维码') {
          $scope.taskModal.hide();
          $state.go('tab.activityCode', {"workEffortId": $scope.workEffortId})
        }
      }
    }

  })

  //活动照片墙（大图片）***************************************************************************************************
  .controller('slideCrl', function ($scope, $stateParams, $ionicHistory, ActivityServer, $ionicActionSheet, $location) {

    //准备参数
    $scope.workEffortId = $stateParams.activityId;
    $scope.tarjeta = localStorage.getItem("tarjeta");
    $scope.myActiveSlide = $stateParams.index;
    $scope.partyId = localStorage.getItem("partyId");

    //照片INDEX
    $scope.slideChanged = function (index) {
      $scope.imgIndex = index;
      $scope.acountPraiseCount = $scope.pictureList[$scope.imgIndex].praiseCount;
      // $scope.acountTrampleCount = $scope.pictureList[$scope.imgIndex].trampleCount;
    };
    if ($scope.myActiveSlide == 0) {
      $scope.imgIndex = 0;
    } else {
      $scope.imgIndex = $scope.myActiveSlide
    }

    //获取活动照片墙图片
    $scope.viewSize = '999';
    $scope.ACTIVITY_PICTURE = 'ACTIVITY_PICTURE';
    ActivityServer.queryMyEventContents($scope.tarjeta, $scope.workEffortId, $scope.ACTIVITY_PICTURE, $scope.viewSize, function (data) {
      $scope.pictureList = data.contentsList;
      $scope.acountPraiseCount = $scope.pictureList[$scope.myActiveSlide].praiseCount;
      //$scope.acountTrampleCount = $scope.pictureList[$scope.myActiveSlide].trampleCount;
    });

    //赞和踩
    $scope.praise = 'PRAISE_COUNT';
    $scope.trample = 'TRAMPLE_COUNT';
    $scope.praiseselect = function (type) {
      for (var i = 0; i < $scope.pictureList.length; i++) {
        if (i == $scope.imgIndex) {
          $scope.contentId = $scope.pictureList[i].contentId;
          $scope.contentTypeId = type;
          //alert( $scope.contentId+$scope.contentTypeId);
          ActivityServer.praisePicture($scope.tarjeta, $scope.contentTypeId, $scope.contentId, function (data) {
            if (type == 'PRAISE_COUNT') {
              $scope.acountPraiseCount = data.praiseCount
            } else {
              $scope.acountTrampleCount = data.trampleCount
            }
          });
        }
      }
      $scope.$on('$ionicView.beforeEnter', function () {
        $scope.doRefresh();
      });
    };

    // 一个确认对话框  删除图片
    $scope.showConfirm = function () {
      // 显示上拉菜单
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '<b>发送给好友</b>'},
          {text: '保存图片'}
        ],
        destructiveText: '删除',
        titleText: '图片操作',
        cancelText: '取消',
        cancel: function () {
          // 这里添加取消代码
        },
        buttonClicked: function (index) {
          return true;
        },
        destructiveButtonClicked: function (index) {
          for (var i = 0; i < $scope.pictureList.length; i++) {
            var flag = true;
            if (i == $scope.imgIndex && flag) {
              if ($scope.partyId == $scope.pictureList[i].partyId) {
                ActivityServer.deletePictureWall($scope.tarjeta, $scope.workEffortId, $scope.pictureList[i].contentId, function (data) {
                  console.log(data);
                  flag = false;
                });
              } else {
                alert('您只能删除您上传的图片')
              }
            }
          }
          $ionicHistory.goBack();
          return true;
        }
      });
    };

    $scope.goBack = function () {
      $location.path("/tab/activityDetails/" + $scope.workEffortId);
    }
  })

  //活动二维码***********************************************************************************************************
  .controller('activityCode', function ($scope, $stateParams) {
    $scope.workEffortId = $stateParams.workEffortId;
    jQuery('.items').html("");
    jQuery('.items').qrcode('http://www.vivafoo.com:3400/pewebview/control/main?workEffortId=' + $scope.workEffortId + "&adminOpenId=" + $scope.adminOpenId);
  })

  //活动讨论*************************************************************************************************************
  .controller('ActivityDiscuss', function ($scope, $location, $rootScope, $stateParams, ActivityServer, $ionicPopover,
                                           $ionicScrollDelegate, $cordovaMedia) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    $scope.workEffortId = $stateParams.activityId;
    $scope.contactImg = localStorage.getItem("contactImg");

    //查询讨论组相关信息
    ActivityServer.queryActivityChatGroupInfo(tarjeta, $scope.workEffortId, function (data) {
      $scope.groupId = data.chatGroupId;//组ID
      $scope.firstName = data.firstName;
      $scope.partyId = data.partyId;
      $scope.contactNumber = data.contactNumber;
    });

    //聊天数据列表
    $scope.discussList = [];
    var a = localStorage.getItem($scope.workEffortId);
    if (a != null) {
      var b = JSON.parse(a).message;
      for (var i = 0; i < b.length; i++) {
        $scope.discussList.push({'name': b[i].name, 'text': b[i].text, 'time': b[i].time, 'id': $scope.workEffortId})
      }
    }
    //初始化SDK
    var resp = RL_YTX.init('8a216da85b3c225d015b585bbf490c2f');
    if (170002 == resp.code) {
      //缺少必要参数，详情见msg参数
      //用户逻辑处理
    } else if (174001 == resp.code) {
      //不支持HTML5，关闭页面
      //用户逻辑处理
    } else if (200 == resp.code) {
      console.log('融云初始化成功');
      //判断不支持的功能，屏蔽页面展示
      var unsupport = resp.unsupport;
    }

    //账号登录参数设置
    var appId = '8a216da85b3c225d015b585bbf490c2f';
    var appToken = '8da3f790a40bbb6607c03c948b8e7c6b';
    var user_account = $scope.contactNumber;
    var timeStamp = IM._getTimeStamp();
    var sig = hex_md5(appId + user_account + timeStamp + appToken);
    var loginBuilder = new RL_YTX.LoginBuilder();

    loginBuilder.setType(1);//登录类型 1账号登录，3通讯账号密码登录
    loginBuilder.setUserName(user_account);//设置用户名
    loginBuilder.setPwd();//type值为1时，密码可以不赋值
    loginBuilder.setSig(sig);//设置sig
    loginBuilder.setTimestamp(timeStamp);//设置时间戳

    //执行用户登录
    RL_YTX.login(loginBuilder, function (obj) {
      console.log('融云登陆成功');
      //设置讨论组昵称成功
      var uploadPersonInfoBuilder = new RL_YTX.UploadPersonInfoBuilder();
      uploadPersonInfoBuilder.setNickName($scope.firstName);
      uploadPersonInfoBuilder.setSex(1);
      uploadPersonInfoBuilder.setBirth("1990-01-01");
      uploadPersonInfoBuilder.setSign('个人签名');
      RL_YTX.uploadPerfonInfo(uploadPersonInfoBuilder, function (obj) {
        //设置成功
        console.log('融云昵称设置成功');
        obj.version;//个人信息版本号

        //加入群组
        var builder = new RL_YTX.JoinGroupBuilder();
        //设置申请群组id
        builder.setGroupId($scope.groupId);
        //设置申请理由
        builder.setDeclared('要加入');
        //发送请求
        RL_YTX.joinGroup(builder, function () {
          //alert('加入成功')
          //操作成功
        }, function (obj) {
          //操作失败
        });
      }, function (resp) {
        //设置失败
        // alert(resp.code);
      });

      //新建获取群组成员列表请求对象
      $scope.groupMemberList = [];
      var groupMember = new RL_YTX.GetGroupMemberListBuilder();
      //设置群组id
      groupMember.setGroupId($scope.groupId);
      //该接口为分页接口，如果要获取全部数据，设置pageSize为-1
      groupMember.setPageSize(-1);
      //发送请求

      RL_YTX.getGroupMemberList(groupMember, function (obj) {
        console.log(obj[1]);
        for (var i = 1; i < obj.length; i++) {
          $scope.groupMemberList.push({firstName: obj[i].nickName, member: obj[i].member});
          $scope.$digest();
        }

        // //获取用户在线状态
        // $scope.useraccList=[];
        // if($scope.groupMemberList.length!=0){
        //   for(var i=0;i<$scope.groupMemberList.length;i++){
        //     $scope.useraccList.push($scope.groupMemberList[i].member)
        //   }
        // }
        // var getUserStateBuilder = new RL_YTX.GetUserStateBuilder();
        // getUserStateBuilder.setNewUserstate(true);//使用新SDK的用户状态
        // getUserStateBuilder.setUseracc($scope.useraccList);
        // //var onlineState = $(current_contact).find('span[contact_style_type="onlineState"]');
        // RL_YTX.getUserState(getUserStateBuilder, function(obj) {
        //   //获取成功
        //   //obj[i].useracc 对方账号
        //   //obj[i].state 对方在线状态1:在线2:离线当用户为离线状态时，obj.state,obj.network和obj.device为undefined
        //   //obj[i].network对方网络状态 1:WIFI 2:4G 3:3G 4:2G(EDGE) 5: INTERNET  6: other
        //   //obj[i].device对方登录终端1:Android 2:iPhone10:iPad11:Android Pad20:PC 21:H5
        //   for(var i=0;i<obj.length;i++){
        //     alert(obj[i].useracc+obj[i].state)
        //   }
        // }, function(obj) {
        //   if (174006 != obj.code) {
        //     alert("错误码：" + obj.code + "; 错误描述：" + obj.msg)
        //   }
        // });
        //成功获取数据，更新页面
      }, function (obj) {
        //获取数据失败
      });

      //消息监听器
      RL_YTX.onMsgReceiveListener(function (obj) {
        if (obj.msgType == 12) {
          if (obj.msgDomain == 1) {
            alert("正在输入");
            return;
          } else if (obj.msgDomain == 0) {
            //非任何输入状态
            alert("非任何输入状态");
            return;
          } else if (obj.msgDomain == 2) {
            //正在录音;
            alert("正在录音");
            return;
          }
        }

        //获取消息列表
        var b_isGroupMsg = '1';
        var you_sender = (b_isGroupMsg) ? obj.msgReceiver : obj.msgSender;
        //获取发送者昵称，如果不存在，使用账号代替
        var you_senderNickName = obj.senderNickName;
        var name = obj.msgSender;
        if (!!you_senderNickName) {
          name = you_senderNickName;
        }
        var content_type = null;
        //获取消息版本号
        var version = obj.version;
        //获取消息发送时间
        var time = obj.msgDateCreated;
        //获取消息类型
        //1:文本消息 2:语音消息 4:图片消息6:文件
        var msgType = obj.msgType;
        if (1 == msgType || 0 == msgType) {
          //文本消息，获取消息内容
          var you_msgContent = obj.msgContent;
          $scope.discussList.push({'name': name, 'text': you_msgContent, 'time': time, 'id': $scope.workEffortId});
          $scope.$digest();
          console.log($scope.discussList)
        } else if (2 == msgType) {
          //语音消息，获取语音文件url
          var url = obj.msgFileUrl;
          alert(url)
        } else if (3 == msgType) {
          //3：视频消息，获取视频url
          //语音消息，获取语音文件url
          var url = obj.msgFileUrl;
          alert(url)
        } else if (4 == msgType) {
          //图片消息 获取图片url
          var url = obj.msgFileUrl;
          alert(url)
        } else {
          //后续还会支持(地理位置，视频，以及自定义消息等)
        }
        //通知前端更新页面
        //把消息添加到界面上
      });

      //注册群组通知事件监听
      RL_YTX.onNoticeReceiveListener(function (obj) {
        //收到群组通知
      });
      RL_YTX.onConnectStateChangeLisenter(function (obj) {
        //连接状态变更
        // obj.code;//变更状态 1 断开连接 2 重连中 3 重连成功 4 被踢下线 5 断开连接，需重新登录
        // 断线需要人工重连
      });
    }, function (obj) {
      //登录失败方法回调
    });

    //语音聊天
    var voice = true;
    $scope.voiceChat = function () {
      if (voice) {
        $("textarea").css({
          'background-color': '#f8f8f8',
          'text-align': 'center'
        }).attr({
          'readonly': 'readonly',
          'placeholder': '按住发送'
        });
        voice = false;
      } else {
        $("textarea").css({
          'background-color': 'white',
          'text-align': 'left'
        }).attr('placeholder', '请输入你想要发送的信息。。。').removeAttr('readonly');
        voice = true
      }

    };

    //发送语音
    $scope.holdVoice = function () {
      var mouseUp = $("textarea").attr('readonly');
      if (mouseUp == 'readonly') {
        $("textarea").css('background-color', '#4d4d4d')
      }

    };

    $scope.releaseVoice = function () {
      var mouseUp = $("textarea").attr('readonly');
      if (mouseUp == 'readonly') {
        $("textarea").css('background-color', 'white')
      }

    };

    //发送信息
    $scope.sentMessage = function () {
      //新建消息体对象
      var obj = new RL_YTX.MsgBuilder();
      //设置自定义消息id
      var msgid = '100000';
      obj.setId(msgid);
      //假设页面存在一个id为file的<input type=”file”>元素
      //获取图片或附件对象
      //var file = document.getElementById("file").files[0];
      //设置图片或附件对象
      //obj.setFile(file);
      //设置发送的文本内容
      obj.setText($scope.input.message);
      //设置发送的消息类型1文本消息4 图片消息6 附件消息
      //发送非文本消息时，text字段将被忽略，发送文本消息时 file字段将被忽略
      obj.setType(1);
      //设置接收者
      obj.setReceiver($scope.groupId);

      RL_YTX.sendMsg(obj, function () {
        //发送消息成功
        //处理用户逻辑，通知页面
      }, function (obj) {
        //失败ßßssßß
        //发送消息失败
        //处理用户逻辑，通知页面刷新，展现重发按钮
      }, function (sended, total) {
        //发送图片或附件时的进度条
        //如果发送文本消息，可以不传该参数
      });
      var time = new Date();
      $scope.discussList.push({
        'name': $scope.firstName,
        'text': $scope.input.message,
        'time': time,
        'id': $scope.workEffortId
      });
      $('textarea').val('');
      $scope.input.message = '';
      $ionicScrollDelegate.scrollBottom();
    };

    //返回活动详情，退出融连云登陆。
    $scope.goback = function () {
      RL_YTX.logout(function () {
        console.log("退出讨论");
        //登出成功处理
      }, function (obj) {
        //登出失败处理
      });
      var messageList = {};
      messageList.message = $scope.discussList;
      //messageList.workEffortId=$scope.workEffortId;
      localStorage.removeItem($scope.workEffortId);
      localStorage.setItem($scope.workEffortId, JSON.stringify(messageList));
      $location.path("/tab/activityDetails/" + $scope.workEffortId);
    }

  })

  //活动主题图片界面******************************************************************************************************
  .controller('ThemeImage', function ($scope, $ionicSlideBoxDelegate, ActivityServer) {

    //获得主题类型列表
    ActivityServer.queryContentTypeList(function (data) {
      $scope.contectTypeList = data.contentTypeList
    });

    //关闭模态框
    $scope.closeThemeModal = function () {
      $scope.Theme.hide();
    };

    //滑动选择类型
    $scope.slideIndex = 0;
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
      console.log("slide Change");
      if ($scope.slideIndex == 0) {
        console.log("slide 1");
      }
      else if ($scope.slideIndex == 1) {
        console.log("slide 2");
      }
      else if ($scope.slideIndex == 2) {
        console.log("slide 3");
      }
    };
    $scope.activeSlide = function (index) {
      $ionicSlideBoxDelegate.slide(index);
    };

    //获得不同类型图片
    ActivityServer.queryThemes($scope.contectTypeList[0].contentTypeId, function (data) {
      $scope.huwaiImgList = data.themesList
    });
    ActivityServer.queryThemes($scope.contectTypeList[1].contentTypeId, function (data) {
      $scope.fimilyImgList = data.themesList
    });
    ActivityServer.queryThemes($scope.contectTypeList[2].contentTypeId, function (data) {
      $scope.partyImgList = data.themesList
    });
    ActivityServer.queryThemes($scope.contectTypeList[3].contentTypeId, function (data) {
      $scope.businessImgList = data.themesList
    });

    //选定组题图片
    $scope.selectThemeImg = function (contentId, img) {
      localStorage.setItem("themeImg", img);
      localStorage.setItem("themeImgId", contentId);
      alert("选择图片成功");
      $scope.Theme.hide();
    }
  })

  //活动项***************************************************************************************************************
  .controller('ActivityItem', function ($scope, $rootScope, $stateParams, ActivityServer, $ionicPopup, ionicDatePicker) {

    //准备参数
    var id = $stateParams.id;
    var tarjeta = localStorage.getItem("tarjeta");
    var partyId = localStorage.getItem("partyId");
    $scope.img = localStorage.getItem("activityImg");
    ActivityServer.findActivityItem(tarjeta, id, function (data) {
      console.log(data);
      $scope.activityItemList = data.projectList
    });

    //录入时间
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var selectDate = new Date(val);
        console.log(selectDate.getFullYear() + "-" + parseFloat(selectDate.getMonth() + 1) + "-" + selectDate.getDate());
        $scope.itemData.time = selectDate.getFullYear() + "-" + parseFloat(selectDate.getMonth() + 1) + "-" + selectDate.getDate() + " " + "00" + ":" + "00" + ":" + "00"
      },
      to: new Date(2020, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

    //新建活动项弹出框
    $scope.newActivityItem = function () {
      $scope.itemData = {};
      var itemPopup = $ionicPopup.show({
        template: '<input type="text" placeholder="时间" ng-model="itemData.time" readonly=“readonly” style="background-color: white" ng-click="openDatePicker()"><br>' +
        '<input type="text" placeholder="安排" ng-model="itemData.name"><br>' +
        '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="createLabel();">创建</button><br/>' +
        '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">取消</button>',
        title: '新建活动项',
        scope: $scope
      });
      itemPopup.then(function (res) {
        console.log('Tapped!', res);
      });
      $scope.addLab = itemPopup;
    };
    $scope.createLabel = function () {
      if ($scope.itemData.time == null || $scope.itemData.time == '') {
        $scope.addLab.close();
      } else {
        console.log($scope.itemData.time + $scope.itemData.name);
        ActivityServer.createActivityItem(tarjeta, id, $scope.itemData.name, $scope.itemData.time, function (data) {
          console.log(data.resultMsg)
        });
        $scope.addLab.close();
        ActivityServer.findActivityItem(tarjeta, id, function (data) {
          console.log(data);
          $scope.activityItemList = data.projectList
        });
      }
    };
    $scope.closeLab = function () {
      $scope.addLab.close();
    };
  })

  //活动邀请手机通讯录好友*************************************************************************************************
  .controller('ActivityInvitation', function ($scope, $cordovaContacts, $cordovaSms, $stateParams, ActivityServer,
                                              $ionicHistory) {
    //参数准备
    var workEffortId = $stateParams.workEffortId;
    var partyId = $stateParams.partyId;
    var tarjeta = localStorage.getItem("tarjeta");
    var selectedList = [];

    // 打开手机通讯录查询选择联系人
    $cordovaContacts.pickContact().then(
      function (contact) {
        //alert('Contact pick! '+ JSON.stringify(contact));
        console.log('The following contact has been selected:' + JSON.stringify(contact));
        selectedList.push({
          'phone': contact.phoneNumbers[0].value.replace(/[\s\-]/g, ''),
          'name': contact.name.formatted,
          'checked': true
        });
        $scope.selectedList = selectedList;
      },
      function (err) {
        //alert('Contact pick err!', err);
        //console.log(err);node_modules
      }
    );

    //追加联系人
    $scope.addPerson = function () {
      $cordovaContacts.pickContact().then(
        function (contact) {
          //alert('Contact pick! '+ JSON.stringify(contact));
          console.log('The following contact has been selected:' + JSON.stringify(contact));
          selectedList.push({
            'phone': contact.phoneNumbers[0].value.replace(/[\s\-]/g, ''),
            'name': contact.name.formatted,
            'checked': true
          });
          $scope.selectedList = selectedList;
          //alert(JSON.stringify($scope.selectedList))
        },
        function (err) {
          //alert('Contact pick err!', err);
          //console.log(err);node_modules
        }
      );
    };

    //选择想要邀请的联系人
    $scope.sendSMS = function () {
      var mobilePhone = [];
      for (var i = 0; i < $scope.selectedList.length; i++) {
        if ($scope.selectedList[i].checked == true) {
          mobilePhone.push($scope.selectedList[i].name + "/" + $scope.selectedList[i].phone)
        }
      }
      var contact = mobilePhone.toString();
      ActivityServer.sendInvitation(tarjeta, workEffortId, partyId, contact, function (data) {
        //$state.go("app.activityDetails",{"activityId":workEffortId})
        $ionicHistory.goBack()
      })
    };
  })

  //手动添加活动参与人员*****************************************************************************************************
  .controller('activityAddPerson', function ($scope, $ionicPopup, Contact, $state, $stateParams, ActivityServer) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    var id = $stateParams.workEffortId;
    $scope.workEffortId = id; // 活动ID

    // 添加添加人员
    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea  style='display: inline-block;width: 41%;resize:none' class='personName' placeholder='昵称'></textarea>" +
        "<textarea style='display: inline-block;width: 41%;resize:none' class='personTel' placeholder='手机号码'></textarea>" +
        "<img src='img/shanchu.jpeg' width=48px height=48px onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><hr>" +
        "");
    };

    //返回
    $scope.goBack=function (id) {
      $state.go('tab.activityDetails',{'activityId':$scope.workEffortId})
    };

    // 添加人员
    $scope.createSurveyAndQuestions = function () {
      $scope.personInfoList = [];
      var personName = $(".personName");
      var personTel = $(".personTel");
      for (var i = 0; i < personName.length; i++) {
        $scope.personInfoList.push(personName.eq(i).val() + ':' + personTel.eq(i).val());
      }
      alert($scope.personInfoList.toString());
      ActivityServer.addConceptPersonToActivity(tarjeta, $scope.workEffortId, $scope.personInfoList.toString(), function (data) {
        console.log(data)
      })
    };
  })

  //活动账单的展示页面*****************************************************************************************************
  .controller('activityBillCtrl', function ($scope, $ionicPopup, Contact, $state, $stateParams, ActivityServer) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    var id = $stateParams.workEffortId;
    $scope.contactImg = localStorage.getItem("contactImg");//人物头像缺省图片

    //查询账单信息
    ActivityServer.findActivityPayment(tarjeta, id, function (data) {
      $scope.billList = data.payList;
      console.log("查询活动列表——————————" + data.resultMsg)
    });

    //添加账单
    $scope.addBill = function () {
      $state.go("tab.addPersonBill", {workEffortId: id});
    };
  })

  //添加账单的控制********************************************************************************************************
  .controller('addPersonBillCtrl', function ($scope, $ionicHistory, ionicDatePicker, $state, $ionicModal, $rootScope, Contact,
                                             $stateParams, ActivityServer) {
    //准备参数
    var workEffortId = $stateParams.workEffortId;
    var tarjeta = localStorage.getItem("tarjeta");

    //获得参与人列表
    ActivityServer.getActivityDetails(tarjeta, workEffortId, function (data) {
      $scope.personmainLists = data.partyJoinEventsList;//参与人员
    });

    //添加新范围选择联系人弹窗
    $ionicModal.fromTemplateUrl('templates/contact/contactModle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (contact) {
      $scope.contact = contact;
    });
    $scope.openContact = function () {
      $scope.contact.show();
    };
    $scope.closeModal = function () {
      $scope.contact.hide();
    };

    //将选择的值放入到页面里面
    $scope.createRangeLable = function () {
      for (var i = 0; i < $scope.personmainLists.length; i++) {
        if ($scope.personmainLists[i].checked == true) {
          $("#pname").val($scope.personmainLists[i].nickName);
          $scope.personId = $scope.personmainLists[i].partyId;
          alert($scope.personId);
        }
      }
      $scope.contact.hide();
    };

    //提交新录入账单
    $scope.Order = {};
    $scope.createOrder = function () {
      $scope.Order.date = $("#mydate").val();
      console.log($scope.personId + $scope.Order.money + $scope.Order.ymoney + $scope.Order.date);
      ActivityServer.createActivityPayment(tarjeta, workEffortId, $scope.personId, $scope.Order.money, $scope.Order.ymoney,
        $scope.Order.date, function (data) {
          console.log("创建活动账单————————" + data.resultMsg);
          $state.go("tab.activityBill");
          $ionicHistory.goBack()
        })
    };

    //选着订单录入时间
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var selectDate = new Date(val);
        console.log(selectDate.getFullYear() + "-" + parseFloat(selectDate.getMonth() + 1) + "-" + selectDate.getDate());
        $("#mydate").val(selectDate.getFullYear() + "-" + parseFloat(selectDate.getMonth() + 1) + "-" + selectDate.getDate());
      },
      to: new Date(2020, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };
    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };
  })
;
