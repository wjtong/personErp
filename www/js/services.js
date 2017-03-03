angular.module('starter.services', [])

//主页
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
//我的时间安排
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
      getTimeList:function (timeId) {
        for (var i=0;i<time.length;i++){
          if(time[i].id == timeId){
            return time[i];
          }
        }
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

//账单的列表
  .factory('Account',function () {
    var url = "http://114.215.200.46:3400/personContacts/control/";
    //var url = "http://localhost:3400/personContacts/control/";

    var accountList = [
      {id:'PERS_10001',img:'img/team/fenghao.png',name:'冯浩',money:'500',money2:200,date:'2017-2-21'},
      {id:'PERS_10002',img:'img/team/shenyinling.png',name:'沈寅麟',money:'300',money2:100,date:'2017-2-22'},
      {id:'PERS_10004',img:'img/team/wangkun.jpg',name:'王坤',money:'800',money2:300,date:'2017-2-23'},
      {id:'PERS_10005',img:'img/team/lining.jpg',name:'李宁',money:'600',money2:300,date:'2017-2-21'},
      {id:'PERS_10006',img:'',name:'苏本坤',money:'200',money2:300,date:'2017-2-21'},
      {id:'PERS_10007',img:'img/team/chenyu.jpg',name:'陈宇',money:'50',money2:300,date:'2017-2-21'},
      {id:'PERS_10008',img:'img/team/jinlongxi.png',name:'金龙熙',money:'900',money2:300,date:'2017-2-23'}
    ];
    return {
      //获得联系人(联动)
      // getAll:function (partyId, cb) {
      //   $.ajax({
      //     url:url+"findContects",
      //     data:{partyId:partyId},
      //     async : false,
      //     type:'POST',
      //     success: function(result){
      //       if(jQuery.type(result) === "string"){
      //         result =   jQuery.parseJSON(result);
      //       }
      //       if(result.resultMap!=null){
      //         if($.type(cb)==='function' ){
      //           cb(result.resultMap);
      //         }
      //       }
      //     }
      //   });
      // },
      //获得联系人（死数据）
      getAll:function(){
        return accountList;
      },

    }
  })

.provider('popupUtil', function(){
    this.$get = function($ionicPopup){
        var popupUtil = {};
        popupUtil.showConfirm = function(titleTxt, contentTxt){
            var confirmPopup = $ionicPopup.confirm({
                title: titleTxt,
                template: contentTxt
            });
            return confirmPopup;
        };
        popupUtil.showAlert = function(titleTxt, contentTxt) {
            var alert = $ionicPopup.alert({
                title: titleTxt,
                template: contentTxt
            });
            return alert;
        };
        return popupUtil;
    }
})

;
