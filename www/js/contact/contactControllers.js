angular.module('contact.controllers', [])

/*********************************************************************************************************************
 * Desc 查询用户个人信息
 * Author LX
 * Date 2017-3-3
 * */
  .controller('AccountCtrl', function ($scope, $rootScope, $ionicHistory, Contact, $state, Login, $ionicPopup,
                                       ActivityServer, $ionicLoading) {

    //准备参数
    $scope.partyId = localStorage.getItem("partyId");
    $scope.weixinBinding = '未绑定';
    $scope.telBinding = '未绑定';

    //定义查询服务
    $scope.queryPersonInfo = function () {
      Contact.queryPersonInfo(function (data) {
        $scope.myInfoList = data;
        console.log('微信openId:' + data.openId);
        localStorage.removeItem('adminOpenId');
        localStorage.setItem('adminOpenId', data.openId)
      });

      //判断手机号码是否绑定
      if ($scope.myInfoList) {
        var phone = $scope.myInfoList.contactNumber;
        if ((/^1[34578]\d{9}$/.test(phone))) {
          $scope.telBinding = '已绑定';
        }
      }

      //判断是否绑定微信
      if ($scope.myInfoList) {
        var openId = $scope.myInfoList.openId;
        if (openId != "NA") {
          $scope.weixinBinding = '已绑定';
        }
      }
    };

    //查询我的个人信息
    $scope.$on('$ionicView.beforeEnter', function () {
      $scope.queryPersonInfo();
    });

    //切换账户
    $scope.loginOut = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: '切换账户',
        template: '是否确定要更换账户'
      });
      confirmPopup.then(function (res) {
        if (res) {
          ActivityServer.disableUserLoginFromTarJeta(function (data) {
            console.log(data);
            if (data.resultMsg == "成功") {
              localStorage.removeItem('tarjeta');
              localStorage.removeItem("partyId");
              $state.go("login");
              $ionicHistory.clearCache();   //清除缓存数据
            }
          });
        } else {
          console.log('You are not sure');
        }
      });
    };

    //意见反馈
    $scope.opinion = function () {
      $state.go('tab.opinion');
    };

    //bug修复记录
    $scope.bugFix = function () {
      $state.go('tab.BugFix');
    };

    //关于
    $scope.about = function () {
      $state.go('tab.about');
    };

    //绑定或解绑手机号码
    $scope.bindTelephone = function () {
      if ($scope.telBinding == '已绑定') {
        var confirmPopup = $ionicPopup.confirm({
          title: '更换手机号码',
          template: '如果您更换了手机号码，您将不能通过它找回您的活动！',
          cancelText: '取消',
          okText: '确定'
        });
        confirmPopup.then(function (res) {
          if (res) {
            $state.go('tab.bindTelephone', {'partyId': $scope.partyId, 'type': 'update'})
          } else {
            console.log('You are not sure');
          }
        });
      } else {
        $state.go('tab.bindTelephone', {'partyId': $scope.partyId, 'type': 'bind'})
      }
    };

    //绑定或解绑微信
    $scope.wachatLogin = function () {
      if ($scope.weixinBinding == '已绑定') {
        var confirmPopup = $ionicPopup.confirm({
          title: '解绑微信',
          template: '如果您解绑了微信，您将不能通过它找回您的活动！',
          cancelText: '取消',
          okText: '确定'
        });
        confirmPopup.then(function (res) {
          if (res) {
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
                  $scope.queryPersonInfo();
                  $scope.$apply();
                  $ionicLoading.hide()
                }else{
                  $ionicPopup.alert({
                    title:data.resultMsg
                  })
                  $ionicLoading.hide()
                }
              });
            }, function (reason) {
              alert("Failed: " + reason);
              $ionicLoading.hide()
            });
          } else {
            console.log('You are not sure');
          }
        });
      } else {
        $ionicLoading.show({
          template: '交互中...'
        });
        if ($scope.partyId == '' || $scope.partyId == null) {
          var scope = "snsapi_userinfo";
          Wechat.auth(scope, function (response) {
            console.log("微信返回值:" + JSON.stringify(response));
            var code = response.code;
            Login.userWeChatAppLoginBack(code, function (data) {
              console.log('微信找回的Token:' + data.tarjeta);
              if (data.tarjeta) {
                localStorage.removeItem("tarjeta");
                localStorage.removeItem("partyId");
                localStorage.removeItem("openId");
                localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
                localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
                localStorage.setItem("adminOpenId", data.openId);//设置adminOpenId登陆人
                $scope.queryPersonInfo();
                $scope.$apply();
                $ionicLoading.hide()
              }
            })
          }, function (reason) {
            alert("Failed: " + reason);
            $ionicLoading.hide()
          });
        } else {
          $scope.scope = "snsapi_userinfo";
          Wechat.auth($scope.scope, function (response) {
            console.log(JSON.stringify(response) + "微信返回值");
            console.log(response.code + '///' + $scope.partyId);
            Login.userWeChatAppLogin(response.code, $scope.partyId, function (data) {
              console.log(data.resultMsg);
              if (data.resultMsg === 'PE平台登录成功') {
                $scope.queryPersonInfo();
                $scope.$apply();
                $ionicLoading.hide()
              }
            });
          }, function (reason) {
            alert("Failed: " + reason);
            $ionicLoading.hide()
          });
        }
      }
    };

    //完善编辑个人信息
    $scope.editPersonInfo = function () {
      $state.go('tab.editPersonInfo', {'partyId': $scope.partyId})
    }
  })

  /*********************************************************************************************************************
   * Desc 联系人列表
   * Author LX
   * Date 2017-3-3
   * */
  .controller('MainCtrl', function ($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, $ionicScrollDelegate,
                                    filterFilter, $location, $anchorScroll, Tools, Contact) {

    //准备参数
    var partyId = localStorage.getItem("partyId");
    var letters = $scope.letters = [];
    var contacts = $scope.contacts = [];
    var currentCharCode = ' '.charCodeAt(0) - 1;
    var array = [];

    //获得我的全部联系人列表(我参与的活动)
    Contact.queryAllActivityRelationPersons(function (data) {
      $scope.allPersonList = data.allPersonList
    });
    if ($scope.allPersonList != null) {
      for (var j = 0; j < $scope.allPersonList.length; j++) {
        array.push({
          'last_name': Tools.ConvertPinyin($scope.allPersonList[j].firstName).toUpperCase(),
          'first_name': $scope.allPersonList[j].firstName,
          'headPortrait': $scope.allPersonList[j].headPortrait,
          'partyId': $scope.allPersonList[j].partyId,
          'appUser': $scope.allPersonList[j].appUser
        })
      }
    }

    //联系人按照字母排序
    array
      .sort(function (a, b) {
        return a.last_name > b.last_name ? 1 : -1;
      })
      .forEach(function (person) {
        var personCharCode = Tools.ConvertPinyin(person.last_name).toUpperCase().charCodeAt(0);
        if (personCharCode < 65) {
          personCharCode = 35;
        }

        var difference = personCharCode - currentCharCode;

        for (var i = 1; i <= difference; i++) {
          addLetter(currentCharCode + i);
        }
        currentCharCode = personCharCode;
        contacts.push(person);
      });

    for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
      addLetter(i);
    }

    function addLetter(code) {
      var letter = String.fromCharCode(code);

      contacts.push({
        isLetter: true,
        letter: letter
      });

      letters.push(letter);
    }

    $scope.getItemHeight = function (item) {
      return item.isLetter ? 12 : 30;
    };

    $scope.scrollTop = function () {
      $ionicScrollDelegate.scrollTop();
    };

    $scope.scrollBottom = function () {
      $ionicScrollDelegate.scrollBottom();
    };

    var letterHasMatch = {};
    $scope.getContacts = function () {
      letterHasMatch = {};
      return contacts.filter(function (item) {
        var itemDoesMatch = !$scope.search || item.isLetter ||
          item.first_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
          item.last_name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

        if (!item.isLetter && itemDoesMatch) {
          var pinyin = item.last_name.charAt(0).toUpperCase();
          var letter = Tools.ConvertPinyin(pinyin).substring(0, 1);
          if (item.last_name.charCodeAt(0) < 65) {
            letter = "#";
          }
          letterHasMatch[letter] = true;
        }

        return itemDoesMatch;
      }).filter(function (item) {
        if (item.isLetter && !letterHasMatch[item.letter]) {
          return false;
        }
        return true;
      });
    };

    //搜索好友暂时不做
    $scope.clearSearch = function () {
      $scope.search = '';
    };

    //跳转至联系人信息详情
    $scope.goContactInfo = function (partyId) {
      $state.go('tab.contactInfo', {'partyId': partyId})
    }
  })

  /*********************************************************************************************************************
   * Desc 联系人详情
   * Author LX
   * Date 2017-3-3
   * */
  .controller('contactInfo', function ($scope, $state, Contact, $stateParams, $ionicPopup) {

    //准备参数
    $scope.partyId = $stateParams.partyId;

    //返回联系人列表
    $scope.goBack = function () {
      $state.go("tab.chats")
    };

    //查询联系人信息详情
    Contact.findUserDetail($scope.partyId, function (data) {
      console.log('联系人信息详情－－－－－' + data);
      $scope.personInfoList = data.personInfo;
      $scope.mutualActivityList = data.mutualActivityList;
    });

    //修改备注名字
    $scope.remark = function () {
      $scope.data = {};
      $scope.data.addLabel = $scope.personInfoList.remarkName;
      var myPopupAdd = $ionicPopup.show({
        template: '<input  type="text" ng-model="data.addLabel"/>' +
        '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="remarksContact();">修改</button><br/>' +
        '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">取消</button>',
        title: '修改备注名称',
        scope: $scope
      });
      myPopupAdd.then(function (res) {
        console.log('Tapped!', res);
      });
      $scope.addLab = myPopupAdd;
      $scope.closeLab = function () {
        $scope.addLab.close();
      };
      $scope.remarksContact = function () {
        if ($scope.data.addLabel == null || $scope.data.addLabel == '') {
          alert("请输入修改信息")
        } else {
          Contact.remarksContact($scope.partyId, $scope.data.addLabel, function (data) {
            console.log(data)
          });
          $scope.addLab.close();
          $state.reload();
        }
      };
    };

    //跳转至相应活动详情页面
    $scope.goActivityDetail = function (workEffortId) {
      $state.go("tab.activityDetails", {'activityId': workEffortId})
    }
  })

  /*********************************************************************************************************************
   * Desc 编辑联系人信息
   * Author LX
   * Date 2017-3-3
   * */
  .controller('editPersonInfo', function ($scope, $cordovaFileTransfer, Contact, $stateParams, $state, $ionicPopup, $cordovaImagePicker, $rootScope) {

    //准备参数
    $scope.partyId = $stateParams.partyId;
    $scope.tarjeta = localStorage.getItem('tarjeta');

    //查询我的个人信息
    Contact.queryPersonInfo(function (data) {
      $scope.myInfoList = data;
      if (data.gender == '男') {
        $scope.male = true;
      } else if (data.gender == '女') {
        $scope.female = true;
      }
      console.log(data)
    });

    //返回我的信息
    $scope.goBack = function () {
      $state.go('tab.account', null, {reload: true})
    };

    //上传更换头像
    $scope.uploaPartyContent = function () {
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
            image.src = results[i];
            document.addEventListener('deviceready', function () {
              var url = $rootScope.platformInterfaceUrl + "uploadHeadPortrait?partyId=" + $scope.partyId + '&tarjeta=' + $scope.tarjeta;
              var options = {};
              $cordovaFileTransfer.upload(url, results[i], options)
                .then(function (result) {
                  alert('上传成功')
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
    };

    //更新用户个人信息
    $scope.updatePersonInfo = function () {
      var sex = document.getElementsByName("sex");
      for (var i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
          $scope.sex = sex[i].value
        }
      }
      Contact.updatePersonInfo($scope.myInfoList.personName, $scope.sex, function (data) {
        $ionicPopup.alert({
          title: '完成更新',
          template: data.resultMsg
        });
        $state.go('tab.account')
      })
    }
  })


  /*********************************************************************************************************************
   * Desc 绑定用户手机号码
   * Author LX
   * Date 2017-3-3
   * */
  .controller('bindTelephone', function ($scope, Contact, $stateParams, $state, $ionicPopup, Login, $http, $rootScope, $interval) {

    //准备参数
    $scope.partyId = localStorage.getItem('partyId');
    $scope.type = $stateParams.type;
    $scope.codeBtn = '验证码';
    $scope.loginData = {};

    //查询我的个人信息
    Contact.queryPersonInfo(function (data) {
      $scope.myInfoList = data;
      console.log(data)
    });

    //返回个人信息页面
    $scope.goBack = function () {
      $state.go('tab.account')
    };

    //获取验证码
    $scope.getIdentify = function (tel) {
      if ($scope.type == "bind") {
        $scope.getIdentifyCode(tel)
      } else {
        $scope.getUpdateInfoCaptcha(tel)
      }
    };

    //获取更换手机号码验证码
    $scope.getUpdateInfoCaptcha = function (tel) {
      Login.getUpdateInfoCaptcha(tel, function (data) {
        console.log(data)
      });
      $scope.countDown();
    };

    //获取绑定验证码（注册验证码）
    $scope.getIdentifyCode = function (tel) {
      $scope.smsType = 'REGISTER';
      Login.getLoginCaptcha(tel, $scope.smsType, function (data) {
        console.log(data)
      });
      $scope.countDown();
    };

    //倒计时
    $scope.countDown = function () {
      //倒计时
      $scope.n = 60;
      $scope.codeBtn = $scope.n + " 秒";
      var time = $interval(function () {
        $scope.n--;
        $scope.codeBtn = $scope.n + " 秒";
        if ($scope.n == 0) {
          $interval.cancel(time); // 取消定时任务
          $scope.codeBtn = '验证码';
        }
      }, 1000);
    };

    //完成绑定手机号码
    $scope.bindLoginTel = function () {
      if ($scope.type == "bind") {
        Contact.updateLoginTel($scope.partyId, $scope.loginData.mobileNumber, $scope.loginData.captcha, function (data) {
          console.log(data.resultMsg + '获取验证码状态');
          if (data.resultMsg == '更新人员信息成功') {
            localStorage.removeItem("tarjeta");
            localStorage.setItem("tarjeta", data.tarjeta);
            $ionicPopup.alert({
              title: '绑定成功',
              template: "你可以通过手机号码找回您参与的活动"
            });
            $state.go('tab.account')
          } else {
            $ionicPopup.alert({
              title: data.resultMsg,
              template: '请确认您输入的验证码是否正确'
            })
          }
        })
      } else {
        Contact.rebindTel($scope.loginData.mobileNumber, $scope.loginData.captcha, function (data) {
          console.log(data);
          if (data.resultMsg == '更新人员信息成功') {
            localStorage.removeItem("tarjeta");
            localStorage.setItem("tarjeta", data.tarjeta);
            $ionicPopup.alert({
              title: '更换成功',
              template: "你可以通过手机号码找回您参与的活动"
            });
            $state.go('tab.account', null, {reload: true})
          } else {
            $ionicPopup.alert({
              title: data.resultMsg,
              template: '请确认您输入的验证码是否正确'
            })
          }
        })
      }
    }
  });













