angular.module('activity.controllers', [])

/***********************************************************************************************************************
 * Desc 活动首页
 * Author LX
 * Date 2017-3-3
 * Last modified date  2017-6-5
 * */
  .controller('ActivityHome', function ($scope, ThemeImage, $ionicHistory, $location, ActivityServer, $state, $ionicPopover,
                                        $cordovaBarcodeScanner, $ionicPopup, $ionicModal, Contact, $ionicActionSheet,
                                        $timeout) {

    //准备参数
    $scope.partyId = localStorage.getItem('partyId');
    $scope.ActivityListType = '活动';

    //定义查询活动函数
    $scope.queryActivity = function (roleTypeId) {
      ActivityServer.queryMyEvent(roleTypeId, function (data) {
        $scope.activtyList = data.partyEventsList;
        if ($scope.activtyList) {
          $scope.quantity = $scope.activtyList.length;
        } else {
          $scope.quantity = 0
        }
        console.log("查询我参与的活动:" + data.resultMsg);
        //如果没有活动  页面调整
        if (data.resultMsg == '成功') {
          $scope.ActivityListType = '活动';
        }
      });
    };

    //查询我的活动
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryActivity('ACTIVITY_MEMBER');
    });

    //进入详情页
    $scope.activityDetails = function (workEffortId) {
      $state.go("tab.activityDetails", {'workEffortId': workEffortId})
    };

    //找回历史活动
    $scope.getHistory = function () {
      $state.go("login")
    };

    //退出删除活动
    $scope.deleteActivity = function (id, joinsCount, adminPartyId) {
      if (joinsCount == 1 || adminPartyId != $scope.partyId) {
        ActivityServer.quitActivity(id, function (data) {
          if (data.resultMsg == '退出成功') {
            $scope.queryActivity("ACTIVITY_MEMBER");
          }
        })
      } else {
        $ionicPopup.alert({
          title: '活动中还有其他成员，不可以删除！'
        })
      }
    };

    //隐藏活动
    $scope.hideActivity = function (id) {
      ActivityServer.hideActivity(id, function (data) {
        if (data.resultMsg == '成功') {
          $scope.queryActivity("ACTIVITY_MEMBER");
        }
      })
    };

    //隐藏还原
    $scope.showActivity = function (id) {
      ActivityServer.showHiddenActivity(id, function (data) {
        if (data.resultMsg == '成功') {
          $scope.queryActivity("ACTIVITY_MEMBER");
        }
      })
    };

    //下拉刷新
    $scope.doRefresh = function () {
      $scope.queryActivity("ACTIVITY_MEMBER");
      $scope.ActivityListType = '活动';
      $scope.$broadcast("scroll.refreshComplete");
    };

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
    };

    //活动管理
    $scope.Management = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '由我组织'},
          {text: '隐藏活动列表'},
          {text: '扫一扫'}
        ],
        titleText: '管理活动',
        cancelText: '取消',
        cancel: function () {
          // 这里添加取消代码
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              $scope.queryActivity("ACTIVITY_ADMIN");
              $scope.ActivityListType = '由我组织';
              hideSheet();
              break;
            case 1:
              ActivityServer.queryMyHiddenEvent(function (data) {
                $scope.activtyList = data.partyEventsList;
                if ($scope.activtyList) {
                  $scope.quantity = $scope.activtyList.length;
                } else {
                  $scope.quantity = 0
                }
                console.log("查询我参与的活动:" + data.resultMsg);
              });
              $scope.ActivityListType = '隐藏的活动';
              hideSheet();
              break;
            case 2:
              hideSheet();
              //扫描加入活动
              document.addEventListener("deviceready", function () {
                $cordovaBarcodeScanner
                  .scan()
                  .then(function (barcodeData) {
                    if (barcodeData.text) {
                      //$state.go("tab.activityDetails", {"workEffortId": barcodeData.text});
                      var confirmPopup = $ionicPopup.confirm({
                        title: '报名活动',
                        template: '是否要报名该活动',

                      });
                      confirmPopup.then(function (res) {
                        if (res) {
                          ActivityServer.signUp(barcodeData.text, function (data) {
                            if (data.resultMsg == "成功") {
                              $scope.queryActivity('ACTIVITY_MEMBER');
                            }
                          });
                        } else {
                          console.log('You are not sure');
                        }
                      });
                    }
                  }, function (error) {
                    // An error occurred
                  });
              }, false);
              break;
            default:
              alert('请选择')
          }
        }
      });
      $timeout(function () {

      }, 2000);
    };
  })

  /*********************************************************************************************************************
   * Desc 活动消息通知
   * Author LX
   * Date 2017-3-3
   * Last modified date  2017-6-5
   * */
  // .controller('ActivityNotice', function ($scope, ActivityServer, $location) {
  //
  //   //查询活动消息列表
  //   ActivityServer.querySystemInfoList(function (data) {
  //     console.log('查询我的消息列表————————' + data);
  //     $scope.noticeList = data.systemInfos;
  //     if ($scope.noticeList.length != 0) {
  //       $scope.moreInfoUrl = data.systemInfos[0].moreInfoUrl;
  //     }
  //   });
  //
  //   $scope.$on('$ionicView.beforeEnter', function () {
  //     ActivityServer.querySystemInfoList(function (data) {
  //       console.log('查询我的消息列表————————' + data);
  //       $scope.noticeList = data.systemInfos;
  //       if ($scope.noticeList.length != 0) {
  //         $scope.moreInfoUrl = data.systemInfos[0].moreInfoUrl;
  //       }
  //     });
  //   });
  //
  //   //跳转到消息相关界面
  //   $scope.goInfo = function () {
  //     $location.path($scope.moreInfoUrl);
  //   };
  //
  //   //删除消息
  //   $scope.deleteNotice = function (id) {
  //
  //     ActivityServer.deleteSystemInfoNote(id, function (data) {
  //       console.log('删除消息:' + data)
  //     });
  //
  //     ActivityServer.querySystemInfoList(function (data) {
  //       $scope.noticeList = data.systemInfos;
  //       $scope.moreInfoUrl = data.systemInfos[0].moreInfoUrl;  //如果没有投票
  //       $scope.vote_empty = false;
  //     });
  //   }
  // })

  /*********************************************************************************************************************
   * Desc 新建活动
   * Author LX
   * Date 2017-3-3
   * Last modified date  2017-6-5
   * */
  .controller('NewActivity', function ($scope, $state, $ionicModal, Contact, $ionicHistory, $cordovaContacts,
                                       $rootScope, $stateParams, $cordovaCamera, $cordovaImagePicker, ActivityServer,
                                       $ionicPopup, $location, ThemeImage, ionicDatePicker, $cordovaFileTransfer,
                                       ionicTimePicker, $cordovaDatePicker, $cordovaVibration, $cordovaProgress,
                                       SelectDate, $timeout, $ionicLoading) {

    //参数准备
    $scope.ActivityData = {};
    $scope.workEffortId = $stateParams.id;
    $scope.partyId = localStorage.getItem("partyId");
    $scope.ActivityData.workEffortName = '';

    //选择活动开始时间
    $scope.startDate = function () {
      SelectDate.nativeDate(function (data) {
        $scope.ActivityData.startDate = data
      })
    };

    //选择活动结束时间
    $scope.endDate = function () {
      SelectDate.nativeDate(function (data) {
        var end = new Date(data.replace(/-/g, '/'));
        var endtimestamp = Date.parse(end);
        endtimestamp = endtimestamp / 1000;
        if ($scope.ActivityData.startDate == undefined) {
          $ionicPopup.alert({
            title: '时间错误',
            template: "结束时间应在开始时间之后"
          });
          return false
        }
        var start = new Date($scope.ActivityData.startDate.replace(/-/g, '/'));
        var starttimestamp = Date.parse(start);
        starttimestamp = starttimestamp / 1000;

        if (endtimestamp - starttimestamp > 0) {
          $scope.ActivityData.endDate = data
        } else {
          $ionicPopup.alert({
            title: '时间错误',
            template: "结束时间应在开始时间之后"
          })
        }
      })
    };

    //选择插入图片方式
    // $scope.selectImg = function () {
    //   $scope.data = {};
    //   var myPopup = $ionicPopup.show({
    //     template: '<button class="button" style="width:100%;background-color: mintcream;" ng-click="selectPhoto(pictureSource.SAVEDPHOTOALBUM)">相册</button><br/>' +
    //     '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="getPhoto()">拍照</button>' +
    //     '<button class="button" style="width: 100%;background-color: cadetblue;margin-top: 2px;" ng-click="closeMyPopup()">取消</button>',
    //     title: '添加方式',
    //     scope: $scope
    //   });
    //   myPopup.then(function (res) {
    //     console.log('Tapped!', res);
    //   });
    //   $scope.statusPopup = myPopup;
    // };
    //
    // //关闭选择框
    // $scope.closeMyPopup = function () {
    //   $scope.statusPopup.close();
    // };

    //上传主题图片（手机相册）
    // $scope.selectPhoto = function (source) {
    //   var options = {
    //     maximumImagesCount: 1,
    //     width: 800,
    //     height: 800,
    //     quality: 100
    //   };
    //   $cordovaImagePicker.getPictures(options)
    //     .then(function (results) {
    //       console.log("出参数：" + results);
    //       var image = document.getElementById('myImage');
    //       for (var i = 0; i < results.length; i++) {
    //         console.log('Image URI: ' + results[i]);
    //         image.src = results[i];
    //         image.style.height = '200px';
    //         image.style.width = '330px';
    //         $cordovaProgress.showSimpleWithLabel(true, "上传中");
    //         document.addEventListener('deviceready', function () {
    //           var url = $rootScope.activityInterfaceUrl + "uploadThemes";
    //           var options = {};
    //           $cordovaFileTransfer.upload(url, results[i], options)
    //             .then(function (result) {
    //               var ImgId = JSON.stringify(result.response);
    //               $scope.themeImgId = ImgId.substring(18, 23);
    //               //alert($scope.themeImgId);
    //               localStorage.setItem("themeImg", results[i]);
    //               $cordovaProgress.hide();
    //               //alert(result.message);
    //             }, function (err) {
    //               //alert(JSON.stringify(err));
    //               //alert(err.message);
    //               alert("上传失败");
    //             }, function (progress) {
    //               // constant progress updates
    //             });
    //         }, false);
    //       }
    //     }, function (error) {
    //       // error getting photos
    //     });
    //   $scope.statusPopup.close();
    // };

    //拍照
    // $scope.getPhoto = function () {
    //   document.addEventListener("deviceready", function () {
    //     var options = {
    //       quality: 50,
    //       destinationType: Camera.DestinationType.DATA_URL,
    //       sourceType: Camera.PictureSourceType.CAMERA,
    //       allowEdit: true,
    //       encodingType: Camera.EncodingType.JPEG,
    //       targetWidth: 100,
    //       targetHeight: 100,
    //       popoverOptions: CameraPopoverOptions,
    //       saveToPhotoAlbum: false,
    //       correctOrientation: true
    //     };
    //     $cordovaCamera.getPicture(options).then(function (imageData) {
    //       var image = document.getElementById('myImage');
    //       image.src = "data:image/jpeg;base64," + imageData;
    //       image.style.height = '200px';
    //       image.style.width = '330px';
    //       $cordovaProgress.showSimpleWithLabel(true, "上传中");
    //       document.addEventListener('deviceready', function () {
    //         var url = $rootScope.activityInterfaceUrl + "uploadThemes";
    //         var options = {};
    //         $cordovaFileTransfer.upload(url, image.src, options)
    //           .then(function (result) {
    //             var ImgId = JSON.stringify(result.response);
    //             $scope.themeImgId = ImgId.substring(18, 23);
    //             //alert($scope.themeImgId);
    //             localStorage.setItem("themeImg", imageData);
    //             $cordovaProgress.hide();
    //             //alert(result.message);
    //           }, function (err) {
    //             //alert(JSON.stringify(err));
    //             //alert(err.message);
    //             alert("上传失败");
    //           }, function (progress) {
    //             // constant progress updates
    //           });
    //       }, false);
    //     }, function (err) {
    //       // error
    //     });
    //     $scope.statusPopup.close();
    //   }, false);
    // };

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

    //通过关键字获取地址
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
      $scope.locationAddress = item.location.lat + "/" + item.location.lng;
    };

    //创建活动连接后台
    $scope.createNewActivity = function () {
      $ionicLoading.show({
        template: '创建中...'
      });
      if ($scope.ActivityData.workEffortName == '') {
        $ionicLoading.hide();
        var validate = $ionicPopup.show({
          title: '活动名称不能为空'
        });
        $timeout(function () {
          validate.close()
        }, 2000);
      }
      $timeout(function () {
        if ($scope.themeImgId == null) {
          $scope.themeImgId = localStorage.getItem("themeImgId")
        }
        ActivityServer.createActivity(
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.locationAddress,
          $scope.themeImgId,
          $scope.groupId,
          $scope.ActivityData.funding,
          function (data) {
            if (data.resultMsg == '成功') {
              $ionicLoading.hide();
              $scope.ActivityData.workEffortName = '';
              $scope.ActivityData.startDate = '';
              $scope.ActivityData.endDate = '';
              $scope.ActivityData.address = '';
              $scope.ActivityData.information = '';
            }
            var id = data.workEffortId;
            $location.path("/tab/activityDetails/" + id);
            $scope.modal.hide();
          }
        );
      }, 500);
    };

    //取消
    $scope.cannel = function () {
      $scope.modal.hide();
    }
  })

  /*********************************************************************************************************************
   * Desc 活动详情
   * Author LX
   * Date 2017-3-3
   * Last modified date  2017-6-5
   * */
  .controller('ActivityDetails', function ($stateParams, $state, ThemeImage, ionicDatePicker, $scope, ActivityServer,
                                           $rootScope, $ionicPopup, $ionicPopover, $ionicHistory, $location, $ionicModal,
                                           $timeout, $cordovaLaunchNavigator, $cordovaImagePicker, $cordovaFileTransfer,
                                           $ionicLoading, $cordovaProgress, Login, $cordovaClipboard, $cordovaGeolocation,
<<<<<<< HEAD
                                           Contact, SelectDate, $ionicActionSheet,$cordovaSms,$window) {
=======
                                           Contact, SelectDate, $ionicActionSheet, $cordovaSms, $window) {
>>>>>>> jlx
    //准备参数
    $scope.partyId = localStorage.getItem("partyId");
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.adminOpenId = localStorage.getItem('adminOpenId');
    $scope.ActivityData = {};

    //判断是否存在缓存数据
    var activityDetailsData = jQuery.parseJSON(localStorage.getItem("activityDetailsData" + $scope.workEffortId));
    //获取需要用到的参数
    if (activityDetailsData != null) {
      $scope.activityList = activityDetailsData.eventDetail;                       //活动基本信息
      $scope.themeImgList = activityDetailsData.theme;                             //活动组题图片
      $scope.createPersonInfoList = activityDetailsData.createPersonInfoList[0];   //组织者信息
      $scope.pitcureWallList = activityDetailsData.pictureWallList.reverse();      //照片墙图片
      $scope.groupMemberList = activityDetailsData.partyJoinEventsList;            //参与人员、
      $scope.commEventCount = activityDetailsData.commEventCount;                  //评论数
      $scope.groupAcount = $scope.groupMemberList.length;
      $scope.iAmAdmin = activityDetailsData.iAmAdmin;
      $scope.commList = activityDetailsData.commList;
    }

    //刷新活动详情数据
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryActivityDetails()
    });

    //功能导航栏
    $scope.activityTabsImg = ThemeImage.getActivityImgTabs();
    $scope.goNavigation = function (name) {
      if (name == '账单') {
        $state.go('tab.activityBill', {'workEffortId': $scope.workEffortId})
      } else if (name == '投票') {
        $state.go('tab.voteList', {'workEffortId': $scope.workEffortId})
      } else if (name == '日程') {
        $location.path("/tab/activityItem/" + $scope.workEffortId);
      } else if (name == '更多') {
        $scope.moreFunctionality()
      } else if (name == '事项') {
        $state.go('tab.activityMatter', {'workEffortId': $scope.workEffortId})
      }
    };

    // //修改活动状态
    // $scope.updateEventStatus = function () {
    //   var currentStatusId = "CAL_CONFIRMED";
    //   ActivityServer.updateEventStatus($scope.workEffortId, currentStatusId, function (data) {
    //     console.log(data)
    //   })
    // };

    //查询活动详情
    $scope.queryActivityDetails = function () {
      ActivityServer.getActivityDetails($scope.workEffortId, function (data) {
        console.log("查询活动详情:" + data.resultMsg);
        //获取需要用到的参数
        $scope.activityList = data.eventDetail;                       //活动基本信息
        $scope.themeImgList = data.theme;                             //活动组题图片
        $scope.createPersonInfoList = data.createPersonInfoList[0];   //组织者信息
        $scope.pitcureWallList = data.pictureWallList;      //照片墙图片
        $scope.groupMemberList = data.partyJoinEventsList;            //参与人员、
        $scope.commEventCount = data.commEventCount;                  //评论数
        $scope.groupAcount = $scope.groupMemberList.length;
        $scope.iAmAdmin = data.iAmAdmin;
        $scope.commList = data.commList;
        $scope.ActivityData.funding = $scope.activityList.yuSuan;
        localStorage.setItem('activityData' + $scope.workEffortId, JSON.stringify(data.eventDetail)); //活动数据保存到本地
        localStorage.setItem('activityDetailsData' + $scope.workEffortId, JSON.stringify(data));
        //活动地址
        if ($scope.activityList.specialTerms) {
          $scope.longitude = $scope.activityList.specialTerms.split("/")[0];//将经纬度分割开
          $scope.latitude = $scope.activityList.specialTerms.split("/")[1];
        }
        $scope.ActivityData.address = $scope.activityList.locationDesc;

        //照片墙相片
        $scope.images_list = [];
        if ($scope.pitcureWallList.length != 0) {
          for (var i = 0; i < $scope.pitcureWallList.length; i++) {
            $scope.images_list.push($scope.pitcureWallList[i])
          }
        }

        //如果用户不是组织者不可以邀请好友
        if ($scope.groupMemberList[0].partyId != $scope.partyId) {
          $('#invent').attr('disabled', true);
        }

        //日期格式转换
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
          $scope.ActivityData.startDate = data.eventDetail.actualStartDate;
        } else {
          var activityStartDate = new Date(data.eventDetail.actualStartDate);
          $scope.ActivityData.startDate = activityStartDate.Format("yyyy-MM-dd hh:mm:ss");
        }
        if (typeof data.eventDetail.estimatedCompletionDate == 'string') {
          $scope.ActivityData.endDate = data.eventDetail.estimatedCompletionDate;
        } else {
          var activityEndDate = new Date(data.eventDetail.estimatedCompletionDate);
          $scope.ActivityData.endDate = activityEndDate.Format("yyyy-MM-dd hh:mm:ss");
        }
      });
    };

    //更多功能
    $scope.moreFunctionality = function () {
      // 显示上拉菜单
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '联系组织者'},
          {text: '位置路线'},
          {text: '文本预览'}
        ],
        destructiveText: '举报',
        cancelText: '取消',
        cancel: function () {
          // 这里添加取消代码
        },

        //举报活动
        destructiveButtonClicked: function () {
          hideSheet();
          $scope.Review = {};
          var myPopup = $ionicPopup.show({
            template: '<textarea  rows="3" ng-model="Review.reviewText">',
            title: '请输入你的举报内容',
            scope: $scope,
            buttons: [
              {text: '取消'},
              {
                text: '<b>提交</b>',
                type: 'button-positive',
                onTap: function (e) {
                  if (!$scope.Review.reviewText) {
                    e.preventDefault();
                  } else {
                    ActivityServer.createActivityReview($scope.workEffortId, $scope.Review.reviewText, null, function (data) {
                      console.log("举报活动:" + data.resultMsg);
                      if (data.resultMsg == '举报成功!') {
                        var myPopup = $ionicPopup.show({
                          template: '',
                          title: '举报成功',
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
                  }
                }
              }
            ]
          });
          myPopup.then(function (res) {
            console.log('Tapped!', res);
          });
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              hideSheet();
              $scope.callFriend();
              break;
            case 1:
              hideSheet();
              $scope.launchNavigator();
              break;
            case 2:
              //查询文本信息
              hideSheet();
              ActivityServer.printActivityInfo($scope.workEffortId, function (data) {
                if (data.activityInfo) {
                  $cordovaClipboard
                    .copy(data.activityInfo)
                    .then(function () {
                      // success
                      $ionicPopup.alert({
                        title: '复制成功',
                        template: "可以把活动文本信息发送给好友"
                      });
                    }, function () {
                      // error
                    });
                }
              });
              break;
            default:
              alert('请选择')
          }
        }
      });
    };

    //活动位置导航（调用本机导航）
    $scope.launchNavigator = function () {
      if ($scope.activityList.specialTerms == null) {
        var myPopup = $ionicPopup.show({
          template: '',
          title: '活动具体地址还没有确定！',
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
      } else {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.start = [lat, long];
            $scope.destination = [$scope.longitude, $scope.latitude];
            console.log("开始位置经纬度:" + $scope.start);
            console.log("目标位置经纬度:" + $scope.destination);
            $cordovaLaunchNavigator.navigate($scope.destination, $scope.start).then(function () {
              console.log("导航中。。。");
            }, function (err) {
              console.error(err);
            });
          }, function (err) {
            // error
          });
      }
    };

    //联系组织者
    $scope.callFriend = function () {
      $scope.contact = {};
      var myPopup = $ionicPopup.show({
        template: '<button class="button" style="width:100%;background-color: mintcream;" ng-click="callUp()">打电话</button><br/>' +
        '<button class="button" style="width: 100%;background-color: mintcream;margin-top: 2px;" ng-click="sendMessage()" >发短信</button>' +
        '<button class="button" style="width: 100%;background-color: cadetblue;margin-top: 2px;" ng-click="closeMyPopup()">取消</button>',
        title: '添加方式',
        scope: $scope
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
      $scope.contact = myPopup;

      //关闭选择框
      $scope.closeMyPopup = function () {
        $scope.contact.close();
      };

      //打电话
      $scope.callUp = function () {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($scope.groupMemberList[0].contactNumber))) {
          var myPopup = $ionicPopup.show({
            template: '',
            title: '组织者没有留下联系方式',
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
          return false;
        } else {
          $window.location.href = "tel:" + $scope.groupMemberList[0].contactNumber;
          return false;
        }
      };

      //发短信
      $scope.sendMessage = function () {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($scope.groupMemberList[0].contactNumber))) {
          var myPopup = $ionicPopup.show({
            template: '',
            title: '组织者没有留下联系方式',
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
          return false;
        } else {
          var options = {
            replaceLineBreaks: false,
            android: {
              intent: 'INTENT'
            }
          };
          document.addEventListener("deviceready", function () {
            $cordovaSms
<<<<<<< HEAD
              .send($scope.groupMemberList[0].contactNumber,'',options)
=======
              .send($scope.groupMemberList[0].contactNumber, '', options)
>>>>>>> jlx
              .then(function () {
                // Success! SMS was sent
              }, function (error) {
                // An error occurred
              });
          });
        }
      };
    };

    /*活动详情编辑活动********************************************************/
    //更新主题图片
    // $scope.updateActivityPhoto = function () {
    //   var options = {
    //     maximumImagesCount: 1,
    //     width: 200,
    //     height: 400,
    //     quality: 100
    //   };
    //   $cordovaImagePicker.getPictures(options)
    //     .then(function (results) {
    //       var image = document.getElementById('activityImage');
    //       for (var i = 0; i < results.length; i++) {
    //         console.log('Image URI: ' + results[i]);//返回参数是图片地址 results 是一个数组
    //         image.src = results[i];
    //         image.style.height = '106px';
    //         image.style.width = '106px';
    //         $cordovaProgress.showSimpleWithLabel(true, "上传中");
    //         document.addEventListener('deviceready', function () {
    //           var url = $rootScope.activityInterfaceUrl + "updateActivityThemes?workEffortId=" + $scope.workEffortId;
    //           var options = {};
    //           $cordovaFileTransfer.upload(url, results[i], options)
    //             .then(function (result) {
    //               var ImgId = JSON.stringify(result.response);
    //               $scope.themeImgId = ImgId.substring(18, 23);
    //               //alert($scope.themeImgId);
    //               localStorage.setItem("themeImg", results[i]);
    //               $cordovaProgress.hide();
    //               //alert(result.message);
    //             }, function (err) {
    //               //alert(JSON.stringify(err));
    //               //alert(err.message);
    //               alert("上传失败");
    //             }, function (progress) {
    //               // constant progress updates
    //             });
    //         }, false);
    //       }
    //     }, function (error) {
    //       // error getting photos
    //     });
    // };

    //编辑活动开始时间
    $scope.startDate = function () {
      SelectDate.nativeDate(function (data) {
        $scope.ActivityData.startDate = data
      })
    };

    //编辑活动结束时间
    $scope.endDate = function () {
      SelectDate.nativeDate(function (data) {
        var end = new Date(data.replace(/-/g, '/'));
        var endtimestamp = Date.parse(end);
        endtimestamp = endtimestamp / 1000;
        if ($scope.ActivityData.startDate == undefined) {
          $ionicPopup.alert({
            title: '时间错误',
            template: "结束时间应在开始时间之后"
          });
          return false
        }
        var start = new Date($scope.ActivityData.startDate.replace(/-/g, '/'));
        var starttimestamp = Date.parse(start);
        starttimestamp = starttimestamp / 1000;

        if (endtimestamp - starttimestamp > 0) {
          $scope.ActivityData.endDate = data
        } else {
          $ionicPopup.alert({
            title: '时间错误',
            template: "结束时间应在开始时间之后"
          })
        }
      })
    };

    //地址选择模态框
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

    //编辑活动地址
    $scope.addressData = {};
    var city_limit = false;
    var output = 'json';
    var ak = 'z89D54HRzvzF8jobhBktAbqRIKue8gQN';
    $scope.getAddressInfo = function () {
      ActivityServer.currentAddress(ak).success(function (data) {
        $scope.region = data.content.address
      });
      ActivityServer.selectAddress($scope.addressData.address, $scope.region, city_limit, output, ak).success(function (data) {
        $scope.addressInfoList = data.result;
      })
    };
    $scope.doneAddress = function () {
      $scope.address.hide();
      $scope.activityList.specialTerms = $scope.addressData.address
    };
    $scope.chosenAddress = function (item) {
      $scope.address.hide();
      $scope.ActivityData.address = item.city + " " + item.district + " " + item.name;
      $scope.activityList.specialTerms = item.location.lat + "/" + item.location.lng;//活动地点经纬度
    };

    //编辑活动模态框
    $ionicModal.fromTemplateUrl('templates/activity/editActivityModle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (editActivity) {
      $scope.editActivity = editActivity;
    });
    $scope.closeEditModal = function () {
      $scope.editActivity.hide();
    };

    $scope.openEditModal = function () {
      $scope.editActivity.show();
      $scope.ActivityData.workEffortName = $scope.activityList.workEffortName;
      $scope.ActivityData.information = $scope.activityList.description
    };

    //编辑活动连接后台
    $scope.editEvent = function () {
      $ionicLoading.show({
        template: '编辑中...'
      });
      if ($scope.ActivityData.workEffortName == '') {
        $ionicLoading.hide();
        var validate = $ionicPopup.show({
          title: '活动名称不能为空'
        });
        $timeout(function () {
          validate.close()
        }, 2000);
      }
      $timeout(function () {
        if ($scope.themeImgId == null) {
          $scope.themeImgId = localStorage.getItem("themeImgId")
        }
        if ($scope.ActivityData.startDate == '开始时间待定')$scope.ActivityData.startDate = '';
        if ($scope.ActivityData.endDate == '结束时间待定')$scope.ActivityData.endDate = '';
        ActivityServer.updateActivity(
          $scope.ActivityData.workEffortName,
          $scope.ActivityData.startDate,
          $scope.ActivityData.endDate,
          $scope.ActivityData.address,
          $scope.ActivityData.information,
          $scope.activityList.specialTerms,
          $scope.workEffortId,
          $scope.themeImgId,
          $scope.groupId,
          $scope.ActivityData.funding,
          function (data) {
            if (data.resultMsg == '成功') {
              $ionicLoading.hide();
              $scope.editActivity.hide();
              $scope.queryActivityDetails();
            }
          }
        );
      }, 500);
    };

    //进入活动讨论
    $scope.activityDiscuss = function (communicationEventId, workEffortId) {
      $state.go("tab.activityDiscuss", {
        "communicationEventId": communicationEventId,
        'workEffortId': workEffortId
      }, {reload: false});
    };

    //是否需要审批
    // $scope.approveState = {};
    // $scope.approve = function () {
    //   if ($scope.approveState.now == true) {
    //     ActivityServer.activityApproval($scope.workEffortId, 'Y', function (data) {
    //       console.log(data)
    //     })
    //   } else {
    //     ActivityServer.activityApproval($scope.workEffortId, 'N', function (data) {
    //       console.log(data)
    //     })
    //   }
    // };

    //活动报名
    $scope.showPopup = function () {
      ActivityServer.signUp($scope.workEffortId, function (data) {
        if (data.resultMsg) {
          ActivityServer.getActivityDetails($scope.workEffortId, function (data) {
            $scope.groupMemberList = data.partyJoinEventsList;            //参与人员、
            $scope.activityDetailsFootButton = '已报名';
          });
        }
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
    };

    //照片墙幻灯片
    $scope.shouBigImage = function (index) {
      if ((index + 1) == $scope.images_list.length) {
        $scope.upLoadImage();
      } else {
        $location.path("/tab/slide/" + $scope.workEffortId + '/' + index);
        $state.go('tab.slide', {workEffortId: $scope.workEffortId, index: index})
      }
    };

    //照片墙上传图片
    $scope.upLoadImage = function () {
      //调用手机相册
      var options = {
        maximumImagesCount: 9,
        width: 800,
        height: 800,
        quality: 100
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            $scope.images_list.unshift({"objectInfo": results[i]});
            $cordovaProgress.showBarWithLabel(false, results.length * 10000, "上传中");
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
          // $timeout(function () {
          //   $scope.queryActivityDetails()
          // }, results.length * 1300);
        }, function (error) {
          // error getting photos
        });
    };

    //底部foot－bar功能
    $scope.InviteModal = function (activityDetailsFootButton) {
      switch (activityDetailsFootButton) {
        case '邀请':
          $scope.taskModal.show();
          break;
        case '报名':
          $scope.showPopup();
          break;
        default:
          alert('请选择')
      }
    };

    //活动参与人列表
    $scope.getPersonInfo = function () {
      $state.go('tab.activityParticipant', {workEffortId: $scope.workEffortId})
    };

    //邀请好友参与活动方式弹出框
    $scope.shareImgList = ThemeImage.getShareImg();  //显示邀请好友方式图片
    $ionicModal.fromTemplateUrl('templates/activity/shareAvtivity.html', function (modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope
    });
    $scope.closeNewTask = function () {
      $scope.taskModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.taskModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });

    //其他邀请方式
    $scope.other = false;
    $scope.otherShare = function () {
      $scope.other = true;
    }
  })

  /*********************************************************************************************************************
   * Desc 活动参与人
   * Author LX
   * Date 2017-6-26
   * */
  .controller('activityParticipant', function ($scope, ActivityServer, $stateParams, $ionicPopup, operateArray) {
    //准备参数
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.partyId = localStorage.getItem('partyId');

    //定义查询服务
    $scope.queryActivityMembers = function () {
      ActivityServer.queryActivityAdminsAndMembers($scope.workEffortId, function (data) {
<<<<<<< HEAD
        if(data.resultMsg=='成功'){
=======
        if (data.resultMsg == '成功') {
>>>>>>> jlx
          $scope.activityParticipantList = data.activityMembersList;
          $scope.adminList = data.adminList;

          //判断是否是组织者
          operateArray.InArray($scope.partyId, $scope.adminList, function (data) {
            $scope.isActivityAdmin = data;
          });
        }
      });
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryActivityMembers()
    });

    //活动踢人
    $scope.removeActivityParty = function (id) {
      var confirmPopup = $ionicPopup.confirm({
        title: '活动踢人',
        template: '您确定要踢掉此人？',
        cancelText: "取消",
        okText: '确定'
      });
      confirmPopup.then(function (res) {
        if (res) {
          ActivityServer.removeActivityParty($scope.workEffortId, id, function (data) {
            console.log(data);
            if (data.resultMsg == '退出成功') {
              $scope.queryActivityMembers()
            }
          })
        } else {
          console.log('You are not sure');
        }
      });
    };

    //活动权限授予
    $scope.grantActivityAdminRole = function (partyIdTo) {
      var confirmPopup = $ionicPopup.confirm({
        title: '权限授予',
        template: '授予后他将与您有相同的权限，管理活动！',
        cancelText: "取消",
        okText: '确定'
      });
      confirmPopup.then(function (res) {
        if (res) {
          ActivityServer.grantActivityAdminRole($scope.workEffortId, partyIdTo, function (data) {
            console.log(data);
            if (data.resultMsg == '成功') {
              $ionicPopup.alert({
                title: '授权成功'
              });
              $scope.queryActivityMembers()
            }
          })
        } else {
          console.log('You are not sure');
        }
      });
    };
  })

  /*********************************************************************************************************************
   * Desc 活动邀请
   * Author LX
   * Date 2017-6-6
   * */
  .controller('SharingActivity', function ($scope, $stateParams, Contact, $state, Login, $ionicPopup, $cordovaSms,
                                           $ionicPopover, ActivityServer, $cordovaClipboard, $ionicLoading) {

    //修改用户昵称
    $scope.updateUserName = function () {
      Contact.updatePersonInfo($scope.originator.nickName, null, function (data) {
        console.log('修改用户昵称' + data)
      })
    };

    //使用微信信息
    $scope.userWeixinInfo = function () {
      $ionicLoading.show({
        template: '交互中...'
      });
      $scope.scope = "snsapi_userinfo";
      Wechat.auth($scope.scope, function (response) {
        console.log(JSON.stringify(response) + "微信返回值");
        console.log(response.code + '///' + $scope.partyId);
        Login.userWeChatAppLogin(response.code, $scope.partyId, function (data) {
          console.log(data.resultMsg);
          if (data.resultMsg === 'PE平台登录成功') {
            $scope.queryActivityDetails();
            $scope.$apply();
            $ionicLoading.hide()
          }
        });
      }, function (reason) {
        //alert("Failed: " + reason);
        $ionicLoading.hide()
      });
    };

    //我的联系人弹出框
    $ionicPopover.fromTemplateUrl('templates/contact/contactModle.html', {
      scope: $scope
    }).then(function (contactApp) {
      $scope.contactApp = contactApp;
    });
    $scope.openContact = function () {
      $scope.contactApp.show();
    };
    $scope.closeContact = function () {
      $scope.contactApp.hide();
    };

    //选择哪种方式邀请好友
    $scope.chooseWay = function (name, workEffortId) {
      if ($scope.createPersonInfoList.firstName == '' || $scope.createPersonInfoList.firstName == null) {
        $ionicPopup.alert({
          title: '昵称不能为空',
          template: "填写您的昵称，以便好友加入活动"
        });
      } else {
        if (name == '短信') {
          var options = {
            replaceLineBreaks: false,
            android: {
              intent: 'INTENT'
            }
          };
          document.addEventListener("deviceready", function () {
            $cordovaSms
              .send('', 'http://www.vivafoo.com:3400/pewebview/control/otherView?workEffortId=' + $scope.workEffortId, options)
              .then(function () {
                // Success! SMS was sent
              }, function (error) {
                // An error occurred
              });
          });
        } else if (name == '微信') {
          console.log($scope.adminOpenId + '绑定的微信OPENID');
          Wechat.share({
            message: {
              title: $scope.createPersonInfoList.firstName + '邀请您加入活动: ' + $scope.activityList.workEffortName,
              description: $scope.activityList.description,
              thumb: 'www/img/shareActivity/来吧.jpeg',
              media: {
                type: Wechat.Type.WEBPAGE,
                webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/main?workEffortId=' + $scope.workEffortId + "&adminOpenId=" + $scope.adminOpenId,
              }
            },
            scene: Wechat.Scene.SESSION // share to SESSION
          }, function () {
            //alert("Success");
          }, function (reason) {
            //alert("Failed: " + reason);
          });
        } else if (name == '朋友圈') {
          Wechat.share({
            message: {
              title: $scope.createPersonInfoList.firstName + '邀请您加入活动: ' + $scope.activityList.workEffortName,
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
          $state.go("tab.activityAppContact");
          $scope.taskModal.hide();
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

  /*********************************************************************************************************************
   * Desc 照片墙
   * Author LX
   * Date 2017-3-3
   * */
  .controller('slideCrl', function ($scope, $stateParams, $ionicHistory, ActivityServer, $ionicActionSheet, $location,
                                    $ionicSlideBoxDelegate, $ionicPopup, $ionicScrollDelegate, $timeout) {

    //准备参数
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.myActiveSlide = $stateParams.index;
    $scope.partyId = localStorage.getItem("partyId");
    var activityData = localStorage.getItem("activityData" + $scope.workEffortId);
    $scope.workEffortName = jQuery.parseJSON(activityData).workEffortName;

    //判断如果选择的是第一张相片
    if ($scope.myActiveSlide == 0) {
      $scope.imgIndex = 0;
    } else {
      $scope.imgIndex = $scope.myActiveSlide;
    }

    //滚动框每一张相片的宽度
    $(function () {
      $scope.singleImgWidth = $('#act-img .row').css("width").substr(0, 3) / 5 - 2
    });

    //选择橡相片
    $scope.chooseImg = function (index) {
      if (index < $scope.pictureList.length - 4) {
        $scope.slideChanged(index)
      } else {
        console.log(index);
        $ionicSlideBoxDelegate.$getByHandle('mySlide').slide(index, true);
      }
    };

    //滑动大图片
    $scope.slideChanged = function (index) {
      $scope.imgIndex = index;
      $scope.acountPraiseCount = $scope.count[$scope.imgIndex].praiseCount;
      $scope.PraiseList = $scope.count[$scope.imgIndex].praiseList;
      if (index < $scope.pictureList.length - 4) {
        $ionicScrollDelegate.$getByHandle('myScroll').scrollTo(index * $scope.singleImgWidth, 0)
      }
    };

    //滑动小图片
    $scope.scrollSmallToTop = function () {
      var scrollPosition = $ionicScrollDelegate.$getByHandle('myScroll').getScrollPosition().left / $scope.singleImgWidth;
      // console.log('活动框底部' + $ionicScrollDelegate.$getByHandle('myScroll').getScrollPosition().left);
      if (scrollPosition.toFixed(0) < $scope.pictureList.length && scrollPosition.toFixed(0) > 0) {
        $ionicSlideBoxDelegate.$getByHandle('mySlide').slide(scrollPosition.toFixed(0));
      }
    };

    //获取活动照片墙图片
    $scope.viewSize = '999';
    $scope.ACTIVITY_PICTURE = 'ACTIVITY_PICTURE';
    ActivityServer.queryMyEventContents($scope.workEffortId, $scope.ACTIVITY_PICTURE, $scope.viewSize,
      function (data) {
        if (data.contentsList.length > 0) {
          $scope.pictureList = data.contentsList;
          $scope.count = data.contentsList;
          $scope.acountPraiseCount = $scope.count[$scope.myActiveSlide].praiseCount;
          $scope.PraiseList = $scope.count[$scope.imgIndex].praiseList
        }
      });

    //照片墙点赞
    $scope.praised = '赞';
    $scope.praiseselect = function (PraiseList) {
      //判断是否已经点赞
      for (var m = 0; m < PraiseList.length; m++) {
        if (PraiseList[m].partyId == $scope.partyId) {
          $ionicPopup.alert({
            title: '您已经赞过了'
          });
          return
        }
      }

      //点赞功能
      for (var i = 0; i < $scope.pictureList.length; i++) {
        if (i == $scope.imgIndex) {
          $scope.contentId = $scope.pictureList[i].contentId;
          ActivityServer.praisePicture('PRAISE_COUNT', $scope.contentId, function (data) {
            //点赞成功后执行刷新
            if (data.resultMsg == '成功') {
              $scope.viewSize = '999';
              $scope.ACTIVITY_PICTURE = 'ACTIVITY_PICTURE';
              ActivityServer.queryMyEventContents($scope.workEffortId, $scope.ACTIVITY_PICTURE, $scope.viewSize,
                function (data) {
                  if (data.contentsList.length > 0) {
                    $scope.count = data.contentsList;
                    $scope.acountPraiseCount = $scope.count[$scope.imgIndex].praiseCount;
                    $scope.PraiseList = $scope.count[$scope.imgIndex].praiseList
                  }
                });
            }
          });
        }
      }
    };

    //照片操作
    $scope.showConfirm = function () {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: '<b>分享至微信</b>'},
          {text: '保存图片'}
        ],
        destructiveText: '删除',
        titleText: '图片操作',
        cancelText: '取消',
        cancel: function () {
          // 这里添加取消代码
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              hideSheet();
              Wechat.share({
                message: {
                  title: '本次活动的照片',
                  description: '活动: ' + $scope.workEffortName,
                  thumb: 'www/img/activityImg/btn_照片墙_n@2x.png',
                  media: {
                    type: Wechat.Type.WEBPAGE,
                    webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/viewWebPictureWall?workEffortId=' + $scope.workEffortId,
                  }
                },
                scene: Wechat.Scene.SESSION // share to SESSION
              }, function () {
                //alert("Success");
              }, function (reason) {
                //alert("Failed: " + reason);
              });
              break;
            case 1:
              hideSheet();
              var pictrueUrl = encodeURI($scope.pictureList[$scope.imgIndex].objectInfo);

            function saveImageToPhone(url, success, error) {
              var canvas, context, imageDataUrl, imageData;
              var img = new Image();
              img.onload = function () {
                canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);
                try {
                  imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
                  imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
                  cordova.exec(
                    success,
                    error,
                    'Canvas2ImagePlugin',
                    'saveImageDataToLibrary',
                    [imageData]
                  );
                }
                catch (e) {
                  error(e.message);
                }
              };
              try {
                img.src = url;
              }
              catch (e) {
                error(e.message);
              }
            }

              var success = function (msg) {
                alert('保存成功')
              };
              var error = function (err) {
                alert('保存失败')
              };
              saveImageToPhone($scope.pictureList[$scope.imgIndex].objectInfo, success, error);
              break;
            default:
              alert('请选择')
          }
        },
        destructiveButtonClicked: function (index) {
          for (var i = 0; i < $scope.pictureList.length; i++) {
            var flag = true;
            if (i == $scope.imgIndex && flag) {
              if ($scope.partyId == $scope.pictureList[i].partyId) {
                ActivityServer.deletePictureWall($scope.workEffortId, $scope.pictureList[i].contentId,
                  function (data) {
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

    //返回活动详情
    $scope.goBack = function () {
      $location.path("/tab/activityDetails/" + $scope.workEffortId);
    }
  })

  /*********************************************************************************************************************
   * Desc 活动二维码
   * Author LX
   * Date 2017-3-3
   * */
  .controller('activityCode', function ($scope, $stateParams) {
    $scope.workEffortId = $stateParams.workEffortId;
    jQuery('.items').html("");
    jQuery('.items').qrcode($scope.workEffortId);
    //'http://www.vivafoo.com:3400/pewebview/control/main?workEffortId=' ++ "&adminOpenId=" + $scope.adminOpenId
  })

  /*********************************************************************************************************************
   * Desc 活动事项
   * Author LX
   * Date 2017-6-7
   * */
  .controller('ActivityMatter', function ($scope, $state, $stateParams, $ionicPopup, ActivityServer, $timeout, operateArray) {

    //准备参数
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.item_empty = true;
    var activityData = localStorage.getItem("activityData" + $scope.workEffortId);
    $scope.workEffortName = jQuery.parseJSON(activityData).workEffortName;
    $scope.partyId = localStorage.getItem('partyId');

    //定义查询活动事项
    $scope.queryMatter = function () {
      ActivityServer.queryEventJobs($scope.workEffortId, function (data) {
        console.log(data);
        $scope.activityJobsList = data.activityJobs;
        $scope.countSurvey = data.activityJobs.length;
        if ($scope.activityJobsList.length > 0) {
          $scope.reverseList = data.activityJobs[0].partyAnswer;
          $scope.item_empty = false;
        }
      });
    };

    //进入页面时刷新数据
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryMatter()
    });

    //当前滑动框索引值
    $scope.slideChanged = function (index) {
      $scope.currentSlide = index;
      $timeout(function () {
        ActivityServer.queryEventJobs($scope.workEffortId, function (data) {
          $scope.reverseList = data.activityJobs[$scope.currentSlide].partyAnswer;
        });
      }, 500);
    };

    //返回
    $scope.goBack = function () {
      $state.go("tab.activityDetails", {workEffortId: $scope.workEffortId});
    };

    //微信分享
    $scope.WechatShare = function (surveyName, surveyId) {
      Wechat.share({
        message: {
          title: '分享事项:' + surveyName,
          description: '活动: ' + $scope.workEffortName,
          thumb: 'www/img/activityImg/事项.jpeg',
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/viewShiXiang?workEffortId=' + $scope.workEffortId + '&surveyId=' + surveyId,
          }
        },
        scene: Wechat.Scene.SESSION // share to SESSION
      }, function () {
        //alert("Success");
      }, function (reason) {
        //alert("Failed: " + reason);
      });
    };

    //创建活动事项
    $scope.createMatter = function () {
      $state.go('tab.createMatter', {'workEffortId': $scope.workEffortId})
    };

    //删除事项
    $scope.removeActivityJob = function (surveyId) {
      var confirmPopup = $ionicPopup.confirm({
        title: '删除码垛',
        template: '你确定要删除本次码垛吗?',
        cancelText: "取消",
        okText: '确定'
      });
      confirmPopup.then(function (res) {
        if (res) {
          ActivityServer.removeActivityJob(surveyId, function (data) {
            console.log(data);
            if (data.resultMsg == '成功') {
              $scope.queryMatter()
            }
          })
        } else {
          console.log('You are not sure');
        }
      });
    };

    //事项参与方式
    $scope.joinMatter = function (index, $event) {
      if ($scope.stopPropagation) {
        $event.stopPropagation();
      }
      var partyAnswer = $scope.activityJobsList[index].partyAnswer;
      operateArray.InArray($scope.partyId, partyAnswer, function (data) {
        $scope.isJoined = data
      });
      if ($scope.isJoined == true) {
        $ionicPopup.alert({
          title: '本区域只允许参与一次'
        });
      } else {
        var surveyId = $scope.activityJobsList[index].surveyId;
        var surveyQuestionId = $scope.activityJobsList[index].surveyQuestionId;
        var content = $('input[name=joinMatter]')[index].value;
        ActivityServer.pushMyJob(surveyQuestionId, surveyId, content, function (data) {
          if (data.resultMsg == '成功') {
            $scope.queryMatter()
          }
        })
      }
    };

    //删除事项参与方式
    $scope.removeMyPushJob = function (surveyResponseId, surveyQuestionId) {
      ActivityServer.removeMyPushJob(surveyResponseId, surveyQuestionId, function (data) {
        console.log(data);
        if (data.resultMsg == '成功') {
          $scope.queryMatter()
        }
      })
    }
  })
  /*********************************************************************************************************************
   * Desc 创建事项
   * Author LX
   * Date 2017-6-29
   * */
  .controller('createMatter', function ($scope, $stateParams, $state, ActivityServer) {
    //参数准备
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.itemMatter = {};

    //创建创建活动项
    $scope.createMatter = function () {
      if ($scope.itemMatter.surveyName == null || $scope.itemMatter.surveyName == '') {
        alert('请填写讨论主题');
      } else {
        console.log($scope.itemMatter.surveyName + $scope.itemMatter.information);
        ActivityServer.createActivityJob($scope.workEffortId, $scope.itemMatter.surveyName, $scope.itemMatter.information, function (data) {
          console.log(data.resultMsg);
          if (data.resultMsg == '成功') {
            $state.go("tab.activityMatter", {"workEffortId": $scope.workEffortId})
          }
        });
      }
    };
  })

  /*********************************************************************************************************************
   * Desc 活动讨论
   * Author LX
   * Date 2017-3-3
   * */
  .controller('ActivityDiscuss', function ($scope, $state, $location, $rootScope, $stateParams, ActivityServer, $ionicPopup,
                                           $timeout) {

    //准备参数
    $scope.communicationEventId = $stateParams.communicationEventId;
    $scope.workEffortId = $stateParams.workEffortId;
    $scope.partyId = localStorage.getItem('partyId');

    //返回
    $scope.goBack = function () {
      $state.go("tab.activityDetails", {workEffortId: $scope.workEffortId});
    };

    //定义查询全部讨论方法
    $scope.queryDiscussList = function () {
      $scope.viewSise = 999;
      ActivityServer.queryActivityCommunication($scope.communicationEventId, $scope.viewSise, function (data) {
        $scope.commEventContentDataResource = data.commEventContentDataResource;
      });
    };

    //查询全部评论和键盘事件
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryDiscussList();
      window.cordova.plugins.Keyboard.disableScroll(false);
    });

    $scope.$on('$ionicView.leave', function () {
      window.cordova.plugins.Keyboard.disableScroll(true);
    });

    //发表评论
    $scope.sentMessage = function () {
      ActivityServer.createActivityCommunication($scope.communicationEventId, null, $scope.input.message, function (data) {
        if (data.resultMsg == '评论成功') {
          $scope.queryDiscussList();
          $('textarea').val('');
          $scope.input.message = '';
        }
      });
    };

    //删除评论
    $scope.removeActivityCommunication = function (contentId) {
      ActivityServer.removeActivityCommunication($scope.communicationEventId, contentId, function (data) {
        console.log(data);
        if (data.resultMsg = '成功') {
          $scope.queryDiscussList()
        }
      })
    };

    //回复评论
    $scope.openResponse = function (contentId) {
      $scope.Response = {};
      var myPopup = $ionicPopup.show({
        template: '<textarea  rows="3" ng-model="Response.responseText">',
        title: '请输入回复内容',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>回复</b>',
            type: 'button-positive',
            onTap: function (e) {
              myPopup.close();
              $timeout(function () {
                if (!$scope.Response.responseText) {
                  e.preventDefault();
                  alert("请输入回复内容")
                } else {
                  ActivityServer.createActivityCommunication($scope.communicationEventId, contentId, $scope.Response.responseText, function (data) {
                    if (data.resultMsg == '评论成功') {
                      $scope.queryDiscussList();
                    }
                  });
                }
              }, 500);
            }
          }
        ]
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
    };
  })

  /*********************************************************************************************************************
   * Desc 活动项
   * Author LX
   * Date 2017-3-3
   * */
  .controller('ActivityItem', function ($scope, $state, $rootScope, $stateParams, ActivityServer, $ionicPopup, SelectDate,
                                        operateArray) {

    //准备参数
    var id = $stateParams.id;
    var partyId = localStorage.getItem("partyId");
    $scope.img = localStorage.getItem("activityImg");
    $scope.itemEmpty = true;
    var activityData = localStorage.getItem("activityData" + id);
    $scope.workEffortName = jQuery.parseJSON(activityData).workEffortName;
    $scope.editButton = '排序';
    $scope.textData = {};
    $scope.itemSort = false;

    //定义查询服务
    $scope.qureyActivityItemList = function () {
      ActivityServer.findActivityItem(id, function (data) {
        $scope.activityItemList = data.projectList;
        $scope.activityAdminList = data.adminList;

        //判断当前用户是否有组织者权限
        operateArray.InArray(partyId, $scope.activityAdminList, function (data) {
          $scope.isActivityAdmin = data;
        });
      });
    };

    //查询活动项列表
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.qureyActivityItemList();
      window.cordova.plugins.Keyboard.disableScroll(false);
    });

    $scope.$on('$ionicView.leave', function () {
      window.cordova.plugins.Keyboard.disableScroll(true);
    });

    //全局点击
    $(document).ready(function () {
      var body = document.getElementById('newItem');
      body.addEventListener('click', function () {
        setTimeout("document.getElementById('global-search-input').focus();", 400)
      });
    });

    //获取焦点
    $scope.itemFocus = function () {
      $scope.editButton = '完成';
    };

    //拖动排序
    $scope.items = [1, 2, 3, 4];
    $scope.moveItem = function (item, fromIndex, toIndex) {
      $scope.activityItemList.splice(fromIndex, 1);
      $scope.activityItemList.splice(toIndex, 0, item);
    };

    //新建活动日程
    $scope.newActivityItem = function (editButton) {
      if (editButton == '完成') {
        $scope.itemSort = false;
        $scope.saveActivityItem();
        var item = document.getElementById('global-search-input').value;
        if (item != '') {
          ActivityServer.createActivityItem(id, item, null, function (data) {
            console.log(data.resultMsg);
            if (data.resultMsg == '成功') {
              $scope.qureyActivityItemList();
              document.getElementById('global-search-input').value = '';
              $scope.editButton = '排序';
              return false
            }
          });
        }
        $scope.saveActivityItem();
        $scope.editButton = '排序';
      } else if (editButton == '排序') {
        $scope.itemSort = true;
        $scope.editButton = '完成';
      }
    };

    //创建创建活动项
    $scope.createLabel = function () {
      if ($scope.itemData.name == null || $scope.itemData.name == '') {
        alert('请填写活动项内容');
        $scope.addLab.close();
      } else {
        console.log($scope.itemData.time + $scope.itemData.name);
        ActivityServer.createActivityItem(id, $scope.itemData.name, $scope.itemData.time, function (data) {
          console.log(data.resultMsg);
          if (data.resultMsg == '成功') {
            $scope.qureyActivityItemList();
            $scope.addLab.close();
          }
        });
      }
    };

    //取消创建活动项
    $scope.closeLab = function () {
      $scope.addLab.close();
    };

    //删除活动项
    $scope.deleteActivityItem = function (workEffortIdFrom) {
      ActivityServer.deleteActivityProject(workEffortIdFrom, id, function (data) {
        console.log("删除活动项————" + data);
        if (data.resultMsg == '成功') {
          ActivityServer.findActivityItem(id, function (data) {
            $scope.activityItemList = data.projectList;
            if ($scope.activityItemList.length > 0) {
              $scope.itemEmpty = false;
            }
          });
        }
      });
    };

    //微信分享活动项
    $scope.shareItem = function () {
      Wechat.share({
        message: {
          title: '日程安排明细',
          description: '活动: ' + $scope.workEffortName,
          thumb: 'www/img/activityImg/btn_附件_n@2x.png',
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: 'http://www.vivafoo.com:3400/pewebview/control/viewProject?workEffortId=' + id,
          }
        },
        scene: Wechat.Scene.SESSION // share to SESSION
      }, function () {
        //alert("Success");
      }, function (reason) {
        //alert("Failed: " + reason);
      });
    };

    //编辑活动项
    $scope.updateActivityItem = function (workEffortIdFrom, workEffortName, sequenceNum, actualStartDate) {
      if (!$scope.isActivityAdmin) {
        return false
      } else {
        //日期格式转换
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
        $scope.itemDataEdit = {};
        $scope.itemDataEdit.name = workEffortName;
        if (actualStartDate != null) {
          var activityStartDate1 = new Date(actualStartDate);
          $scope.itemDataEdit.time = activityStartDate1.Format("yyyy-MM-dd hh:mm:ss");
        } else {
          $scope.itemDataEdit.time = null
        }
        $scope.itemDataEdit.sequenceNum = sequenceNum;
        $scope.itemDataEdit.workEffortIdFrom = workEffortIdFrom;
        var itemPopup = $ionicPopup.show({
          template: '<input type="text" placeholder="安排" ng-model="itemDataEdit.name"><br>' +
          '<input type="text" placeholder="时间" ng-model="itemDataEdit.time" readonly=“readonly” style="background-color: white" ng-click="openDatePicker()"><br>' +
          '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="updateLabel();">更新</button><br/>' +
          '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">取消</button>',
          title: '更新活动项',
          scope: $scope
        });
        itemPopup.then(function (res) {
          console.log('Tapped!', res);
        });
        $scope.addLab = itemPopup;
      }
    };

    //选择创建时间
    $scope.openDatePicker = function () {
      SelectDate.nativeDate(function (data) {
        $scope.itemDataEdit.time = data
      })
    };

    //点击更新按钮
    $scope.updateLabel = function () {
      if ($scope.itemDataEdit.name == null || $scope.itemDataEdit.name == '') {
        alert('请填写活动项内容');
        $scope.addLab.close();
      } else {
        ActivityServer.updateEventProject($scope.itemDataEdit.workEffortIdFrom, $scope.itemDataEdit.name, $scope.itemDataEdit.sequenceNum, $scope.itemDataEdit.time, function (data) {
          console.log(data.resultMsg);
          if (data.resultMsg == '成功') {
            $scope.qureyActivityItemList();
            $scope.addLab.close();
          }
        });
      }
    };

    //保存排序
    $scope.saveActivityItem = function () {
      var sequenceArrayList = [];
      for (var i = 0; i < $scope.activityItemList.length; i++) {
        sequenceArrayList.push({'sequenceNum': i, 'workEffortId': $scope.activityItemList[i].workEffortIdFrom})
      }
      console.log(sequenceArrayList);
      ActivityServer.updateProjectsequenceNum(JSON.stringify(sequenceArrayList), function (data) {
        if (data.resultMsg == '成功') {
          $scope.qureyActivityItemList();
        }
      })
    }
  })

  /*********************************************************************************************************************
   * Desc 添加活动人员(手动添加)
   * Author LX
   * Date 2017-3-3
   * */
  .controller('activityAddPerson', function ($scope, $ionicPopup, Contact, $state, $stateParams, ActivityServer) {

    //准备参数
    $scope.workEffortId = $stateParams.workEffortId;

    //添加人员
    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea  style='display: inline-block;width: 41%;resize:none' class='personName' placeholder='昵称'></textarea>" +
        "<textarea style='display: inline-block;width: 41%;resize:none' class='personTel' placeholder='手机号码'></textarea>" +
        "<img src='img/shanchu.jpeg' width=48px height=48px onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><hr>" +
        "");
    };

    //确定添加
    $scope.createSurveyAndQuestions = function () {
      $scope.personInfoList = [];
      var personName = $(".personName");
      var personTel = $(".personTel");
      for (var i = 0; i < personName.length; i++) {
        $scope.personInfoList.push(personName.eq(i).val() + ':' + personTel.eq(i).val());
      }
      ActivityServer.addConceptPersonToActivity($scope.workEffortId, $scope.personInfoList.toString(), function (data) {
        console.log(data)
      })
    };
  })

  /*********************************************************************************************************************
   * Desc 邀请梨友
   * Author LX
   * Date 2017-3-3
   * */
  .controller('activityAppContact', function ($scope, $ionicPopup, Contact, $state, $stateParams, ActivityServer) {
    //获得我的全部联系人列表(我参与的活动)
    Contact.queryAllActivityRelationPersons(function (data) {
      $scope.allPersonList = data.allPersonList
    });

    //发送邀请
    $scope.sendInvitation = function (chat) {
      ActivityServer.createPeSystemInfoAboutActivity(chat.partyId, chat.moreInfoUrl, chat.firstName, function (data) {
        console.log(data);
        if (data.resultMsg == '成功') {
          $scope.isJoind = true;
          alert('邀请成功')
        }
      })
    }
  });


