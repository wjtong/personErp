angular.module('activity.controllers', [])

//活动首页***************************************************************************************************************
  .controller('ActivityHome', function ($scope, $location, ActivityServer, $state, ThemeImage) {
    //全局图片
    $scope.activityImg = ThemeImage.getRangeImg();
    localStorage.setItem("activityImg", $scope.activityImg.img);//全局活动图片
    localStorage.setItem("contactImg", $scope.activityImg.img2);//全局人员图片
    $scope.img = localStorage.getItem("activityImg");           //显示缺省图片

    //获得我的全部活动列表(我参与的活动)
    var roleTypeId = 'ACTIVITY_MEMBER';
    var tarjeta = localStorage.getItem("tarjeta");
    ActivityServer.myActivity(tarjeta, roleTypeId, function (data) {
      $scope.active = data.partyEventsList;
      console.log("查询我参与的活动" + "---------" + data.resultMsg)
      if (data != null) {
        $scope.activityHome = true;
        $scope.activityHomeNull = false;
      }
      //如果没有添加主题图片 显示缺省图片
      if($scope.active!=''||$scope.active!=null){
        for(var i=0;i<$scope.active.length;i++){
          if($scope.active[i].objectInfo==""){
            $scope.active[i].objectInfo=$scope.img;
          }
        }
      }
    });

    //如果没有活动  页面调整
    if (localStorage.getItem("tarjeta") == null || $scope.active == '' || $scope.active == undefined) {
      $scope.activityHome = false;
      $scope.activityHomeNull = true;
    } else if (localStorage.getItem("tarjeta") != null) {
      $scope.activityHome = true;
      $scope.activityHomeNull = false;
    }

    //找回历史活动
    $scope.getHistory = function () {
      $state.go("login")
    };

    //新建活动
    $scope.newEvent = 'newEvent';
    $scope.newActivity = function (newEvent) {
      $location.path('/app/newActivity/' + newEvent)
    };

    //进入详情页
    $scope.activityDetails = function (id) {
      $location.path("/app/activityDetails/" + id);
    };

    //定义：有我组织  往期活动 收藏
    $scope.typefinish = 'finish';
    $scope.typeMy = 'my';
    $scope.typeInvitation = 'invitation';
    $scope.goInfo = function (type) {
      $location.path("/app/activityList/" + type);
    };
  })

  //新建活动*************************************************************************************************************
  .controller('NewActivity', function ($scope, $state, $ionicModal, Contact, $ionicHistory, $cordovaContacts,
                                       $rootScope, $stateParams, $cordovaCamera, $cordovaImagePicker, ActivityServer,
                                       $ionicPopup, $location, ThemeImage, ionicDatePicker,$cordovaFileTransfer,
                                       ionicTimePicker, $cordovaDatePicker, $cordovaVibration) {
    //活动编辑
    var type = $stateParams.type;
    $scope.workEffortId = $stateParams.id;
    //获得token
    var tarjeta = localStorage.getItem("tarjeta");
    //获得App使用者partyId
    var partyId = localStorage.getItem("partyId");
    //显示缺省图片
    $scope.img = localStorage.getItem("activityImg");
    $scope.imgPerson = localStorage.getItem("contactImg");

    //如果是活动编辑   查询活动相关信息
    $scope.ActivityData = {};
    if ($scope.workEffortId != "" || $scope.workEffortId != null) {
      ActivityServer.getActivityDetails(tarjeta, $scope.workEffortId, function (data) {
        $scope.ActivityData.workEffortName = data.eventDetail[0].workEffortName;
        if (data.eventDetail[0].actualStartDate != null) {
          var sDate = new Date(data.eventDetail[0].actualStartDate);
          $("#startDate").val(sDate.getFullYear() + "-" + parseFloat(sDate.getMonth() + 1) + "-" + sDate.getDate() + " " + sDate.getHours() + ":" + sDate.getMinutes() + ":" + "00");
        }
        if (data.eventDetail[0].actualStartDate != null) {
          var eDate = new Date(data.eventDetail[0].estimatedCompletionDate);
          $("#endDate").val(eDate.getFullYear() + "-" + parseFloat(eDate.getMonth() + 1) + "-" + eDate.getDate() + " " + eDate.getHours() + ":" + eDate.getMinutes() + ":" + "00");
        }
        $scope.ActivityData.information = data.eventDetail[0].description
        $scope.ActivityData.address = data.eventDetail[0].locationDesc
      })
    }

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
          $scope.startDateTime = Date.parse(date)
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
          $scope.endDateTime = Date.parse(date)
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
      $location.path('/app/themeImage');
    };

    //上传主题图片
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
            document.addEventListener('deviceready', function () {
              var url = "http://192.168.3.62:3400/personactivity/control/uploadThemes";
              var options = {};
              $cordovaFileTransfer.upload(url, results[i], options)
                .then(function (result) {
                  //alert(JSON.stringify(result.response));
                  var themeImgId=JSON.stringify(result.response.response);
                  alert(themeImgId);
                  localStorage.setItem("themeImg",results[i]);
                  localStorage.setItem("themeImgId",result.response.contentId);
                  alert("上传成功");
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

    //活动地点
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
    //选定地址
    $scope.doneAddress = function () {
      $scope.address.hide();
      $scope.ActivityData.address = $scope.addressData.address
    };
    $scope.chosenAddress = function (item) {
      $scope.address.hide();
      $scope.ActivityData.address = item.city + " " + item.district + " " + item.name;
      $scope.locationAddress = item.location.lat + "/" + item.location.lng//活动地点经纬度
    };

    //新建活动和编辑活动连接后台
    $scope.Token = localStorage.getItem("tarjeta");
    if (type == 'newEvent') {
      $scope.ActivityText = '创建活动';
      $scope.createNewActivity = function () {
        $scope.ActivityData.startDate = $("#startDate").val();
        $scope.ActivityData.endDate = $("#endDate").val();
        $scope.themeImgId=localStorage.getItem("themeImgId");
        //准备数据提交
        console.log(
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          $scope.themeImgId
        );
        ActivityServer.createActivity(
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          $scope.themeImgId,
          function (data) {
            console.log(data);
            if (data == null || $scope.Token == null) {
              alert("服务器异常！请谅解！")
            }
          }
        );
        //震动一下
        $ionicHistory.goBack();
        $cordovaVibration.vibrate(3000);
        localStorage.removeItem("themeImg");
        localStorage.removeItem("themeImgId");
      };
    } else {
      $scope.ActivityText = '编辑活动';
      $scope.createNewActivity = function () {
        $scope.ActivityData.startDate = $("#startDate").val();
        $scope.ActivityData.endDate = $("#endDate").val();
        //准备数据提交
        console.log(
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          $scope.workEffortId
        );
        ActivityServer.updateActivity(
          $scope.Token,
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          $scope.workEffortId,
          function (data) {
            console.log(data);
            if (data == null || $scope.Token == '') {
              alert("服务器异常！请谅解！")
            }
          }
        );
        //震动一下
        $ionicHistory.goBack();
        $cordovaVibration.vibrate(3000);
      }
    }
  })

  //由我组织,往期活动,消息邀请**********************************************************************************************
  .controller('ActivityList', function ($scope, $location, $rootScope, $stateParams, ActivityServer) {
    //获得token
    var tarjeta = localStorage.getItem("tarjeta");
    //显示缺省图片
    $scope.img = localStorage.getItem("activityImg");
    //通过类型  分别显示不同的数据   由我组织  往期活动  活动邀请
    var type = $stateParams.type;
    if (type == 'finish') {
      $scope.title = '往期活动';
    } else if (type == 'my') {
      //查询我组织的活动列表
      var roleTypeId = 'ACTIVITY_ADMIN';
      ActivityServer.myActivity(tarjeta, roleTypeId, function (data) {
        $scope.myActivtyList = data.partyEventsList;
        console.log("查询我我组织的活动" + "---------" + data.resultMsg)
      });
      $scope.title = '由我组织'
    } else if (type == 'invitation') {
      //查询邀请我的活动列表
      var invitationRoleTypeId = 'ACTIVITY_INVITATION';
      console.log(tarjeta);
      ActivityServer.myActivity(tarjeta, invitationRoleTypeId, function (data) {
        $scope.myActivtyList = data.partyEventsList;
        console.log(data.resultMsg + '返回数据')
      });
      $scope.title = '消息列表'
    } else {
      //还有没想好的
    }
    $scope.type = type;
    $scope.goInfo = function (id, type) {
      $location.path("/app/activityDetails2/" + id + '/' + type);
    };
  })

  //活动详情*************************************************************************************************************
  .controller('ActivityDetails', function ($stateParams, $state, ThemeImage, ionicDatePicker, $scope, ActivityServer,
                                           $rootScope, $ionicPopup, $ionicPopover, $ionicHistory, $location, $ionicModal,
                                           PersonLabel, $timeout, $cordovaLaunchNavigator, $cordovaImagePicker,
                                           $cordovaFileTransfer) {
      //获得token
      var tarjeta = localStorage.getItem("tarjeta");
      //获得App使用者partyId
      var partyId = localStorage.getItem("partyId");
      //显示缺省图片
      $scope.img = localStorage.getItem("activityImg");
      $scope.imgPerson = localStorage.getItem("contactImg");

      //获得活动的详细信息
      $scope.workEffortId = $stateParams.activityId;
      ActivityServer.getActivityDetails(tarjeta, $scope.workEffortId, function (data) {
        //获取需要用到的参数
        $scope.activityList = data.eventDetail[0];
        $scope.themeImgList=data.theme;
        //如果没有图片设置缺省图片
        if($scope.themeImgList==null){
          $scope.themeImgList={};
          $scope.themeImgList.objectInfo=$scope.img
        }
        //获取相应的参数
        $scope.userLoginId = data.userLoginId;
        $scope.partyId = data.partyId;                                //组织者partyId
        $scope.iAmAdmin = data.iAmAdmin;                              //判断是否是组织者
        $scope.createPersonInfoList = data.nickNamesList[0];   //组织者信息
        $scope.participantList = data.partyJoinEventsList;//参与人员
        if(data.nickNamesList[0]){
          $scope.nickNameList = data.nickNamesList[0].nickName;                   //参与人的昵称列表
        }
        $scope.number = $scope.participantList.length;                //参与人数
        $scope.pitcureWallList = data.pictureWallList;                     //照片墙图片
        console.log('活动详情信息返回' + "----------" + data.resultMsg);
      });

      //判断是否设置了活动地址  如果没有隐藏地图信息
      $scope.baidu = true;
      if ($scope.activityList.specialTerms == '' || $scope.activityList.specialTerms == null) {
        $scope.baidu = false
      } else {
        //将经纬度分割开
        var latitude = $scope.activityList.specialTerms.split("/")[0];
        var longitude = $scope.activityList.specialTerms.split("/")[1];
        $scope.longitude = longitude;
        $scope.latitude = latitude;
        //嵌入百度地图
        navigator.geolocation.getCurrentPosition(function (data) {
          var ctrl_nav = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
          });
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(data.coords.longitude, data.coords.latitude);   // 创建点坐标
          //map.centerAndZoom(point, 16);
          //var marker = new BMap.Marker(point);
          //map.addOverlay(marker);   // 将标注添加到地图中
          map.addControl(ctrl_nav);//给地图添加缩放的按钮
          map.enableScrollWheelZoom(true);
          //活动地点的位置
          var activitypoint = new BMap.Point(longitude, latitude);   // 创建点坐标
          map.centerAndZoom(activitypoint, 16);
          var activitymarker = new BMap.Marker(activitypoint);
          map.addOverlay(activitymarker);
          var myLabel = new BMap.Label("活动地点", //为lable填写内容
            {position: activitypoint}); //label的位置
          myLabel.setStyle({ //给label设置样式，任意的CSS都是可以的
            "color": "red", //颜色
            "fontSize": "12px", //字号
            "border": "0", //边
            "height": "10px", //高度
            "width": "20px" //宽
          });
          map.addOverlay(myLabel);

          //var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map,panel: "r-result", autoViewport: true}});
          //driving.search(marker, activitymarker);
        }, function (error) {
          alert("百度地图暂时不可用!!");
          console.log(error);
        }, {timeout: 60000, enableHighAccuracy: true, maximumAge: 75000, coorType: 'bd09ll'});
      }

      //导航
      $scope.launchNavigator = function () {
        navigator.geolocation.getCurrentPosition(function (data) {
          $scope.start = [data.coords.latitude, data.coords.longitude];
        });
        var destination = [$scope.latitude, $scope.longitude];
        $cordovaLaunchNavigator.navigate(destination, $scope.start).then(function () {
          console.log("Navigator launched");
        }, function (err) {
          console.error(err);
        });
      };

      //显示照片墙幻灯片
      $scope.shouBigImage = function (id) {
        $location.path("/app/slide/" + id);
      };

      //显示活动相关菜单（右上。。。
      $ionicPopover.fromTemplateUrl('templates/activity/activityDetails-popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function ($event) {
        $scope.popover.show($event);
      };
      $scope.closePopover = function () {
        $scope.popover.hide();
      };
      //返回
      $scope.goback = function () {
        $state.go("app.activityHome")
      };

      //活动报名
      $scope.activitySignUp = '算我一个';
      // if ($scope.participantList != '' || $scope.participantList != null) {
      //   for (var i = 0; i < $scope.participantList.length; i++) {
      //     if ($scope.participantList[i].partyId == partyId) {
      //       $(function () {
      //         $('#joinActivity').attr("disabled", true);
      //       });
      //       $scope.activitySignUp = '我已加入'
      //     }
      //   }
      // }

      //报名成功
      $scope.showPopup = function (id) {
        var tarjeta = localStorage.getItem("tarjeta");
        console.log($scope.workEffortId + tarjeta);
        ActivityServer.signUp(tarjeta, $scope.workEffortId, function (data) {
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
          myPopup.close(); // 1.5秒后关闭弹窗
        }, 1500);
        //执行一次活动查询刷新活动列表
        var roleTypeId = 'ACTIVITY_MEMBER';
        ActivityServer.myActivity(tarjeta, roleTypeId, function (data) {
          $scope.active = data.partyEventsList;
          console.log("查询我参与的活动" + "---------" + data.resultMsg)
        });
      };

      //进入活动讨论
      $scope.activityDiscuss = function (id) {
        $state.go("app.activityDiscuss", {"activityId": id}, {reload: true});
        $scope.popover.hide();
      };
      //进入活动项
      $scope.activityItem = function (id) {
        $location.path("/app/activityItem/" + id);
        $scope.popover.hide();
      };
      //进入活动账单
      $scope.aboutPayment = function (id) {
        $location.path("/app/activityBill/" + id);
        $scope.popover.hide();
      };

      //判断是否是组织者 界面调整
      $scope.myActivity = false;//我是组织者
      $scope.otherActivity = true;//我是参与者
      $scope.activityBill = false;
      if ($scope.iAmAdmin == 'Y') {
        $scope.myActivity = true;
        $scope.otherActivity = false;
        $scope.activityBill = true;
      }

      //编辑活动
      $scope.editEvent = 'editEvent';
      $scope.editActivty = function (editEvent) {
        $location.path("/app/editActivty/" + $scope.workEffortId + '/' + editEvent);
      };

      //活动参与人员弹出框
      $scope.personmainLists = $scope.participantList;
      $ionicPopover.fromTemplateUrl('templates/activity/activityJoin.html', {
        scope: $scope
      }).then(function (personJoin) {
        $scope.personJoin = personJoin;
      });
      $scope.openPersonJoin = function ($event) {
        $scope.personJoin.show($event);
      };
      $scope.closePersonJoin = function () {
        $scope.personJoin.hide();
      };
      //返回
      $scope.goback = function () {
        $state.go("app.activityHome")
      };

      //活动组织者信息填写    验证活动返回的userLoginId是否是个手机号码，还是我们给的初史号码。如果是电话号码不需要在填写手机号码
      var reg = /^1[34578]\d{9}$/;
      $scope.isLogin = true;
      //alert($scope.userLoginId);
      if (!reg.test($scope.userLoginId)) {
        alert("用户未注册登陆");
        $scope.openModal = function () {
          $scope.NickName.show();
        };
        $scope.closeModal = function () {
          $scope.NickName.hide();
        };
        $scope.addPersonInfo = function () {
          console.log($scope.loginData.nickName + $scope.loginData.mobileNumber + $scope.loginData.captcha + tarjeta + $scope.workEffortId + partyId);
          ActivityServer.userAppRegister(tarjeta, $scope.workEffortId, partyId, $scope.loginData.nickName, $scope.loginData.mobileNumber,
            $scope.loginData.captcha, function (data) {
              localStorage.removeItem("tarjeta");
              localStorage.removeItem("partyId");
              localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
              localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
              localStorage.setItem("userLoginId", data.userLoginId);//设置partyId登陆人
              console.log(data)
            });
          $scope.NickName.hide();
          $scope.taskModal.show();
          ActivityServer.getActivityDetails(localStorage.getItem("tarjeta"), $scope.workEffortId, function (data) {
            console.log("查询活动详情")
          })
        };
      } else {
        $scope.openModal = function () {
          if ($scope.nickNameList != null) {
            alert('已经用户登陆当前用户昵称:' + $scope.nickNameList);
            $scope.taskModal.show();
            $scope.loginData.nickName = $scope.nickNameList;
          } else {
            alert('用户已登陆但没有昵称');
            $scope.NickName.show();
            $scope.isLogin = false;
            $scope.addPersonInfo = function () {
              alert("添加用户的昵称");
              console.log($scope.loginData.nickName + $scope.loginData.mobileNumber + $scope.workEffortId + partyId);
              ActivityServer.createNickName(tarjeta, $scope.workEffortId, partyId, $scope.loginData.nickName)
              $scope.NickName.hide();
              $scope.taskModal.show();
            };
          }
        };
      }
      $scope.loginData = {};
      $ionicModal.fromTemplateUrl('templates/activity/activityNickName.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (NickName) {
        $scope.NickName = NickName;
      });

      //上传图片照片墙
      $scope.images_list = [];

      //活动的图片添加到照片墙中显示
      if ($scope.pitcureWallList.length>0) {
        for (var i = 0; i <$scope.pitcureWallList.length; i++) {
          $scope.images_list.push($scope.pitcureWallList[i])
        }
      }
      $scope.upLoadImage = function () {
        //调用手机相册
        var options = {
          maximumImagesCount: 9,
          width: 800,
          height: 800,
          quality: 100
        };
        alert($scope.workEffortId);
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            for (var i = 0; i < results.length; i++) {
              $scope.images_list.push(results[i]);
              document.addEventListener('deviceready', function () {
                var url = "http://192.168.3.62:3400/personactivity/control/uploadPictureWall?workEffortId=" + $scope.workEffortId;
                var options = {};
                alert("2" + results[i]);
                $cordovaFileTransfer.upload(url, results[i], options)
                  .then(function (result) {
                    //alert(JSON.stringify(result.response));
                    alert("上传成功");
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
        //上传图片到后台
        // ActivityServer.uploadPictureWall($scope.tarjeta,$scope.workEffortId,results[0],function (data) {
        //   console.log(data)
        // })
      };

      //邀请好友参与活动方式
      $scope.shareImgList = ThemeImage.getShareImg();  //显示邀请好友方式图片
      $ionicModal.fromTemplateUrl('templates/activity/shareAvtivity.html', function (modal) {
        $scope.taskModal = modal;
      }, {
        scope: $scope
      });
      $scope.newTask = function () {
        $scope.taskModal.show();
      };
      $scope.closeNewTask = function () {
        $scope.taskModal.hide();
      };

      //选择哪种方式邀请好友
      $scope.chooseWay = function (name, workEffortId, partyId) {
        if (name == '手机通讯录') {
          $state.go("app.activityInvitation", {"workEffortId": workEffortId, "partyId": partyId});
          $scope.taskModal.hide();
        } else if (name == '微信') {
          Wechat.share({
            message: {
              title: '欢迎加入不分梨',
              description: '您的好友 ' + $scope.loginData.nickName + ' ' + '邀请您加入活动: ' + $scope.activityList.workEffortName,
              thumb: 'www/img/theme/bufenli.jpeg',
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/main?workEffortId=' + $scope.workEffortId
              }
            },
            scene: Wechat.Scene.SESSION // share to SESSION
          }, function () {
            alert("Success");
          }, function (reason) {
            alert("Failed: " + reason);
          });
        } else if (name == '朋友圈') {
          alert($scope.workEffortId);
          Wechat.share({
            message: {
              title: '欢迎加入不分梨',
              description: '您的好友 ' + $scope.loginData.nickName + ' ' + '邀请您加入活动: ' + $scope.activityList.workEffortName,
              thumb: 'www/img/theme/bufenli.jpeg',
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
          $state.go("app.activityAddPerson", {"workEffortId": $scope.workEffortId});
          $scope.taskModal.hide();
        }
      }
    }
  )

  //活动照片墙（大图片）***************************************************************************************************
  .controller('slideCrl', function ($scope, $stateParams, Activity, $ionicHistory) {
    var id = $stateParams.activityId;
    //获取活动照片墙图片
    $scope.pictureList = Activity.getActivityInfo(id);
    //返回活动详情
    $scope.goback = function () {
      $ionicHistory.goBack();
    }
  })

  //活动讨论*************************************************************************************************************
  .controller('ActivityDiscuss', function ($scope, $rootScope, $stateParams, ActivityServer, $ionicPopover) {
    var tarjeta = localStorage.getItem("tarjeta");
    var id = $stateParams.activityId;
    $scope.workEffortId = $stateParams.activityId;
    ActivityServer.getActivityDetails(tarjeta, id, function (data) {
      $scope.participantList = data.partyJoinEventsList;
    });
    //活动参与人员弹出框
    $ionicPopover.fromTemplateUrl('templates/activity/activityJoin.html', {
      scope: $scope
    }).then(function (personJoin) {
      $scope.personJoin = personJoin;
    });
    $scope.openPersonJoin = function ($event) {
      $scope.personJoin.show($event);
    };
    $scope.closePersonJoin = function () {
      $scope.personJoin.hide();
    };
    //返回
    $scope.goback = function () {
      $state.go("app.activityHome")
    };
  })

  //活动主题图片界面******************************************************************************************************
  .controller('ThemeImage', function ($scope, $ionicSlideBoxDelegate, ActivityServer,$ionicHistory) {

    //获得主题类型列表
    ActivityServer.queryContentTypeList(function (data) {
      $scope.contectTypeList=data.contentTypeList
    });
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
    ActivityServer.queryThemes($scope.contectTypeList[0].contentTypeId,function (data) {
      $scope.huwaiImgList =data.themesList
    });
    ActivityServer.queryThemes($scope.contectTypeList[1].contentTypeId,function (data) {
      $scope.fimilyImgList =data.themesList
    });
    ActivityServer.queryThemes($scope.contectTypeList[2].contentTypeId,function (data) {
      $scope.partyImgList =data.themesList
    });
    ActivityServer.queryThemes($scope.contectTypeList[3].contentTypeId,function (data) {
      $scope.businessImgList =data.themesList
    });

    //选定组题图片
    $scope.selectThemeImg=function (contentId,img) {
      localStorage.setItem("themeImg",img);
      localStorage.setItem("themeImgId",contentId);
      alert("选择图片成功");
      $ionicHistory.goBack();
    }
  })

  //活动项***************************************************************************************************************
  .controller('ActivityItem', function ($scope, $rootScope, $stateParams, ActivityServer, $ionicPopup, ionicDatePicker) {
    var id = $stateParams.id;
    //获得token
    var tarjeta = localStorage.getItem("tarjeta");
    //获得App使用者partyId
    var partyId = localStorage.getItem("partyId");
    //显示图片
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
        })
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
          mobilePhone.push($scope.selectedList[i].phone + "/" + $scope.selectedList[i].phone)
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
    // alert($scope.workEffortId);
    // 添加投票选项
    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea  style='display: inline-block;width: 41%;resize:none' class='personName' placeholder='昵称'></textarea>" +
        "<textarea style='display: inline-block;width: 41%;resize:none' class='personTel' placeholder='手机号码'></textarea>" +
        "<img src='img/shanchu.jpeg' width=48px height=48px onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><hr>" +
        "");
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
    ActivityServer.findActivityPayment(tarjeta, id, function (data) {
      $scope.billList = data.payList;
      console.log("查询活动列表——————————" + data.resultMsg)
    });
    $scope.addBill = function () {
      $state.go("app.addPersonBill", {workEffortId: id});
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
          console.log("创建活动账单————————" + data.resultMsg)
          $state.go("app.activityBill")
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
