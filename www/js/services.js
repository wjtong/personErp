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
        {orderId:1,img:'img/team/img1-md.jpg',name:'我',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
        {orderId:2,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5},
        {orderId:3,img:'img/team/img1-md.jpg',name:'我',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
        {orderId:4,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5}
    ];
    var purOrder = [
        {orderId:'1',img:'img/team/img6-md.jpg',name:'张总',company:'德阳工厂',address:'海宁，浙江，中国',desc:'购买 PVC 1000米，2016/10/05',pushed:'3'},
        {orderId:'2',img:'img/team/img7-md.jpg',name:'小刘',company:'德阳工厂',address:'海宁，浙江，中国',desc:'购买 PU 1000米，2016/10/04',pushed:'2'},
        {orderId:'3',img:'img/team/img8-md.jpg',name:'Mike',company:'skytrading',address:'Paloalto,CA,USA',desc:'购买 PU 1000米，2016/10/04',pushed:'3'},
        {orderId:'4',img:'img/team/img9-md.jpg',name:'李四',company:'蓝天公司',address:'上海,中国',desc:'购买 PU 1000米，2016/10/04',pushed:'6'},
        {orderId:'5',img:'img/team/img10-md.jpg',name:'王总',company:'大海皮料',address:'苏州，江苏，中国',desc:'购买 PU 1000米，2016/10/04',pushed:'2'},
        {orderId:'6',img:'img/team/img11-md.jpg',name:'张三',company:'苏州希尔顿',address:'苏州 ，江苏，中国',desc:'购买 PU 1000米，2016/10/04',pushed:'5'},
        {orderId:'7',img:'img/team/img13-md.jpg',name:'王球童',company:'九桥高尔夫',address:'杭州，浙江，中国',desc:'购买 PU 1000米，2016/10/04',pushed:'6'},
        {orderId:'8',img:'img/team/img15-md.jpg',name:'FabioGrosso',company:'',address:'Turin，Italy',desc:'购买 PU 1000米，2016/10/04',pushed:'9'}
    ];
    return{
        getSalOrder: function () {
            return selOrder;
        },
        getPurOrder:function () {
            return purOrder;
        }
    }

})
.factory("Home",function () {
    var mainLists = [
        {img:'img/team/img1-md.jpg', id:1, type:'order', name:'张总', company:'德阳工厂', address:'海宁，浙江，中国',desc:'500公斤皮料已送到，450公斤接收入库，50公斤未接收，2016/10/08',like:3,comments:5},
        {img:'img/team/img2-md.jpg', id:2, type:'server', name:'小刘', company:'德阳工厂', address:'海宁，浙江，中国',desc:'已创建生产，订单号12345678900，2016/10/07',collect:2,comments:8},
        {img:'img/team/img3-md.jpg', id:3, type:'order', name:'我', company:'德阳贸易', address:'杭州，浙江，中国',desc:'已发布产品 PVC，2016/10/06',collect:5,comments:3},
        {img:'img/team/img4-md.jpg', id:4, type:'server', name:'我', company:'德阳贸易', address:'海宁，浙江，中国',desc:'已创建生产订单 PVC 1000米，2016/10/05',collect:1,comments:1},
        {img:'img/team/img5-md.jpg', id:5, type:'order', name:'张总', company:'德阳工厂', address:'海宁，浙江，中国',desc:'已发布生产服务 PVC，2016/10/04',collect:2,comments:8}
    ];
    return{
        getAll:function () {
            return mainLists;
        }
    }
})
.factory('Contact',function () {
    var personmainLists = [
        {id:'1',img:'img/team/img6-md.jpg',name:'张总',company:'德阳工厂',address:'海宁，浙江，中国',phone:'15072200010',sex:'F',email:'12341@qq.com',labelId:1},
        {id:'2',img:'img/team/img7-md.jpg',name:'小刘',company:'德阳工厂',address:'海宁，浙江，中国',phone:'15072200011',sex:'M',email:'12342@qq.com',labelId:2},
        {id:'3',img:'img/team/img8-md.jpg',name:'Mike',company:'skytrading',address:'Paloalto,CA,USA',phone:'15072200012',sex:'F',email:'12343@qq.com',labelId:3},
        {id:'4',img:'img/team/img9-md.jpg',name:'李四',company:'蓝天公司',address:'上海,中国',phone:'15072200013',sex:'M',email:'12344@qq.com',labelId:4},
        {id:'5',img:'img/team/img10-md.jpg',name:'王总',company:'大海皮料',address:'苏州，江苏，中国',phone:'15072200014',sex:'F',email:'12345@qq.com',labelId:3},
        {id:'6',img:'img/team/img11-md.jpg',name:'张三',company:'苏州希尔顿',address:'苏州 ，江苏，中国',phone:'15072200015',sex:'M',email:'12346@qq.com',labelId:2},
        {id:'7',img:'img/team/img13-md.jpg',name:'王球童',company:'九桥高尔夫',address:'杭州，浙江，中国',phone:'15072200016',sex:'F',email:'12347@qq.com',labelId:1},
        {id:'8',img:'img/team/img15-md.jpg',name:'FabioGrosso',company:'',address:'Turin，Italy',phone:'15072200017',sex:'M',email:'12348@qq.com'}
    ];
    return {
        getAll:function () {
            return personmainLists;
        },
        get:function (id) {
            for(var i=0 ;i<personmainLists.length; i++){
                //alert(id);
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
      {id:1,img:'img/team/img1-md.jpg',name:'我',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
      {id:2,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5},
      {id:3,img:'img/team/img1-md.jpg',name:'我',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
      {id:4,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5}
    ];

    var resourcesListOthers = [
      {id:1,img:'img/team/img9-md.jpg',name:'李四',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
      {id:2,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5},
      {id:3,img:'img/team/img10-md.jpg',name:'王总',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
      {id:4,img:'img/team/img10-md.jpg',name:'王总',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
      {id:5,img:'img/team/img10-md.jpg',name:'王总',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
      {id:6,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5}
    ];
    var selectOption = [
      {id:'me',name:'我'},
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
        getSelectOption:function () {
            return selectOption;
        }
    }
})
.factory('ChatList',function () {
    var personList = [
      {id:10002,name:'李四',img:'img/team/img6-md.jpg'},
      {id:10001,name:'张三',img:'img/team/img1-md.jpg'},
      {id:10003,name:'王五',img:'img/team/img7-md.jpg'}
    ];
    var chatList = [
      {
        id:1,
        title:'aland开票讨论',
        typeName:'订单',
        participants:[
          {id:10002,name:'李四',img:'img/team/img6-md.jpg'},
          {id:10001,name:'张三',img:'img/team/img1-md.jpg'},
          {id:10003,name:'王五',img:'img/team/img7-md.jpg'}
        ],
        discuss:[
          {personId:10001,name:'张三',img:'img/team/img1-md.jpg',speak:'hi。。。'},
          {personId:10001,name:'张三',img:'img/team/img1-md.jpg',speak:'有没有人在？'},
          {personId:10001,name:'张三',img:'img/team/img1-md.jpg',speak:'开票系统是不是有点慢呀？'},
          {personId:10002,name:'李四',img:'img/team/img6-md.jpg',speak:'是的。但是开票系统需要查询的东西太多，后面的也业务也是蛮多的，所以处理的东西多了以后就会拖慢系统'},
          {personId:10003,name:'王五',img:'img/team/img7-md.jpg',speak:'那有没有方式解决呢？'},
          {personId:10002,name:'李四',img:'img/team/img6-md.jpg',speak:'我们正在优化中。'}
        ]
      },
      {
        id:2,
        title:'测是讨论',
        typeName:'学习',
        participants:[
          {id:10001,name:'张三',img:'img/team/img1-md.jpg'},
          {id:10002,name:'李四',img:'img/team/img6-md.jpg'},
          {id:10003,name:'王五',img:'img/team/img7-md.jpg'}
        ],
        discuss:[
          {personId:10002,name:'李四',img:'img/team/img6-md.jpg',speak:'a'},
          {personId:10001,name:'张三',img:'img/team/img1-md.jpg',speak:'b'},
          {personId:10003,name:'王五',img:'img/team/img7-md.jpg',speak:'c'},
          {personId:10002,name:'李四',img:'img/team/img6-md.jpg',speak:'d'},
          {personId:10002,name:'李四',img:'img/team/img6-md.jpg',speak:'e'},
          {personId:10003,name:'王五',img:'img/team/img7-md.jpg',speak:'f'},
          {personId:10003,name:'王五',img:'img/team/img7-md.jpg',speak:'g'},
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
      {id:1,title:'亲人'},
      {id:2,title:'朋友'},
      {id:3,title:'同学'},
      {id:4,title:'同事'}
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
      data:'2016-11-16',
      info:'这个时间的安排'
    },
    {
      id:2,
      data:'2016-11-17',
      info:'这个时间的安排'
    }
  ];

  return{
    getAllOtherTime:function () {
      return time;
    },
  }
})
;
