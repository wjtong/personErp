angular.module('activity.services', [])

//活动连接后台＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  .factory('ActivityServer', function ($rootScope, $q, $http) {

    return {
      //新建活动
      createActivity: function (tarjeta, workEffortName, actualStartDate, estimatedCompletionDate, locationDesc, description, specialTerms, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createNewEvent",
          data: {
            tarjeta: tarjeta,
            workEffortName: workEffortName,
            actualStartDate: actualStartDate,
            estimatedCompletionDate: estimatedCompletionDate,
            locationDesc: locationDesc,
            description: description,
            specialTerms: specialTerms
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //新建活动项
      createActivityItem: function (tarjeta, workEffortId, workEffortName, actualStartDate, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createActivityProject",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            workEffortName: workEffortName,
            actualStartDate: actualStartDate
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //查询活动项
      findActivityItem: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryActivityProjects",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //活动主页活动列表
      myActivity: function (tarjeta, roleTypeId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryMyEvent",
          data: {
            tarjeta: tarjeta,
            roleTypeId: roleTypeId
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //活动详情
      goActivityDetails: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryMyEventDetail",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //活动报名
      signUp: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "translationActivity",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //新建活动账单
      createActivityPayment: function (tarjeta, workEffortId, partyIdFrom, invoiceApplied, amountApplied, payDate, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "createPartyPayment",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            partyIdFrom: partyIdFrom,
            invoiceApplied: invoiceApplied,
            amountApplied: amountApplied,
            payDate: payDate
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //查询活动账单
      findActivityPayment: function (tarjeta, workEffortId, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "queryActivityPayment",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
      //选择活动地址
      selectAddress: function (query, region, city_limit, output, ak) {
        var d = $q.defer();
        var promise = d.promise;
        $http.jsonp("http://api.map.baidu.com/place/v2/suggestion?query=" + query + "&region=" + region + "&output=" + output + "&ak=" + ak + "&city_limit=" + city_limit + "&callback=JSON_CALLBACK")
          .success(function (data) {
            d.resolve(data);
          })
          .error(function (error) {
            d.reject(error);
          });

        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      },
      //通过IP获得当前位置信息
      currentAddress: function (ak) {
        var d = $q.defer();
        var promise = d.promise;
        $http.jsonp("http://api.map.baidu.com/location/ip?ak=" + ak + "&callback=JSON_CALLBACK")
          .success(function (data) {
            console.log(data)
            d.resolve(data);
          })
          .error(function (error) {
            d.reject(error);
          });
        promise.success = function (fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function (fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      },
      //活动邀请好友发送短信
      sendInvitation: function (tarjeta, workEffortId, partyId, contact, cb) {
        $.ajax({
          url: $rootScope.activityInterfaceUrl + "sendInvitation",
          data: {
            tarjeta: tarjeta,
            workEffortId: workEffortId,
            partyId: partyId,
            contact: contact
          },
          async: false,
          type: 'POST',
          success: function (result) {
            if (jQuery.type(result) === "string") {
              result = jQuery.parseJSON(result);
            }
            if (result.resultMap != null) {
              if ($.type(cb) === 'function') {
                cb(result.resultMap);
              }
            }
          }
        });
      },
    }
  })

  //活动场所*************************************************************************************************************
  .factory('ActivityPlace', function () {
    var activityPlace = [
      {id: 'PLA_001', placeName: '汉拿山滑雪场', number: '20人以上', price: "人均60元", img: 'img/theme/place1.jpeg'},
      {id: 'PLA_002', placeName: '永久棋牌室', number: '4-8人', price: "人均20元", img: 'img/theme/place2.jpeg'},
      {id: 'PLA_003', placeName: '长白山温泉度假村', number: '10-20人', price: "人均160元", img: 'img/theme/place3.jpeg'},
      {id: 'PLA_004', placeName: '歌仙台球厅', number: '5-10人', price: "人均30元", img: 'img/theme/place4.jpeg'},
      {id: 'PLA_005', placeName: '国信南山游泳馆', number: '10人以上', price: "人均60元", img: 'img/theme/place5.jpeg'},
      {id: 'PLA_006', placeName: '亿家合大酒店', number: '20－40人', price: "人均230元", img: 'img/theme/place6.jpeg'}
    ]
    return {
      getAll: function () {
        return activityPlace
      },
      getPlaceInfo: function (id) {
        for (var i = 0; i < activityPlace.length; i++) {
          if (id == activityPlace[i].id) {
            return activityPlace[i]
          }
        }
      }
    }
  })

  //活动模板*************************************************************************************************************
  .factory('ActivityTemplate', function () {
    var activityTemplate = [
      {
        id: 'ACT_001',
        placeName: '风雪情怀长白山',
        img1: 'img/template/changbaishan1.jpeg',
        msg1: '东北的黑土地，沃野千里，山川河流，冰雪森林以及我梦想中的天上圣湖—天池，一直像一个梦一样，在每一个冰雪纷飞的季节，都会跑到我的脑海中来，我曾经为自己的一次次错过而懊恼不已，然而，更多的时候，又在遗憾中，再次与美丽擦肩而过，当煦暖的春风，吹绿江南两岸，伴着潺潺的溪流，奔向远方时，风雪长白山，即将告别冬日情怀，我知道，自己该启程了。'
        ,
        location: '长白山北坡大门 上午：9:00',
        img2: 'img/template/changbaishan2.jpeg',
        msg2: '按照预先的计划，第二天是滑雪的日子睡到自然醒，吃早饭的路上，途径走廊，无意间向窗外一瞥，一片银装素裹的世界， 一夜间，大雪将至，悄无声息，带着满满的惊喜。',
        location2: '汉拿山滑雪场  上午：10:00－12：00',
        img3: 'img/template/changbaishan3.jpeg',
        msg3: '经过大家伙投票决定，最后一天我们决定去泡温泉，边赏雪一边泡温泉 温泉游结束了浪漫的冬季之旅。',
        location3: '露天温泉   通过投票决定',
        img4: [
          {img: 'img/template/changbaishan4.1.jpeg'},
          {img: 'img/template/changbaishan4.2.jpeg'},
          {img: 'img/template/changbaishan4.3.png'},
        ],
        msg4: '幸福总是短暂的，在这里记录我们共同经历的美好回忆',
        location4: '上传相关活动照片',
        img5: 'img/template/changbaishan5.jpeg',
        msg5: '留恋和你们在一起的时光，期待下一次活动的道来',
        location5: '鸭绿江大桥 2017-10-02'
      },

    ]
    return {
      getTemplateInfo: function (id) {
        for (var i = 0; i < activityTemplate.length; i++) {
          if (id == activityTemplate[i].id) {
            return activityTemplate[i]
          }
        }
      }
    }
  })

  //活动模版＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  .factory('Activity', function () {
    var activity = [
      {
        id: 'ACT_001',
        title: '风雪情怀长白山',
        organizer: 'jinlongxi',
        createTime: '2016-12-07',
        time: '20:00-21:00',
        img: 'img/template/changbaishan1.jpeg',
        name: '金龙熙',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/dengshan1.jpeg'},
          {img: 'img/resources/dengshan2.jpeg'},
          {img: 'img/resources/dengshan5.jpeg'},
          {img: 'img/resources/dengshan6.jpeg'},
          {img: 'img/resources/dengshan7.jpeg'}
        ]
      },
      {
        id: 'ACT_002',
        title: 'Python培训',
        organizer: 'zhangwenwen',
        createTime: '2016-12-07',
        time: '20:00-21:00',
        img: 'img/resources/python.jpeg',
        name: '张文文',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/python1.jpeg'},
          {img: 'img/resources/python2.png'},
          {img: 'img/resources/python3.jpeg'},
          {img: 'img/resources/python4.jpeg'},
          {img: 'img/resources/python5.jpeg'}
        ]
      },
      {
        id: 'ACT_003',
        title: '慢跑',
        createTime: '2016-12-07',
        organizer: 'zhangwenwen',
        time: '20:00-21:00',
        img: 'img/resources/manpao.jpeg',
        name: '张文文',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/paobu1.jpeg'},
          {img: 'img/resources/paobu2.jpeg'},
          {img: 'img/resources/paobu3.jpeg'},
          {img: 'img/resources/paobu4.jpeg'},
          {img: 'img/resources/paobu5.jpeg'}
        ]
      },
      {
        id: 'ACT_004',
        title: '斯诺克游戏赛',
        type: 'finish',
        createTime: '2016-12-7',
        organizer: 'lining',
        time: '20:00-21:00',
        img: 'img/resources/snk3.jpeg',
        name: '李宁',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/snk1.jpeg'},
          {img: 'img/resources/snk2.jpeg'}
        ]
      },
      {
        id: 'ACT_005',
        title: '广场舞',
        type: 'finish',
        createTime: '2016-12-7',
        organizer: 'shenyanlin',
        time: '20:00-21:00',
        img: 'img/resources/guangchang.jpeg',
        name: '沈演麟',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/guangchang1.jpeg'},
          {img: 'img/resources/guangchang2.jpeg'}
        ]
      },
      {
        id: 'ACT_006',
        title: '活动后聚会',
        type: 'finish',
        createTime: '2016-12-7',
        organizer: 'shenyanlin',
        time: '20:00-21:00',
        img: 'img/theme/juhui1.jpeg',
        name: '沈演麟',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/theme/juhui2.jpeg'},
          {img: 'img/theme/juhui3.jpeg'}
        ]
      }
    ];
    var finishActivty = [
      {
        id: 'ACT_004',
        title: '斯诺克游戏赛',
        createTime: '2016-12-7',
        organizer: 'zhangwenwen',
        time: '20:00-21:00',
        img: 'img/resources/snk3.jpeg',
        name: '张文文',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/snk1.jpeg'},
          {img: 'img/resources/snk2.jpeg'}
        ]
      }
    ];
    var collectActivty = [
      {
        id: 'ACT_003',
        title: '慢跑',
        createTime: '2016-12-7',
        organizer: 'zhangwenwen',
        time: '20:00-21:00',
        img: 'img/resources/manpao.jpeg',
        name: '张文文',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/paobu1.jpeg'},
          {img: 'img/resources/paobu2.jpeg'},
          {img: 'img/resources/paobu3.jpeg'},
          {img: 'img/resources/paobu4.jpeg'},
          {img: 'img/resources/paobu5.jpeg'}
        ]
      }
    ];
    var relatedActivities = [
      {
        id: 'ACT_005',
        title: '广场舞',
        type: 'finish',
        createTime: '2016-12-7',
        organizer: 'shenyanlin',
        time: '20:00-21:00',
        img: 'img/resources/guangchang.jpeg',
        name: '沈演麟',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/resources/guangchang1.jpeg'},
          {img: 'img/resources/guangchang2.jpeg'}
        ]
      },
      {
        id: 'ACT_006',
        title: '活动后聚会',
        type: 'finish',
        createTime: '2016-12-7',
        organizer: 'shenyanlin',
        time: '20:00-21:00',
        img: 'img/theme/juhui1.jpeg',
        name: '沈演麟',
        address: '中国，上海，长宁',
        addressDet: '德元南路 989号',
        information: '希望有兴趣的伙伴能够一起出发，共同度过一段美好时光',
        picture: [
          {img: 'img/theme/juhui2.jpeg'},
          {img: 'img/theme/juhui3.jpeg'}
        ]
      }
    ];
    var personList = [
      {
        id: 'PERS_10001', img: 'img/team/fenghao.png', name: '冯浩', company: '上海班富电子商务', address: '中国，浙江，杭州',
        phone: '13801887706', sex: 'F', email: 'hao.feng@banff-tech.com', labelId: '1'
      },
      {
        id: 'PERS_10002', img: 'img/team/zhangwenwen.jpeg', name: '张文文', company: '上海班富电子商务', address: '中国，上海，松江',
        phone: '13162707331', sex: 'F', email: 'wenwen.zhang@banff-tech.com', labelId: '2'
      },
      {
        id: 'PERS_10003', img: 'img/team/shenyinling.png', name: '沈寅麟', company: '上海班富电子商务', address: '中国，上海',
        phone: '15000035538', sex: 'F', email: 'yinlin.shen@banff-tech.com', labelId: '3'
      }
    ];

    var discuss = [
      {id: 'DIS_10001', discuss: '很期待一起去运动', name: '王坤', img: 'img/team/wangkun.jpg', date: '2017-02-01 20:18'},
      {id: 'DIS_10002', discuss: '时间可以变动吗？', name: '金龙熙', img: 'img/team/jinlongxi.png', date: '2017-02-12 12:00'},
      {id: 'DIS_10003', discuss: '下次活动还想参加', name: '李宁', img: 'img/team/lining.jpg', date: '2017-02-01 12:00'}
    ];

    var button = [
      {id: 'But_10001', name: '电话号码'},
      {id: 'But_10002', name: '姓名'},
      {id: 'But_10003', name: '身份证号'},
      {id: 'But_10004', name: '地址'},
      {id: 'But_10005', name: '性别'}
    ];
    return {
      getRelatedActivities: function () {
        return relatedActivities
      },
      getAllActivity: function () {
        return activity
      },
      getAllButton: function () {
        return button
      },
      getCollectActivity: function () {
        return collectActivty
      },
      getFinishActivity: function () {
        return finishActivty
      },
      getAllDiscuss: function () {
        return discuss
      },
      getAllPerson: function () {
        return personList
      },
      getMyActivty: function (organizer) {
        var myActivtyList = [];
        for (var i = 0; i < activity.length; i++) {
          if (organizer == activity[i].organizer) {
            myActivtyList.push(activity[i]);
          }
        }
        return myActivtyList;
      },
      getActivityInfo: function (id) {
        for (var i = 0; i < activity.length; i++) {
          if (id == activity[i].id) {
            return activity[i];
          }
        }
      }
    }
  })
  //活动主题图片＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  .factory('ThemeImage', function () {
    var partyImg = [
      {id: 'Pic_10001', img: 'img/theme/juhui1.jpeg'},
      {id: 'Pic_10002', img: 'img/theme/juhui2.jpeg'},
      {id: 'Pic_10003', img: 'img/theme/juhui3.jpeg'},
      {id: 'Pic_10004', img: 'img/theme/juhui4.jpeg'},
      {id: 'Pic_10005', img: 'img/theme/juhui5.jpeg'},
    ];
    var sportsImg = [
      {id: 'Pic_10006', img: 'img/theme/yundong1.jpeg'},
      {id: 'Pic_10007', img: 'img/theme/yundong2.jpeg'},
      {id: 'Pic_10008', img: 'img/theme/yundong3.jpeg'},
      {id: 'Pic_10009', img: 'img/theme/yundong4.jpeg'},
      {id: 'Pic_10010', img: 'img/theme/yundong5.jpeg'}
    ];
    var familyImg = [
      {id: 'Pic_10011', img: 'img/theme/jiating1.jpeg'},
      {id: 'Pic_10012', img: 'img/theme/jiating2.jpeg'},
      {id: 'Pic_10013', img: 'img/theme/jiating3.jpeg'},
      {id: 'Pic_10014', img: 'img/theme/jiating4.jpeg'},
      {id: 'Pic_10015', img: 'img/theme/jiating5.jpeg'}
    ];
    var businessImg = [
      {id: 'Pic_10016', img: 'img/theme/shangwu1.jpeg'},
      {id: 'Pic_10017', img: 'img/theme/shangwu2.jpeg'},
      {id: 'Pic_10018', img: 'img/theme/shangwu3.jpeg'},
      {id: 'Pic_10019', img: 'img/theme/shangwu4.jpeg'},
      {id: 'Pic_10020', img: 'img/theme/shangwu5.jpeg'}
    ];
    var shareImg = [
      {id: 'Pic_10021', img: 'img/share/Contact.png', name: '手机通讯录'},
      //{id:'Pic_10022',img:'img/share/QQ.jpeg',name:'QQ'},
      {id: 'Pic_10023', img: 'img/share/li1.jpeg', name: '梨友录'},
      {id: 'Pic_10024', img: 'img/share/微信.jpeg', name: '微信'},
      // {id:'Pic_10025',img:'img/share/新浪jpeg.jpeg',name:'新浪微博'},
      {id: 'Pic_10026', img: 'img/share/朋友圈.jpeg', name: '朋友圈'}
    ];
    var Img =
    {id: 'Pic_10080', img: 'img/resources/paobu3.jpeg', img2: 'img/team/img1-sm.jpg'};
    return {
      getPartyImg: function () {
        return partyImg;
      },
      getRangeImg: function () {
        return Img;
      },
      getShareImg: function () {
        return shareImg;
      },
      getSportsImg: function () {
        return sportsImg;
      },
      getFamilyImg: function () {
        return familyImg;
      },
      getBusinessImg: function () {
        return businessImg;
      }
    }
  });



