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
;
