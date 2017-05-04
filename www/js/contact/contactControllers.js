angular.module('contact.controllers', [])

  //关于我的个人信息******************************************************************************************************
  .controller('AccountCtrl',function ($scope,$rootScope,Contact,$state,$cordovaBarcodeScanner,ActivityServer,$cordovaImagePicker,$cordovaFileTransfer) {
    //准备参数
    $scope.tarjeta=localStorage.getItem("tarjeta");
    $scope.partyId=localStorage.getItem("partyId");
    $scope.img = localStorage.getItem("contactImg");           //显示缺省图片
    //查询我的个人信息
    Contact.queryPersonInfo($scope.tarjeta,function (data) {
      $scope.myInfoList=data
    });

    //如果没有头像 显示缺省图片
    if($scope.myInfoList!=undefined){
      if($scope.myInfoList.headPortrait==null||$scope.myInfoList.headPortrait==undefined){
        $scope.myInfoList.headPortrait=$scope.img;
      }
    }

    //退出
    $scope.loginOut=function () {
      localStorage.removeItem('tarjeta');
      localStorage.removeItem("partyId");
      $state.go("login")
    };

    //上传头像
    $scope.uploaPartyContent=function () {
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
              var url = $rootScope.platformInterfaceUrl+"uploadHeadPortrait?partyId=" +$scope.partyId+'&tarjeta='+$scope.tarjeta;
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
    }

  })

  //联系人***************************************************************************************************************
  .controller('ContactlistCtrl', function ($scope, Contact,ThemeImage,$state) {

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    var partyId=localStorage.getItem("partyId");

    //获得我的全部联系人列表(我参与的活动)
    Contact.queryAllActivityRelationPersons(partyId,function (data) {
      $scope.allPersonList=data.allPersonList
    });

    //进入标签内查看人员
    $scope.goInfo=function (id) {
      $state.go('app.labelPersonList',{'partyId':id})
    }

  })
  //更新联系人***********************************************************************************************************
  .controller('UpdatePersonInfo', function ($scope, Contact, $stateParams, PersonData, PersonLabel, $rootScope) {
    var partyId = $stateParams.personId;
    $scope.partyId = partyId;
    $scope.title = "编辑人员";
    $scope.Persondata = {};
    //获取联系人个人信息
    PersonData.getContactInfo($scope.partyId, function (data) {
      $scope.personInfo = data;
      $scope.Persondata.personName = data.personName;
      $scope.Persondata.contactNumber = data.contactNumber;
      $scope.Persondata.gender = data.gender;
      $scope.Persondata.lable = data.lable;
      $scope.Persondata.email = data.email;
      $scope.Persondata.company = data.company;
    });
    //更新联系人信息
    $scope.addContact = function () {
      PersonData.updatePerson($scope.partyId, $scope.Persondata.personName, $scope.Persondata.contactNumber, $scope.Persondata.email, $scope.Persondata.company,
        $scope.Persondata.lable, $scope.Persondata.gender, $scope.Persondata.area, $scope.Persondata.city, $scope.Persondata.stateProvinceGeoId, $scope.Persondata.address, function (data) {
          $scope.infoList = data;
        });
      $scope.$ionicGoBack();
    };
    //获取用户拥有的标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data) {
      $scope.labelList = data;
    });
    //省市区下拉菜单
    PersonData.showPersonAddress($scope.partyId, function (data) {
      $scope.data = data;
      $scope.provinceList = [];
      $scope.Persondata.stateProvinceGeoId = data.stateProvinceGeoId;
      $scope.Persondata.area = data.geoIdArea;
      $scope.Persondata.city = data.geoIdCity;
      $scope.Persondata.address = data.address1
      if (data.addressSelectData != null) {
        for (var i = 0; i < data.addressSelectData.length; i++) {
          var provinceMap = {'id': data.addressSelectData[i].geoId, "name": data.addressSelectData[i].geoName};
          $scope.provinceList.push(provinceMap);

          if ($scope.Persondata.stateProvinceGeoId != null && $scope.Persondata.stateProvinceGeoId == data.addressSelectData[i].geoId) {
            $scope.cityList = [];
            var thisCityList = data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              var cityMap = {"id": thisCityList[j].geoId, "name": thisCityList[j].geoName};
              $scope.cityList.push(cityMap);

              if ($scope.Persondata.city != null && $scope.Persondata.city == thisCityList[j].geoId) {
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for (var w = 0; w < areaList.length; w++) {
                  var areaMap = {"id": areaList[w].geoId, "name": areaList[w].geoName};
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
      if ($scope.data.addressSelectData != null) {
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
    };

    $scope.changeCity = function (geoIdCity) {
      $scope.geoIdCity = geoIdCity;
      if ($scope.data.addressSelectData != null) {
        for (var i = 0; i < $scope.data.addressSelectData.length; i++) {
          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId) {
            var thisCityList = $scope.data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              if ($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId) {
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for (var w = 0; w < areaList.length; w++) {
                  var areaMap = {"id": areaList[w].geoId, "name": areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }
            }
          }
        }
      }
    }
  })

  //添加联系人***********************************************************************************************************
  .controller('AddPerson', function ($scope, PersonLabel, $rootScope, $location, PersonData, $ionicHistory) {
    $scope.title = "添加人员";
    //获得全部标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data) {
      $scope.labelList = data;
    })
    var partyId = "";
    //编辑地址
    $scope.addAddress = function () {
      $location.path("/app/addAddress");
    }
    //提交联系人数据
    $scope.Persondata = {};
    $scope.addContact = function () {
      PersonData.createPerson($rootScope.partyId, $scope.Persondata.personName, $scope.Persondata.contactNumber, $scope.Persondata.email, $scope.Persondata.company,
        $scope.Persondata.lable, $scope.Persondata.gender, $scope.Persondata.area, $scope.Persondata.city, $scope.Persondata.stateProvinceGeoId, $scope.Persondata.address, function (data) {
          $scope.infoList = data;
        });
      $ionicHistory.goBack();

    };
    //省市区下拉菜单
    PersonData.showPersonAddress($rootScope.partyId, function (data) {
      $scope.data = data;
      $scope.provinceList = [];
      if (data.addressSelectData != null) {
        for (var i = 0; i < data.addressSelectData.length; i++) {
          var provinceMap = {'id': data.addressSelectData[i].geoId, "name": data.addressSelectData[i].geoName};
          $scope.provinceList.push(provinceMap);

          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == data.addressSelectData[i].geoId) {
            $scope.cityList = [];
            var thisCityList = data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              var cityMap = {"id": thisCityList[j].geoId, "name": thisCityList[j].geoName};
              $scope.cityList.push(cityMap);

              if ($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId) {
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for (var w = 0; w < areaList.length; w++) {
                  var areaMap = {"id": areaList[w].geoId, "name": areaList[w].geoName};
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
      if ($scope.data.addressSelectData != null) {
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
      if ($scope.data.addressSelectData != null) {
        for (var i = 0; i < $scope.data.addressSelectData.length; i++) {
          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId) {
            var thisCityList = $scope.data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              if ($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId) {
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for (var w = 0; w < areaList.length; w++) {
                  var areaMap = {"id": areaList[w].geoId, "name": areaList[w].geoName};
                  $scope.areaList.push(areaMap);
                }
              }
            }
          }
        }
      }
    }
  })

  //关于联系人***********************************************************************************************************
  .controller('AboutHim', function ($scope, Contact, $stateParams, $location, PersonData) {
    var partyId = $stateParams.personId;
    PersonData.getPersonInfo(partyId, function (data) {
      $scope.personInfo = data;
    });
    //$scope.personInfo = Contact.get(id);
    $scope.goInfo = function (id) {
      $location.path('/app/editPerson/' + id);
    };
    $scope.goResources = function (id) {
      $location.path('/app/getResources/' + id);
    };
    $scope.goEvents = function () {
      $location.path('/app/getEvents/');
    };
    $scope.goOrder = function (name) {
      $location.path('/app/assOrder/' + name);
    };
    $scope.gobusiness = function () {
      $location.path('/app/getBusiness/');
    };
  })

  //编辑地址*************************************************************************************************************
  .controller('EditAddress', function ($scope, PersonData, $rootScope, popupUtil, $ionicLoading, $ionicHistory) {
    PersonData.showPersonAddress($rootScope.partyId, function (data) {
      //alert($rootScope.partyId);
      $scope.data = data;
      $scope.provinceList = [];
      $scope.stateProvinceGeoId = data.stateProvinceGeoId;
      $scope.geoIdCity = data.geoIdCity;
      $scope.geoIdArea = data.geoIdArea;
      $scope.address1 = data.address1;
      //alert(data.addressSelectData.length);
      //alert("asdadf");
      if (data.addressSelectData != null) {
        for (var i = 0; i < data.addressSelectData.length; i++) {
          var provinceMap = {'id': data.addressSelectData[i].geoId, "name": data.addressSelectData[i].geoName};
          $scope.provinceList.push(provinceMap);

          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == data.addressSelectData[i].geoId) {
            $scope.cityList = [];
            var thisCityList = data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              var cityMap = {"id": thisCityList[j].geoId, "name": thisCityList[j].geoName};
              $scope.cityList.push(cityMap);

              if ($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId) {
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for (var w = 0; w < areaList.length; w++) {
                  var areaMap = {"id": areaList[w].geoId, "name": areaList[w].geoName};
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
      if ($scope.data.addressSelectData != null) {
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
    };
    $scope.changeCity = function (geoIdCity) {
      $scope.data.geoIdCity = geoIdCity;
      $scope.data.geoIdArea = '';
      if ($scope.data.addressSelectData != null) {
        for (var i = 0; i < $scope.data.addressSelectData.length; i++) {
          if ($scope.stateProvinceGeoId != null && $scope.stateProvinceGeoId == $scope.data.addressSelectData[i].geoId) {
            var thisCityList = $scope.data.addressSelectData[i].child;
            for (var j = 0; j < thisCityList.length; j++) {
              if ($scope.geoIdCity != null && $scope.geoIdCity == thisCityList[j].geoId) {
                $scope.areaList = [];
                var areaList = thisCityList[j].child;
                for (var w = 0; w < areaList.length; w++) {
                  var areaMap = {"id": areaList[w].geoId, "name": areaList[w].geoName};
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
      var msg = "";
      if (input.geoIdCity == null || input.geoIdCity == '')msg += '市不能为空<br>';
      if (input.geoIdArea == null || input.geoIdArea == '')msg += '区不能为空<br>';
      if (input.address1 == null || input.address1 == '')msg += '详细地址不能为空<br>';
      if (input.contactNumber == null || input.contactNumber == '')msg += '电话号码不能为空<br>';
      if (input.email == null || input.email == '')msg += '电子邮箱不能为空<br>';
      if (msg != "") {
        popupUtil.showAlert('error', msg);
        return;
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
        stateProvinceGeoId: $scope.data.stateProvinceGeoId,
        geoIdCity: $scope.data.geoIdCity,
        geoIdArea: $scope.data.geoIdArea,
        address1: $scope.data.address1,
        contactNumber: $scope.data.contactNumber,
        email: $scope.data.email,
        partyId: $rootScope.partyId
      };
      //alert("test");

      PersonData.editPersonAddress(dataMap, function (data) {
        //alert("成功了");
        $ionicLoading.hide();
        if (data.resultMsg == 'Success' || data.resultMsg == '成功') {
          $ionicHistory.goBack();
        } else {
          popupUtil.showAlert('error', data.resultMsg);
        }
      });

    }

  })

  //标签****************************************************************************************************************
  .controller('PersonLabel', function ($scope, $location, $ionicPopup, PersonLabel, $rootScope) {
    //查询用户拥有标签
    PersonLabel.getAllLabl($rootScope.userLoginId, function (data) {
      $scope.labelList = data;
    });
    $scope.goLableInfo = function (partyId) {
      $location.path("/app/labelPersonList/" + partyId);
    };
    //创建标签
    $scope.showAddLab = function () {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.addLabel"/>' +
        '<button class="button" style="width:100%;background-color: #009dda;margin-top: 6px;" ng-click="createLabel();">创建</button><br/>' +
        '<button class="button" style="width: 100%;background-color: lightslategray;margin-top: 2px;" ng-click="closeLab();">关闭</button>',
        title: '创建标签',
        scope: $scope
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
      $scope.addLab = myPopup;
    };
    $scope.createLabel = function () {
      if ($scope.data.addLabel == null || $scope.data.addLabel == '') {
      } else {
        PersonLabel.addPersonLab($scope.data.addLabel, $rootScope.userLoginId, function (data) {
          console.log(data.partyId)
        });
        $scope.addLab.close();
        PersonLabel.getAllLabl($rootScope.userLoginId, function (data) {
          $scope.labelList = data;
        });
      }
    };
    $scope.closeLab = function () {
      $scope.addLab.close();
    };
    //删除标签
    $scope.deleteLable = function (partyId) {
      PersonLabel.removeLable(partyId);
      PersonLabel.getAllLabl($rootScope.userLoginId, function (data) {
        $scope.labelList = data;
      });
      // location.replace("http://localhost:63342/personErp/www/index.html?_ijt=tvc45tmh1jv443vv2cp2mvnf6j#/app/personLabel")
    };
    //下拉刷新
    $scope.doRefresh = function () {
      PersonLabel.getAllLabl($rootScope.userLoginId, function (data) {
        $scope.labelList = data;
      });
      $scope.$broadcast("scroll.refreshComplete");
    };
  })

  //标签内人员***********************************************************************************************************
  .controller('LabelPersonList', function ($scope, $stateParams, ActivityServer) {
    //准备参数
    $scope.tarjeta=localStorage.getItem("tarjeta");
    $scope.partyId=localStorage.getItem("partyId");
    $scope.img = localStorage.getItem("contactImg");

    //准备参数
    var tarjeta = localStorage.getItem("tarjeta");
    $scope.partyId = localStorage.getItem("partyId");
    $scope.img = localStorage.getItem("activityImg");
    $scope.contactImg = localStorage.getItem("contactImg");
    $scope.workEffortId = $stateParams.partyId;

    //获得活动的详细信息
    ActivityServer.getActivityDetails(tarjeta, $scope.workEffortId,function (data) {
      $scope.groupMemberList  = data.partyJoinEventsList;            //参与人员、
    })

  })
;
