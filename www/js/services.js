angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('MyOrder',function () {
    var selOrder = [
        {
          orderId:'SAL_10001',
          img:'img/team/zhangwenwen.jpeg',
          orderTypeId:'sal',
          orderType:'销售订单',
          name:'张文文',
          company:'上海班富电子商务_程序员',
          address:'中国，上海，松江',
          phoneNumber:'15072200010',
          desc:'软件定制',
          orderTime:'2016-11-22 14:21:22',
          lastUPdateTime:'2016-11-23 10:34:11',
          grandTotal:400,
          orderStatus:'已批准',
          paymentMethod:'支付宝、微信',
          pushed:5,
          collect:3,
          comments:4,
          surplus:2
        },
        {
          orderId:'SAL_10002',
          img:'img/team/fenghao.png',
          orderTypeId:'sal',
          orderType:'销售订单',
          name:'冯浩',
          company:'上海班富电子商务_经理',
          phoneNumber:'13801887706',
          address:'中国，浙江，杭州',
          desc:'更换汽车零件',
          orderTime:'2016-11-20 10:21:22',
          lastUPdateTime:'2016-11-20 14:34:11',
          grandTotal:4130,
          orderStatus:'已完成',
          paymentMethod:'现金',
          pushed:5,
          collect:3,
          comments:4,
          surplus:7,
          adjustment:[
            {
              adjustmentReason:'线下优惠',
              adjustmentPrice:-300,
              createBy:'zhangwenwen'
            },
            {
              adjustmentReason:'返还邮费',
              adjustmentPrice:-100,
              createBy:'zhangwenwen'
            }
          ]
        },
        {
          orderId:'SAL_10003',
          img:'',
          orderTypeId:'sal',
          orderType:'销售订单',
          name:'童文戟',
          company:'素然服饰',
          address:'加拿大',
          phoneNumber:'13764302779',
          desc:'汽车',
          orderTime:'2016-11-03 14:21:22',
          lastUPdateTime:'2016-11-04 10:34:11',
          grandTotal:2360,
          orderStatus:'已完成',
          paymentMethod:'微信',
          pushed:5,
          collect:3,
          comments:4,
          surplus:3
        },
        {
          orderId:'SAL_10004',
          img:'',
          orderTypeId:'sal',
          orderType:'销售订单',
          name:'王亮',
          company:'素然服饰',
          address:'中国，安徽，池州',
          phoneNumber:'15656690250',
          desc:'电动车',
          orderTime:'2016-11-22 14:21:22',
          lastUPdateTime:'2016-11-23 10:34:11',
          grandTotal:400,
          orderStatus:'已批准',
          paymentMethod:'支付宝',
          pushed:5,
          collect:3,
          comments:4,
          surplus:2

        }
    ];
    var purOrder = [
        {
          orderId:'PUR_10001',
          img:'',
          orderTypeId:'pur',
          orderType:'采购订单',
          name:'童文戟',
          company:'素然服饰',
          address:'加拿大',
          phoneNumber:'13764302779',
          desc:'采购服饰',
          orderTime:'2016-11-22 14:21:22',
          lastUPdateTime:'2016-11-23 10:34:11',
          grandTotal:400,
          orderStatus:'已批准',
          paymentMethod:'支付宝、微信',
          pushed:3,
          collect:3,
          comments:4,
          surplus:4
        },
        {
          orderId:'PUR_10002',
          img:'img/team/fenghao.png',
          orderTypeId:'pur',
          orderType:'采购订单',
          name:'冯浩',
          company:'上海班富电子商务',
          phoneNumber:'13801887706',
          address:'中国，浙江，杭州',
          desc:'软件定制',
          orderTime:'2016-11-23 10:21:22',
          lastUPdateTime:'2016-11-23 14:34:11',
          grandTotal:400,
          orderStatus:'已完成',
          paymentMethod:'支付宝',
          pushed:2,
          collect:3,
          comments:4
        }
    ];
    var devOrder = [
      {
        orderId:'DEV_10001',
        img:'img/team/chenyu.jpg',
        orderTypeId:'dev',
        orderType:'开发订单',
        name:'陈宇',
        company:'上海班富电子商务',
        address:'中国，浙江，杭州',
        phoneNumber:'13764302779',
        desc:'开发云卡',
        orderTime:'2016-11-22 14:21:22',
        lastUPdateTime:'2016-11-29 10:34:11',
        grandTotal:400,
        orderStatus:'已批准',
        paymentMethod:'支付宝、微信',
        pushed:3,
        collect:3,
        comments:4,
        surplus:3
      },
      {
        orderId:'DEV_10002',
        img:'img/team/fenghao.png',
        orderTypeId:'dev',
        orderType:'开发订单',
        name:'冯浩',
        company:'上海班富电子商务',
        phoneNumber:'13801887706',
        address:'中国，浙江，杭州',
        desc:'开发软件',
        orderTime:'2016-11-23 10:21:22',
        lastUPdateTime:'2016-11-29 14:34:11',
        grandTotal:400,
        orderStatus:'已完成',
        paymentMethod:'支付宝',
        pushed:2,
        collect:3,
        comments:4,
        surplus:3
      }
    ];
    return{
        getSalOrder: function () {
            return selOrder;
        },
        getPurOrder:function () {
            return purOrder;
        },
        getDevOrder:function () {
          return devOrder;
        },
        getSalOrderInfo:function (orderId) {
            for(var i=0;i<selOrder.length;i++){
                if(orderId == selOrder[i].orderId){
                    return selOrder[i];
                }
            }
        },
        getPurOrderInfo:function (orderId) {
            for(var i=0;i<purOrder.length;i++){
                if(orderId == purOrder[i].orderId){
                    return purOrder[i];
                }
            }
        },
        getDevOrderInfo:function (orderId) {
          for(var i=0;i<devOrder.length;i++){
            if(orderId == devOrder[i].orderId){
              return devOrder[i];
            }
          }
        },
        updateOrderStatus:function (orderId, statusName) {
            var flag = true;
            for(var i=0;i<selOrder.length;i++){
              if(selOrder[i].orderId == orderId){
                selOrder[i].orderStatus = statusName;
                flag = false;
                return
              }
            }
            if(flag){
              for(var i=0;i<purOrder.length;i++){
                if(purOrder[i].orderId == orderId){
                  purOrder[i].orderStatus = statusName;
                  return
                }
              }
            }
        },
        addAdjustment:function (orderId,adjustmentPrice,adjustmentReason,createBy) {
          var flag = true;
          for(var i=0;i<selOrder.length;i++){
            if(selOrder[i].orderId == orderId){
              if(selOrder[i].adjustment == null){
                var adjustment = [];
                var adjustmentInfo = {adjustmentPrice:adjustmentPrice,adjustmentReason:adjustmentReason,createBy:createBy};
                adjustment.push(adjustmentInfo);
                selOrder[i].adjustment = adjustment;
                selOrder[i].grandTotal = selOrder[i].grandTotal + adjustmentPrice;
              }else{
                var adjustmentInfo = {adjustmentPrice:adjustmentPrice,adjustmentReason:adjustmentReason,createBy:createBy};
                selOrder[i].adjustment.push(adjustmentInfo);
                selOrder[i].grandTotal = selOrder[i].grandTotal + adjustmentPrice;
              }
              flag = false;
              return
            }
          }
          if(flag){
            for(var i=0;i<purOrder.length;i++){
              if(purOrder[i].orderId == orderId){
                if(purOrder[i].adjustment == null){
                  var adjustment = [];
                  var adjustmentInfo = {adjustmentPrice:adjustmentPrice,adjustmentReason:adjustmentReason,createBy:createBy};
                  adjustment.push(adjustmentInfo);
                  purOrder[i].adjustment = adjustment;
                  purOrder[i].grandTotal = purOrder[i].grandTotal + adjustmentPrice;
                }else{
                  var adjustmentInfo = {adjustmentPrice:adjustmentPrice,adjustmentReason:adjustmentReason,createBy:createBy};
                  purOrder[i].adjustment.push(adjustmentInfo);
                  purOrder[i].grandTotal = purOrder[i].grandTotal + adjustmentPrice;
                }
                return
              }
            }
          }
        }
    }

})
.factory('MyOrderInfo',function () {
    var orderInfo = [
      {
        orderId:'SAL_10001',
        item:[
          {
            productionId:'PRO_100001',
            shipId:'SHIP_100001',
            kd_code:'639820194',
            productId:'130500010',
            estimateTiem:'2016-11-23 00:00:00',
            productName:'项目赶进度，提供外包',
            price:400,
            abstract:{
              beginTime:'2016-11-23 00:00:00',
              finishTime:'2017-01-23 00:00:00',
              operator:'李德',
              material:'100',
              stage:'工序一',
              output:'30'
            }
          }
        ]
      },
      {
        orderId:'SAL_10002',
        item:[
          {
            productionId:'PRO_100002',
            shipId:'SHIP_100002',
            kd_code:'639820191',
            productId:'130500011',
            estimateTiem:'2016-11-20 12:00:00',
            productName:'汽车大灯总成',
            price:1000,
            abstract:{
              beginTime:'2016-12-23 00:00:00',
              finishTime:'2017-02-23 00:00:00',
              operator:'刘懂',
              material:'30个',
              stage:'工序三',
              output:'3组'
            }
          },
          {
            productionId:'PRO_100003',
            shipId:'SHIP_100003',
            kd_code:'639820192',
            productId:'130500012',
            estimateTiem:'2016-11-20 12:00:00',
            productName:'汽车前引擎盖',
            price:1000
          },
          {
            productionId:'PRO_100004',
            shipId:'SHIP_100004',
            kd_code:'639820194',
            productId:'130500013',
            estimateTiem:'2016-11-20 12:00:00',
            productName:'汽车轮毂*4',
            price:1000
          },
          {
            productionId:'PRO_100005',
            shipId:'SHIP_100005',
            kd_code:'639820195',
            productId:'130500014',
            estimateTiem:'2016-11-20 12:00:00',
            productName:'汽车轮胎*4',
            price:530
          }
        ]
      },
      {
        orderId:'SAL_10003',
        item:[
          {
            productionId:'PRO_100006',
            shipId:'SHIP_100006',
            kd_code:'639820196',
            productId:'130500016',
            estimateTiem:'2016-11-04 10:34:11',
            productName:'jeep 牧马人',
            price:400000,
            abstract:{
              beginTime:'2016-12-18 00:00:00',
              finishTime:'2017-03-13 00:00:00',
              operator:'李强',
              material:'15',
              stage:'工序三',
              output:'10'
            }
          }
        ]
      },
      {
        orderId:'SAL_10004',
        item:[
          {
            productionId:'PRO_100007',
            shipId:'SHIP_100007',
            kd_code:'639820197',
            productId:'130500017',
            estimateTiem:'2016-11-23 10:34:11',
            productName:'电动车',
            price:400,
            abstract:{
              beginTime:'2016-11-29 00:00:00',
              finishTime:'2017-05-23 00:00:00',
              operator:'刘懂明',
              material:'300',
              stage:'工序三',
              output:'15'
            }
          }
        ]
      },
      {
        orderId:'PUR_10001',
        item:[
          {
            productionId:'PRO_100008',
            shipId:'SHIP_100008',
            kd_code:'639820198',
            productId:'130500018',
            estimateTiem:'2016-11-23 10:34:11',
            productName:'素然手语系列衣服',
            price:400
          }
        ]
      },
      {
        orderId:'PUR_10002',
        item:[
          {
            productionId:'PRO_100009',
            shipId:'SHIP_100009',
            kd_code:'639820199',
            productId:'130500019',
            estimateTiem:'2016-11-23 14:34:11',
            productName:'购买 ionic 的定制软件，进行二次开发',
            price:400
          }
        ]
      },
      {
        orderId:'DEV_10001',
        item:[
          {
            productionId:'PRO_100010',
            shipId:'SHIP_100010',
            kd_code:'639820200',
            productId:'130500020',
            estimateTiem:'2016-11-25 18:34:11',
            productName:'购买阿里云服务器，搭建测试环境',
            price:320,
            abstract:{
              beginTime:'2016-11-20 00:00:00',
              finishTime:'2016-12-23 00:00:00',
              operator:'金龙熙',
              material:'2台',
              stage:'单元测试',
              output:'2'
            }
          }
        ]
      },
      {
        orderId:'DEV_10002',
        item:[
          {
            productionId:'PRO_100011',
            shipId:'SHIP_100011',
            kd_code:'639820201',
            productId:'130500020',
            estimateTiem:'2016-11-25 14:37:11',
            productName:'购买手机，用于测试',
            price:1000,
            abstract:{
              beginTime:'2016-11-28 00:00:00',
              finishTime:'2017-02-23 00:00:00',
              operator:'李明',
              material:'1',
              stage:'单元测试',
              output:''
            }
          }
        ]
      }
    ];

    return{
      getInfo:function (orderId) {
        for(var i=0;i<orderInfo.length;i++){
          if(orderInfo[i].orderId == orderId){
            return orderInfo[i].item;
          }
        }
      }
    }
})
.factory("Home",function () {
    var mainLists = [
        {img:'img/team/img1-md.jpg', id:1, type:'order', orderTypeId:'sal', name:'张总', company:'德阳工厂', address:'海宁，浙江，中国',desc:'500公斤皮料已送到，450公斤接收入库，50公斤未接收，2016/10/08',like:3,comments:5},
        {img:'img/team/img2-md.jpg', id:2, type:'server', name:'小刘', company:'德阳工厂', address:'海宁，浙江，中国',desc:'已创建生产，订单号12345678900，2016/10/07',collect:2,comments:8},
        {img:'img/team/img3-md.jpg', id:3, type:'order', orderTypeId:'sal', name:'张三', company:'德阳贸易', address:'杭州，浙江，中国',desc:'已发布产品 PVC，2016/10/06',collect:5,comments:3},
        {img:'img/team/img4-md.jpg', id:4, type:'server', name:'李四', company:'德阳贸易', address:'海宁，浙江，中国',desc:'已创建生产订单 PVC 1000米，2016/10/05',collect:1,comments:1},
        {img:'img/team/img5-md.jpg', id:5, type:'order', orderTypeId:'pur', name:'张总', company:'德阳工厂', address:'海宁，浙江，中国',desc:'已发布生产服务 PVC，2016/10/04',collect:2,comments:8}
    ];
    return{
        getAll:function () {
            return mainLists;
        }
    }
})
.factory("GroupChat",function () {
  var groupList = [
    {id:'PERS_10001',img:'img/team/fenghao.png',name:'冯浩',company:'上海班富电子商务',address:'中国，浙江，杭州',
      phone:'13801887706',sex:'F',email:'hao.feng@banff-tech.com',labelId:1},
    {id:'PERS_10002',img:'img/team/zhangwenwen.jpeg',name:'张文文',company:'上海班富电子商务',address:'中国，上海，松江',
      phone:'13162707331',sex:'F',email:'wenwen.zhang@banff-tech.com',labelId:2},
    {id:'PERS_10003',img:'img/team/shenyinling.png',name:'沈寅麟',company:'上海班富电子商务',address:'中国，上海',
      phone:'15000035538',sex:'F',email:'yinlin.shen@banff-tech.com',labelId:3},
  ];
  return{
    getAll:function () {
      return groupList;
    }
  }
})
.factory('Contact',function () {
    var personmainLists = [
        {id:'PERS_10001',img:'img/team/fenghao.png',name:'冯浩',company:'上海班富电子商务',address:'中国，浙江，杭州',price:'80',
          phone:'13801887706',sex:'F',email:'hao.feng@banff-tech.com',labelId:'1'},
        {id:'PERS_10002',img:'img/team/zhangwenwen.jpeg',name:'张文文',company:'上海班富电子商务',address:'中国，上海，松江',price:'90',
          phone:'13162707331',sex:'F',email:'wenwen.zhang@banff-tech.com',labelId:'2'},
        {id:'PERS_10003',img:'img/team/shenyinling.png',name:'沈寅麟',company:'上海班富电子商务',address:'中国，上海',price:'100',
          phone:'15000035538',sex:'F',email:'yinlin.shen@banff-tech.com',labelId:'3'},
        {id:'PERS_10004',img:'img/team/wangkun.jpg',name:'王坤',company:'上海班富电子商务',address:'中国,上海，长宁',price:'110',
          phone:'18772115070',sex:'F',email:'kun.wang@banff-tech.com',labelId:'4'},
        {id:'PERS_10005',img:'img/team/lining.jpg',name:'李宁',company:'上海班富电子商务',address:'中国，上海，长宁',price:'120',
          phone:'18702104254',sex:'F',email:'ning.li@banff-tech.com',labelId:'3'},
        {id:'PERS_10006',img:'img/team/shubenkun.jpg',name:'苏本坤',company:'上海班富电子商务',address:'中国 ，浙江，杭州',price:'130',
          phone:'18614055178',sex:'F',email:'benkun.su@banff-tech.com',labelId:'2'},
        {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',company:'上海班富电子商务',address:'中国 ，浙江，杭州',price:'140',
          phone:'15910989807',sex:'F',email:'yu.chen@banff-tech.com',labelId:'1'},
        {id:'PERS_10008',img:'img/team/jinlongxi.png',name:'金龙熙',company:'上海班富电子商务',address:'中国，上海，嘉定',price:'150',
          phone:'15618323607',sex:'F',email:'longxi.mei@banff-tech.com',labelId:'1'}
    ];
    return {
        getAll:function () {
            return personmainLists;
        },
        get:function (id) {
            for(var i=0 ;i<personmainLists.length; i++){
                if(personmainLists[i].id == id){
                    return personmainLists[i];
                }
            }
        },
        getPersonLabel:function (labelId) {
            var labelList = [] ;
            for(var i=0;i<personmainLists.length;i++){
                if(personmainLists[i].labelId == labelId){
                    labelList.push(personmainLists[i]);
                }
            }
            return labelList;
        },
        getPersonNoinLabel:function (labelId) {
            var labelList = [] ;
            for(var i=0;i<personmainLists.length;i++){
              if(personmainLists[i].labelId != labelId){
                labelList.push(personmainLists[i]);
              }
            }
            return labelList;
        }
    }
})
.factory('myresources',function () {
    var resourcesList = [
      {
        id:'RES_100001',
        img:'',
        descImg:"img/resources/facility.png",
        title:"软件服务",
        name:'童文戟',
        company:'素然服饰',
        address:'加拿大',
        desc:'ofbiz仓库的讲解',
        pushed:5,
        price:124.00,
        collect:3,
        comments:4
      },
      {
        id:'RES_100002',
        img:'img/team/zhangwenwen.jpeg',
        descImg:"img/resources/chongzhuang.png",
        title:"电脑系统维护",
        name:'张文文',
        company:'上海班富电子商务',
        address:'中国，上海，松江',
        desc:'电脑系统崩溃，系统重装',
        pushed:5,
        price:50.00,
        collect:3,
        comments:4
      },
      {
        id:'RES_100003',
        img:'',
        descImg:"img/resources/chongzhuang.png",
        title:"数据恢复",
        name:'王亮',
        company:'素然服饰',
        address:'中国，安徽，池州',
        desc:'电脑中的公司数据被删除掉，数据恢复',
        pushed:5,
        price:200.00,
        collect:3,
        comments:4
      },
      {
        id:'RES_100004',
        img:'img/team/shenyinling.png',
        descImg:"img/resources/yanfa.jpg",
        title:"系统开发",
        name:'沈寅麟',
        company:'上海班富电子商务',
        address:'中国，上海',
        desc:'对上海 aland 的研发系统进行开发/月',
        pushed:5,
        price:10000.00,
        collect:3,
        comments:4
      }
    ];

    var resourcesListOthers = [
      {
        id:'RES_100005',
        img:'img/resources/nianzhong.jpeg',
        descImg:"img/resources/nianzhong.jpeg",
        title:"年终总结",
        name:'冯浩',
        company:'上海班富电子商务',
        address:'中国，上海',
        desc:'年终总结',
        pushed:5,
        price:'500',
        collect:3,
        comments:4
      },
      {
        id:'RES_100006',
        img:'img/resources/fabu.jpeg',
        descImg:"img/resources/fabu.jpeg",
        title:"产品发布",
        name:'张文文',
        company:'上海班富电子商务',
        address:'中国，上海，松江',
        desc:'产品发布',
        pushed:5,
        price:'890',
        collect:3,
        comments:4
      },
      {
        id:'RES_100007',
        img:'',
        descImg:"img/resources/chongzhuang.png",
        title:"数据恢复",
        name:'王亮',
        company:'素然服饰',
        address:'中国，安徽，池州',
        desc:'电脑中的公司数据被删除掉，数据恢复',
        pushed:5,
        price:200.00,
        collect:3,
        comments:4
      },
      {
        id:'RES_100008',
        img:'img/team/shenyinling.png',
        descImg:"img/resources/yanfa.jpg",
        title:"系统开发",
        name:'沈寅麟',
        company:'上海班富电子商务',
        address:'中国，上海',
        desc:'对上海 aland 的研发系统进行开发/月',
        pushed:5,
        price:10000.00,
        collect:3,
        comments:4
      }
    ];
    var selectOption = [
      {id:'me',name:'李四'},
      {id:'zhangzong',name:'张总'},
      {id:'lisi',name:'李四'},
      {id:'xiaoliu',name:'小刘'},
      {id:'zhangsan',name:'张三'},
    ];

    return{
        getResourcesAll:function () {
            return resourcesList;
        },
        getResourcesOthersAll:function () {
          return resourcesListOthers;
        },
        getResourceInfo:function (id) {
            for(var i=0 ;i<resourcesList.length; i++){
                if(resourcesList[i].id == id){
                    return resourcesList[i];
                }
            }
        },
        getResourceOtherInfo:function (id) {
          for(var i=0 ;i<resourcesListOthers.length; i++){
            if(resourcesListOthers[i].id == id){
              return resourcesListOthers[i];
            }
          }
        },
        getSelectOption:function () {
            return selectOption;
        }
    }
})
.factory('ChatList',function () {
    var personList = [
      {id:'PERS_10001',img:'img/team/fenghao.png',name:'冯浩',company:'上海班富电子商务',address:'中国，浙江，杭州',
        phone:'13801887706',sex:'F',email:'hao.feng@banff-tech.com',labelId:'1'},
      {id:'PERS_10002',img:'img/team/zhangwenwen.jpeg',name:'张文文',company:'上海班富电子商务',address:'中国，上海，松江',
        phone:'13162707331',sex:'F',email:'wenwen.zhang@banff-tech.com',labelId:'2'},
      {id:'PERS_10003',img:'img/team/shenyinling.png',name:'沈寅麟',company:'上海班富电子商务',address:'中国，上海',
        phone:'15000035538',sex:'F',email:'yinlin.shen@banff-tech.com',labelId:'3'},
    ];
    var chatList = [
      {
        id:1,
        title:'aland开票讨论',
        typeName:'订单',
        participants:[
          {id:'PERS_10001',img:'img/team/fenghao.png',name:'冯浩',company:'上海班富电子商务',address:'中国，浙江，杭州',
            phone:'13801887706',sex:'F',email:'hao.feng@banff-tech.com',labelId:'1'},
          {id:'PERS_10002',img:'img/team/zhangwenwen.jpeg',name:'张文文',company:'上海班富电子商务',address:'中国，上海，松江',
            phone:'13162707331',sex:'F',email:'wenwen.zhang@banff-tech.com',labelId:'2'},
          {id:'PERS_10003',img:'img/team/shenyinling.png',name:'沈寅麟',company:'上海班富电子商务',address:'中国，上海',
            phone:'15000035538',sex:'F',email:'yinlin.shen@banff-tech.com',labelId:'3'},
        ],
        discuss:[
          {id:'PERS_10001',img:'img/team/fenghao.png',name:'冯浩',speak:'hi。。。'},
          {id:'PERS_10002',img:'img/team/zhangwenwen.jpeg',name:'张文文',speak:'有没有人在？'},
          {id:'PERS_10003',img:'img/team/shenyinling.png',name:'沈寅麟',speak:'开票系统是不是有点慢呀？'},
          {id:'PERS_10005',img:'img/team/lining.jpg',name:'李宁',speak:'是的。但是开票系统需要查询的东西太多，后面的也业务也是蛮多的，所以处理的东西多了以后就会拖慢系统'},
          {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',speak:'那有没有方式解决呢？'},
          {id:'PERS_10008',img:'img/team/jinlongxi.png',name:'金龙熙',speak:'我们正在优化中。'}
        ]
      },
      {
        id:2,
        title:'测是讨论',
        typeName:'学习',
        participants:[
          {id:'PERS_10005',img:'img/team/lining.jpg',name:'李宁',company:'上海班富电子商务',address:'中国，上海，长宁',
            phone:'18702104254',sex:'F',email:'ning.li@banff-tech.com',labelId:'3'},
          {id:'PERS_10006',img:'img/team/shubenkun.jpg',name:'苏本坤',company:'上海班富电子商务',address:'中国 ，浙江，杭州',
            phone:'18614055178',sex:'F',email:'benkun.su@banff-tech.com',labelId:'2'},
          {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',company:'上海班富电子商务',address:'中国 ，浙江，杭州',
            phone:'15910989807',sex:'F',email:'yu.chen@banff-tech.com',labelId:'1'},
          {id:'PERS_10008',img:'img/team/jinlongxi.png',name:'金龙熙',company:'上海班富电子商务',address:'中国，上海，嘉定',
            phone:'15618323607',sex:'F',email:'longxi.mei@banff-tech.com',labelId:'1'}
        ],
        discuss:[
          {id:'PERS_10008',img:'img/team/jinlongxi.png',name:'金龙熙',speak:'a'},
          {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',speak:'b'},
          {id:'PERS_10008',img:'img/team/jinlongxi.png',speak:'c'},
          {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',speak:'d'},
          {id:'PERS_10005',img:'img/team/lining.jpg',name:'李宁',speak:'e'},
          {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',speak:'f'},
          {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',speak:'g'},
        ]
      },
    ];
    return{
      getChatList:function () {
        return chatList;
      },
      getChatInfo:function (chatId) {
        for(var i=0;i<chatList.length;i++){
          if(chatId == chatList[i].id){
            return chatList[i];
          }
        }
      },
      getChartInfoPerson:function (chatId) {
        for(var i=0;i<chatList.length;i++){
          if(chatId == chatList[i].id){
            return chatList[i].participants;
          }
        }
      },
      getPersonInfo:function (id) {
        for(var i=0;i<personList.length;i++){
          if(id == personList[i].id){
            return personList[i];
          }
        }
      }
    }
})
.factory('PersonLabel', function () {
    var listLabel = [
      {id:'1',title:'亲人'},
      {id:'2',title:'朋友'},
      {id:'3',title:'同学'},
      {id:'4',title:'同事'}
    ];

    return{
      getAllLabl:function () {
        return listLabel;
      },
      remove:function (label) {
        listLabel.splice(chats.indexOf(label), 1);
      },
      getInfo:function (labelId) {
        for(var i=0;i<listLabel.length;i++){
          if(labelId == listLabel[i].id){
            return listLabel[i];
          }
        }
      },
      addPersonLab:function (title) {
          var label = {id:listLabel.length+1,title:title};
          listLabel.push(label);
      }
    }

})

.factory('ReHistory',function () {
  var history = [
    {id:'REHI_001',name:'准备',chargeProduction:'100吨',dowMaterial:'15吨'},
    {id:'REHI_002',name:'制作',chargeProduction:'80吨',dowMaterial:'30吨'},
    {id:'REHI_003',name:'生产',chargeProduction:'105吨',dowMaterial:'20吨'},
    {id:'REHI_004',name:'加工',chargeProduction:'75吨',dowMaterial:'30吨'},
    {id:'REHI_005',name:'冶炼',chargeProduction:'200吨',dowMaterial:'30吨'},


  ];
  return{
    getAllHistory:function (){
      return history;
    },
    getInfo:function (id) {
      for(var i=0;i<history.length;i++){
        if(id == history[i].id){
          return history[i];
        }
      }
    },
  }
})

.factory('ProductionDetails',function () {
  var Details = [
    {productionId:'PRO_10001',
      startTime:'2016-12-1',
      endTime:'2017-3-03',
      proname:'皮革',
      material:'原料一',
      quantity:'30吨',
      processone:{id:'REHI_001',name:'准备',quantityY:'75吨',quantityN:'25吨',chargeProduction:'100吨',dowMaterial:'15吨'},
      processtwo:{id:'REHI_002',name:'加工',quantityY:'30吨',quantityN:'25吨',chargeProduction:'30吨',dowMaterial:'15吨'},
    },
    {productionId:'PRO_10002',
      startTime:'2016-12-5',
      endTime:'2017-04-04',
      proname:'插排',
      material:'原料三',
      quantity:'50件',
      processone:{id:'REHI_003',name:'加热',quantityY:'44吨',quantityN:'3吨',chargeProduction:'590吨',dowMaterial:'150吨'},
      processtwo:{id:'REHI_004',name:'精炼',quantityY:'33吨',quantityN:'6吨',chargeProduction:'70吨',dowMaterial:'8吨'},
    },
    {productionId:'PRO_10003',
      startTime:'2016-12-18',
      endTime:'2017-5-05',
      proname:'打印机',
      material:'原料一',
      quantity:'100台',
      processone:{id:'REHI_005',name:'提纯',quantityY:'30吨',quantityN:'44吨',chargeProduction:'100吨',dowMaterial:'15吨'},
      processtwo:{id:'REHI_006',name:'精炼',quantityY:'75吨',quantityN:'25吨',chargeProduction:'100吨',dowMaterial:'15吨'},
    },
    {productionId:'PRO_10004',
      startTime:'2016-12-22',
      endTime:'2017-5-06',
      proname:'硬盘',
      material:'原料二',
      quantity:'500块',
      processone:{id:'REHI_007',name:'精炼',quantityY:'75吨',quantityN:'25吨',chargeProduction:'100吨',dowMaterial:'15吨'},
      processtwo:{id:'REHI_008',name:'提纯',quantityY:'30吨',quantityN:'25吨',chargeProduction:'100吨',dowMaterial:'15吨'},
    },
    {productionId:'PRO_10005',
      startTime:'2016-12-11',
      endTime:'2017-7-07',
      proname:'皮革',
      material:'原料一',
      quantity:'1000吨',
      processone:{id:'REHI_009',name:'精炼',quantityY:'30吨',quantityN:'25吨',chargeProduction:'25吨',dowMaterial:'15吨'},
      processtwo:{id:'REHI_0010',name:'精炼',quantityY:'44吨',quantityN:'44吨',chargeProduction:'100吨',dowMaterial:'15吨'},
    },
  ];
  return{
    getAllDetails:function (){
      return Details;
    },
    getInfo:function (id) {
      for(var i=0;i<Details.length;i++){
        if(id == Details[i].id){
          return Details[i];
        }
      }
    },
  }
})

.factory('Activity',function () {
  var activity = [
    {id:'ACT_001',title:'登山',createTime:'2016-12-7',img:'img/resources/dengshan.jpeg',name:'金龙熙',address:'中国，上海，长宁'},
    {id:'ACT_002',title:'公司培训',createTime:'2016-12-7',img:'img/resources/python.jpeg',name:'张文文',address:'中国，上海，长宁'}

  ];

  return{
    getAllActivity:function (){
      return activity
    }
  }
})

.factory('MyTime',function () {
    var time = [
      {
        id:1,
        data:'2016-11-15',
        info:[
          {id:101,title:'解决公司自己项目 app 中的联系人中的标签',biginTime:'2016-11-15T08:00:00',endTime:'2016-11-15T12:00:00'},
          {id:102,title:'解决公司自己项目 app 中的标签的弹出',biginTime:'2016-11-15T13:00:00',endTime:'2016-11-15T14:00:00'},
          {id:103,title:'解决公司自己项目 app 中的列表',biginTime:'2016-11-15T14:00:00',endTime:'2016-11-15T18:30:00'},
        ]
      },
      {
        id:2,
        data:'2016-11-17',
        info:[
          {id:201,title:'解决公司自己项目 app 中的联系人中的标签1',biginTime:'2016-11-17T08:00:00',endTime:'2016-11-17T12:00:00'},
          {id:202,title:'解决公司自己项目 app 中的标签的弹出1',biginTime:'2016-11-17T13:00:00',endTime:'2016-11-17T14:00:00'},
          {id:203,title:'解决公司自己项目 app 中的列表1',biginTime:'2016-11-17T14:00:00',endTime:'2016-11-17T18:30:00'},
        ]
      },
      {
        id:3,
        data:'2016-11-16',
        info:[
          {id:301,title:'开发联系人详情',biginTime:'2016-11-16T13:00:00',endTime:'2016-11-16T18:00:00'},
          {id:302,title:'开发联系人列表',biginTime:'2016-11-16T08:00:00',endTime:'2016-11-16T12:00:00'}
        ]
      }
    ];

    return{
      getAllMyTime:function () {
        return time;
      },
      getTimeInfo:function (timeId, infoId) {
        for (var i=0;i<time.length;i++){
          if(time[i].id == timeId){
            for (var j=0;j<time[i].info.length;j++){
              if(time[i].info[j].id == infoId){
                return time[i].info[j];
              }
            }
          }
        }
      }
    }
})
.factory('OtherTime',function () {
  var time = [
    {
      id:1,
      data:'2016-11-20',
      info:[
        {id:101,title:'公司人员篮球赛',biginTime:'2016-11-20T10:00:00',endTime:'2016-11-20T12:00:00'},
        {id:102,title:'公司人员午餐会',biginTime:'2016-11-20T12:30:00',endTime:'2016-11-20T14:300:00'},
      ]
    },
    {
      id:2,
      data:'2016-11-23',
      info:[
        {id:201,title:'电话会议',biginTime:'2016-11-23T08:00:00',endTime:'2016-11-23T10:00:00'},
        {id:202,title:'和王总去深圳出差',biginTime:'2016-11-23T13:00:00',endTime:'2016-11-27T8:00:00'},
      ]
    },
  ];

  return{
    getAllOtherTime:function () {
      return time;
    },
  }
})
.factory('Favorites',function () {
  var favoriteOrders = [
    {
      orderId:'SAL_10002',
      noReadMessages:'17',
      type:'订单',
      img:'img/team/fenghao.png',
      orderTypeId:'sal',
      orderType:'销售订单',
      name:'冯浩',
      company:'上海班富电子商务_经理',
      address:'中国，浙江，杭州',
      desc:'更换汽车零件',
      orderTime:'2016-11-20 10:21:22',
      lastUPdateTime:'2016-11-20 14:34:11',
      grandTotal:4530,
      orderStatus:'已完成',
      paymentMethod:'现金',
      pushed:5,
      collect:3,
      comments:4
    },
    {
      orderId:'PUR_10001',
      type:'订单',
      noReadMessages:'3',
      img:'',
      orderTypeId:'pur',
      orderType:'采购订单',
      name:'童文戟',
      company:'素然服饰',
      address:'加拿大',
      desc:'采购服饰',
      orderTime:'2016-11-22 14:21:22',
      lastUPdateTime:'2016-11-23 10:34:11',
      grandTotal:400,
      orderStatus:'已批准',
      paymentMethod:'支付宝、微信',
      pushed:3,
      collect:3,
      comments:4
    },
    {
      id:'RES_100001',
      noReadMessages:'4',
      type:'资源',
      img:'',
      descImg:"img/resources/facility.png",
      title:"软件服务",
      name:'童文戟',
      company:'素然服饰',
      address:'加拿大',
      desc:'ofbiz仓库的讲解',
      pushed:5,
      price:124.00,
      collect:3,
      comments:4
    },
    {
      id:'RES_100002',
      noReadMessages:'10',
      type:'资源',
      img:'img/team/zhangwenwen.jpeg',
      descImg:"img/resources/chongzhuang.png",
      title:"电脑系统维护",
      name:'张文文',
      company:'上海班富电子商务',
      address:'中国，上海，松江',
      desc:'电脑系统崩溃，系统重装',
      pushed:5,
      price:50.00,
      collect:3,
      comments:4
    }
  ];

  return{
    getAllfavorites:function () {
      return favoriteOrders;
    },
  }
})
.factory('CreateOrder',function () {
  var salOrderInfo = {};
  var purOrderInfo = {};
  return{
    getSalOrderInfo:function () {
      return salOrderInfo;
    },
    getPurOrderInfo:function () {
      return purOrderInfo;
    },
    setPartyToSalOrder:function (partyId, partyName, phone) {
      salOrderInfo.partyId = partyId;
      salOrderInfo.partyName = partyName;
      salOrderInfo.phone = phone;
    },
    setPartyToPurOrder:function (partyId, partyName, phone) {
      purOrderInfo.partyId = partyId;
      purOrderInfo.partyName = partyName;
      purOrderInfo.phone = phone;
    },
    setAddressToSalOrder:function (address) {
      salOrderInfo.address = address;
    },
    setAddressToPurOrder:function (address) {
      purOrderInfo.address = address;
    },
    setSalResources:function (resources) {
      if(salOrderInfo.resources == null){
        var resourcesList = [];
        resourcesList.push(resources);
        salOrderInfo.resources = resourcesList;
      }else{
        var flag = true;
        for(var i=0;i<salOrderInfo.resources.length;i++){
          if(salOrderInfo.resources[i].id == resources.id){
            flag = false;
          }
        }
        if(flag){
          salOrderInfo.resources.push(resources);
        }
      }
    },
    setPurResources:function (resources) {
      if(purOrderInfo.resources == null){
        var resourcesList = [];
        resourcesList.push(resources);
        purOrderInfo.resources = resourcesList;
      }else{
        var flag = true;
        for(var i=0;i<purOrderInfo.resources.length;i++){
          if(purOrderInfo.resources[i].id == resources.id){
            flag = false;
          }
        }
        if(flag){
          purOrderInfo.resources.push(resources);
        }
      }
    },
    removeResourcesToSalOrder:function (resources) {
      salOrderInfo.resources.splice(salOrderInfo.resources.indexOf(resources), 1);
    },
    removeResourcesToPurOrder:function (resources) {
      purOrderInfo.resources.splice(purOrderInfo.resources.indexOf(resources), 1);
    }
  }
})
.factory('Stock', function () {
    var stockList = [
        {
            inventoryId:'00001',
            name:'汽车前大灯',
            img:'img/product/dadeng.png',
            price:3000,
            quantityAccount:300,
            quantityOnHead:100,
            quantityPromise:98,
            inventoryDate:'2016-12-07 12:32:28',
            supplier:'上海班富电子商务',
            statu:'正常',
            useItem:[
                {itemSeqId:'10001',quantityOnHeadDiff:300,quantityPromiseDiff:300,itemTxt:'手动接收',createUserLogin:'zhangwenwen',date:'2016-10-10 12:23:44'},
                {itemSeqId:'10002',quantityOnHeadDiff:-150,quantityPromiseDiff:-150,itemTxt:'订单消耗[Sal_10001(完成)]',createUserLogin:'zhangwenwen',date:'2016-10-11 15:23:44'},
                {itemSeqId:'10003',quantityOnHeadDiff:-300,quantityPromiseDiff:-300,itemTxt:'制造消耗[Mad_10001(完成)]',createUserLogin:'zhangwenwen',date:'2016-12-10 12:23:44'},
            ]
        },
        {
            inventoryId:'00002',
            name:'汽车轮胎',
            img:'img/product/miqilin.png',
            price:400,
            quantityAccount:500,
            quantityOnHead:321,
            quantityPromise:140,
            inventoryDate:'2016-10-07 10:32:28',
            supplier:'成都米其林轮胎汽车服务有限公司',
            statu:'正常',
            useItem:[
                {itemSeqId:'10003',quantityOnHeadDiff:500,quantityPromiseDiff:500,itemTxt:'采购接收[Pur_10002(完成)]',createUserLogin:'zhangwenwen',date:'2016-10-10 12:23:44'},
                {itemSeqId:'10004',quantityOnHeadDiff:-179,quantityPromiseDiff:-179,itemTxt:'制造消耗[Mad_10002(完成)]',createUserLogin:'fenghao',date:'2016-10-23 10:23:44'},
                {itemSeqId:'10005',quantityOnHeadDiff:0,quantityPromiseDiff:-182,itemTxt:'订单消耗[Sal_10002(批准)]',createUserLogin:'fenghao',date:'2016-11-05 22:23:44'},
            ]
        },
        {
            inventoryId:'00003',
            name:'aland牌维生素C',
            img:'img/product/aland_vc.png',
            price:138,
            quantityAccount:1000,
            quantityOnHead:465,
            quantityPromise:465,
            inventoryDate:'2016-11-23 12:32:28',
            supplier:'上海aland保健品有限公司',
            statu:'正常',
            useItem:[
                {itemSeqId:'10006',quantityOnHeadDiff:1000,quantityPromiseDiff:1000,itemTxt:'采购接收[Pur_10003(完成)]',createUserLogin:'zhangwenwen',date:'2016-11-05 12:23:44'},
                {itemSeqId:'10007',quantityOnHeadDiff:-535,quantityPromiseDiff:-535,itemTxt:'订单消耗[Sal_10003(完成)]',createUserLogin:'fenghao',date:'2016-12-07 14:23:44'},
            ]
        },
        {
            inventoryId:'00004',
            name:'双肩背包',
            img:'img/product/shuangjianbao.png',
            price:399,
            quantityAccount:50,
            quantityOnHead:50,
            quantityPromise:48,
            inventoryDate:'2016-12-07 18:32:28',
            supplier:'新秀丽服饰有限公司',
            statu:'正常',
            useItem:[
                {itemSeqId:'10008',quantityOnHeadDiff:50,quantityPromiseDiff:50,itemTxt:'采购接收[Pur_10004(完成)]',createUserLogin:'zhangwenwen',date:'2016-11-05 12:23:44'},
                {itemSeqId:'10009',quantityOnHeadDiff:0,quantityPromiseDiff:-2,itemTxt:'订单消耗[Sal_10004(批准)]',createUserLogin:'fenghao',date:'2016-12-05 12:23:44'},
            ]
        },
        {
            inventoryId:'00005',
            name:'笔记本电脑',
            img:'img/product/huipu.png',
            price:4599,
            quantityAccount:30,
            quantityOnHead:12,
            quantityPromise:8,
            inventoryDate:'2016-04-07 12:32:28',
            supplier:'惠普中国',
            statu:'正常',
            useItem:[
                {itemSeqId:'10010',quantityOnHeadDiff:30,quantityPromiseDiff:30,itemTxt:'采购接收[Pur_10005(完成)]',createUserLogin:'zhangwenwen',date:'2016-10-05 12:23:44'},
                {itemSeqId:'10011',quantityOnHeadDiff:-18,quantityPromiseDiff:-18,itemTxt:'订单消耗[Sal_10005(完成)]',createUserLogin:'fenghao',date:'2016-12-05 12:23:44'},
                {itemSeqId:'10012',quantityOnHeadDiff:0,quantityPromiseDiff:-4,itemTxt:'订单消耗[Sal_10006(批准)]',createUserLogin:'fenghao',date:'2016-12-08 12:23:44'},
            ]
        },
        {inventoryId:'00006',name:'戴尔显示器',img:'img/product/daier.png',price:1499,quantityAccount:10,quantityOnHead:10,quantityPromise:10,inventoryDate:'2016-12-01 10:32:28',supplier:'美国戴尔公司',statu:'正常'},
        {inventoryId:'00007',name:'打印机',img:'img/product/dayingji.png',price:5999,quantityAccount:1,quantityOnHead:1,quantityPromise:1,inventoryDate:'2016-12-03 12:32:28',supplier:'简约数码打印计算中心',statu:'损坏'},
        {inventoryId:'00008',name:'插座',img:'img/product/gongniu.png',price:59,quantityAccount:4,quantityOnHead:4,quantityPromise:4,inventoryDate:'2016-05-07 12:32:28',supplier:'公牛集团',statu:'正常'},
        {inventoryId:'00009',name:'iphone7 plus',img:'img/product/iphonePlus.png',price:6999,quantityAccount:100,quantityPromise:100,quantityOnHead:100,inventoryDate:'2016-12-07 12:32:28',supplier:'苹果公司',statu:'正常'},
    ];
    return{
        getAllStockList:function () {
            return stockList;
        },
        getInfo:function (inventoryId) {
            for(var i=0;i<stockList.length;i++){
                if(stockList[i].inventoryId == inventoryId){
                    return stockList[i];
                }
            }
        }
    }
})
;
