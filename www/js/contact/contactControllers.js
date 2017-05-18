angular.module('contact.controllers', [])

//关于我的个人信息******************************************************************************************************
  .controller('AccountCtrl', function ($scope, $rootScope, $ionicHistory, Contact, $state, $cordovaBarcodeScanner, ActivityServer, $cordovaImagePicker, $cordovaFileTransfer) {
    //准备参数
    $scope.tarjeta = localStorage.getItem("tarjeta");
    $scope.partyId = localStorage.getItem("partyId");
    console.log("token:"+$scope.tarjeta+'/partyId:'+$scope.partyId);

    //查询我的个人信息
    Contact.queryPersonInfo($scope.tarjeta, function (data) {
      $scope.myInfoList = data;
      console.log('微信openId:' + data.openId);
      localStorage.removeItem('adminOpenId');
      localStorage.setItem('adminOpenId', data.openId)
    });

    //退出
    $scope.loginOut = function () {
      localStorage.removeItem('tarjeta');
      localStorage.removeItem("partyId");
      $state.go("login");
      $ionicHistory.clearCache();   //清除缓存数据
    };

    //判断手机号码是否绑定
    $scope.telBinding = '未绑定';
    if ($scope.myInfoList) {
      var phone = $scope.myInfoList.contactNumber;
      if ((/^1[34578]\d{9}$/.test(phone))) {
        $scope.telBinding = '已绑定';
      }
    }

    //绑定手机号码
    $scope.bindTelephone = function () {
      $state.go('tab.bindTelephone', {'partyId': $scope.partyId})
    };

    //手机好绑定
    $scope.telLogin = function () {
      $state.go('login')
    };

    //判断手机号码是否绑定
    $scope.weixinBinding = '未绑定';
    if ($scope.myInfoList) {
      var openId = $scope.myInfoList.openId;
      if (openId != "NA") {
        $scope.weixinBinding = '已绑定';
      }
    }

    //微信绑定
    console.log($scope.partyId + "1");
    $scope.wachatLogin = function () {
      $scope.scope = "snsapi_userinfo";
      console.log($scope.partyId + "2");
      Wechat.auth($scope.scope, function (response) {
        // you may use response.code to get the access token.
        console.log(JSON.stringify(response) + "微信返回值");
        var code = response.code;
        console.log($scope.partyId + "3");
        ActivityServer.userWeChatAppLogin(code,$scope.partyId,function (data) {
          console.log('微信绑定后返回的数据'+'token:'+data.tarjeta+"--------partyId:"+data.partyId+'-----openId:'+data.openId);
          if(data.tarjeta){
            // localStorage.removeItem("tarjeta");
            // localStorage.removeItem("partyId");
            localStorage.removeItem("openId");
            // localStorage.setItem("tarjeta", data.tarjeta);//设置全局token(令牌)
            // localStorage.setItem("partyId", data.partyId);//设置partyId登陆人
            localStorage.setItem("adminOpenId", data.openId);//设置partyId登陆人
          }
        });
        location.reload(true)
      }, function (reason) {
        alert("Failed: " + reason);
      });
    };

    //完善编辑个人信息
    $scope.editPersonInfo = function () {
      $state.go('tab.editPersonInfo', {'partyId': $scope.partyId})
    }
  })

  //联系人***************************************************************************************************************
  .controller('MainCtrl', function ($scope, $state, $ionicPopup, $ionicSlideBoxDelegate, $ionicScrollDelegate,
                                    filterFilter, $location, $anchorScroll, Tools,Contact) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    var partyId = localStorage.getItem("partyId");
    var letters = $scope.letters = [];
    var contacts = $scope.contacts = [];
    var currentCharCode = ' '.charCodeAt(0) - 1;
    var array = [];

    //获得我的全部联系人列表(我参与的活动)
    Contact.queryAllActivityRelationPersons(partyId, function (data) {
      $scope.allPersonList = data.allPersonList
    });
    if ($scope.allPersonList != null) {
      for (var j = 0; j < $scope.allPersonList.length; j++) {
        array.push({
          'last_name': Tools.ConvertPinyin($scope.allPersonList[j].firstName).toUpperCase(),
          'first_name': $scope.allPersonList[j].firstName,
          'headPortrait': $scope.allPersonList[j].headPortrait
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
          /*console.log(String.fromCharCode(currentCharCode));*/
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
      return item.isLetter ? 40 : 100;
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
    console.log(contacts);
    $scope.clearSearch = function () {
      $scope.search = '';
    };

  })

  //更新个人信息***********************************************************************************************************
  .controller('editPersonInfo', function ($scope,$cordovaFileTransfer, Contact, $stateParams, $state,$ionicPopup,$cordovaImagePicker,$rootScope) {

    //准备参数
    $scope.partyId = $stateParams.partyId;
    $scope.tarjeta = localStorage.getItem('tarjeta');

    //查询我的个人信息
    console.log($scope.tarjeta);
    Contact.queryPersonInfo($scope.tarjeta, function (data) {
      $scope.myInfoList = data;
      if(data.gender=='男'){
        $scope.male=true;
      }else if(data.gender=='女'){
        $scope.female=true;
      }
      console.log(data)
    });

    //返回
    $scope.goBack = function () {
      $state.go('tab.account')
    };

    //上传头像
    $scope.uploaPartyContent = function () {
      console.log("上传头像");
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
            //console.log('Image URI: ' + results[i]);//返回参数是图片地址 results 是一个数组
            image.src = results[i];
            // image.style.height = '200px';
            // image.style.width = '330px';
            //$cordovaProgress.showSimpleWithLabel(true, "上传中");
            document.addEventListener('deviceready', function () {
              var url = $rootScope.platformInterfaceUrl + "uploadHeadPortrait?partyId=" + $scope.partyId + '&tarjeta=' + $scope.tarjeta;
              var options = {};
              $cordovaFileTransfer.upload(url, results[i], options)
                .then(function (result) {
                  //var ImgId=JSON.stringify(result.response);
                  //$scope.themeImgId=ImgId.substring(18,23);
                  //alert($scope.themeImgId);
                  //localStorage.setItem("themeImg",results[i]);
                  //$cordovaProgress.hide();
                  //alert(result.message);
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

    //更新信息
    $scope.updatePersonInfo = function () {
      var sex = document.getElementsByName("sex");
      for (var i=0; i<sex.length; i++) {
        if (sex[i].checked) {
          $scope.sex=sex[i].value
        }
      }
      Contact.updatePersonInfo($scope.partyId, $scope.myInfoList.personName,$scope.sex, function (data) {
        $ionicPopup.alert({
          title: '完成更新',
          template: data.resultMsg,
        });
      })
    }

  })


  //绑定手机号码***********************************************************************************************************
  .controller('bindTelephone', function ($scope, Contact, $stateParams, $state,$ionicPopup) {

    //准备参数
    $scope.partyId = localStorage.getItem('partyId');
    $scope.tarjeta = localStorage.getItem('tarjeta');
    console.log("token:"+$scope.tarjeta+'/-------------partyId:'+$scope.partyId);

    //查询我的个人信息
    console.log($scope.tarjeta);
    Contact.queryPersonInfo($scope.tarjeta, function (data) {
      $scope.myInfoList = data;
      console.log(data)
    });

    //返回
    $scope.goBack = function () {
      $state.go('tab.account')
    };

    //完成
    $scope.loginData = {};
    $scope.updateLoginTel = function () {
      console.log($scope.tarjeta + '/' + $scope.partyId + '/' + $scope.loginData.mobileNumber + '/' + $scope.loginData.captcha);
      Contact.updateLoginTel($scope.tarjeta, $scope.partyId, $scope.loginData.mobileNumber, $scope.loginData.captcha, function (data) {
        console.log(data.resultMsg);
        localStorage.removeItem("tarjeta");
        localStorage.setItem("tarjeta",data.tarjeta);
        $ionicPopup.alert({
          title: '绑定成功',
          template: "你可以通过手机号码找回您参与的活动",
        });
        $state.go('tab.account')
      })
    }
  });



