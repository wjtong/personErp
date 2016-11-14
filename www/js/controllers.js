angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PersonHomeCtrl', function($scope) {
  $scope.productlist = [
    { name: '小皮件加工', id: 1, price: 250, image: '/img/product/001.jpg', description: '加工小皮件服务' },
    { name: '大皮件加工', id: 2, price: 150, image: '/img/product/002.jpg', description: '加工大皮件服务' },
    { name: '皮件运输', id: 3, price: 260, image: '/img/product/003.jpg', description: '运输皮件' },
    { name: '运输纸箱小号', id: 4, price: 170, image: '/img/product/004.jpg', description: '用于运输的小号包装纸箱' },
    { name: '运输纸箱中号', id: 5, price: 180, image: '/img/product/005.jpg', description: '用于运输的中号包装纸箱' },
    { name: '运输纸箱大号', id: 6, price: 190, image: '/img/product/006.jpg', description: '用于运输的大号包装纸箱' }
  ];
})

.controller('HomeCtrl', function($scope,$ionicModal) {
  // $scope.playlists = [
  //   { title: '张厂长', id: 1, location: '浙江，海宁', image: 'img/team/img1-sm.jpg', message: '500公斤皮料已送到，450公斤接受入库' },
  //   { title: '王小明', id: 2, location: '浙江，杭州', image: 'img/team/img2-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '李经理', id: 3, location: '浙江，杭州', image: 'img/team/img3-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '李经理', id: 4, location: '浙江，杭州', image: 'img/team/img4-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '李经理', id: 5, location: '浙江，杭州', image: 'img/team/img5-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '宋经理', id: 6, location: '浙江，杭州', image: 'img/team/img6-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' }
  // ];

    $scope.mainLists = [
        {img:'img/team/img1-md.jpg', id:1, name:'张总', company:'德阳工厂', address:'海宁，浙江，中国',desc:'500公斤皮料已送到，450公斤接收入库，50公斤未接收，2016/10/08',like:3,comments:5},
        {img:'img/team/img2-md.jpg', id:2, name:'小刘', company:'德阳工厂', address:'海宁，浙江，中国',desc:'已创建生产，订单号12345678900，2016/10/07',collect:2,comments:8},
        {img:'img/team/img3-md.jpg', id:3, name:'我', company:'德阳贸易', address:'杭州，浙江，中国',desc:'已发布产品 PVC，2016/10/06',collect:5,comments:3},
        {img:'img/team/img4-md.jpg', id:4, name:'我', company:'德阳贸易', address:'海宁，浙江，中国',desc:'已创建生产订单 PVC 1000米，2016/10/05',collect:1,comments:1},
        {img:'img/team/img5-md.jpg', id:5, name:'张总', company:'德阳工厂', address:'海宁，浙江，中国',desc:'已发布生产服务 PVC，2016/10/04',collect:2,comments:8}
    ];

    $ionicModal.fromTemplateUrl('templates/new-task-main.html', function(modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });

    $scope.newTask = function() {
        $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
        $scope.taskModal.hide();
    }

})

.controller('ContactlistCtrl', function($scope) {
  // $scope.playlists = [
  //   { title: '张厂长', id: 1, location: '浙江，海宁', image: 'img/team/img1-sm.jpg', message: '500公斤皮料已送到，450公斤接受入库' },
  //   { title: '王小明', id: 2, location: '浙江，杭州', image: 'img/team/img2-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '李经理', id: 3, location: '浙江，杭州', image: 'img/team/img3-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '李经理', id: 4, location: '浙江，杭州', image: 'img/team/img4-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '李经理', id: 5, location: '浙江，杭州', image: 'img/team/img5-sm.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' },
  //   { title: '宋经理', id: 6, location: '浙江，杭州', image: 'img/team/img6-md.jpg', message: '300公斤皮革加工完成，200公斤皮革已发出' }
  // ];
    $scope.personmainLists = [
        {id:'1',img:'img/team/img6-md.jpg',name:'张总',company:'德阳工厂',address:'海宁，浙江，中国'},
        {id:'2',img:'img/team/img7-md.jpg',name:'小刘',company:'德阳工厂',address:'海宁，浙江，中国'},
        {id:'3',img:'img/team/img8-md.jpg',name:'Mike',company:'skytrading',address:'Paloalto,CA,USA'},
        {id:'4',img:'img/team/img9-md.jpg',name:'李四',company:'蓝天公司',address:'上海,中国'},
        {id:'5',img:'img/team/img10-md.jpg',name:'王总',company:'大海皮料',address:'苏州，江苏，中国'},
        {id:'6',img:'img/team/img11-md.jpg',name:'张三',company:'苏州希尔顿',address:'苏州 ，江苏，中国'},
        {id:'7',img:'img/team/img13-md.jpg',name:'王球童',company:'九桥高尔夫',address:'杭州，浙江，中国'},
        {id:'8',img:'img/team/img15-md.jpg',name:'FabioGrosso',company:'',address:'Turin，Italy'}
    ]
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.orders = [
    { time: '2016-03-04', id: 'CO10000' },
    { time: '2016-04-08', id: 'CO10001' },
    { time: '2016-07-23', id: 'CO10002' },
    { time: '2016-09-14', id: 'CO10003' },
    { time: '2016-10-09', id: 'CO10004' }
  ];
})
.controller('AboutMe',function ($scope) {
    $scope.myInfo = { id:'1',name:'张文文',img:'img/team/img3-md.jpg',account:'zhangwenwen',sex:'男',address:'上海市松江区泗凯路61弄20号201室',phone:'15072200010'};
})
.controller('editAddress',function ($scope) {
    $scope.countrys = [
        {id:'China',name:'中国'},
        {id:'America',name:'美国'},
        {id:'Japan',name:'日本'},
        {id:'Russia',name:'俄罗斯'},
        {id:'England',name:'英国'},
        {id:'Canada',name:'加拿大'},
        {id:'Australian',name:'澳大利亚'}
    ];
    $scope.provinces = [
        {id:'zhejiang',name:'浙江'},
        {id:'beijing',name:'北京'},
        {id:'shanghai',name:'上海'},
        {id:'tianjin',name:'天津'},
        {id:'chongqing',name:'重庆'},
    ];
    $scope.citys = [
        {id:'hangzhou',name:'杭州'},
        {id:'ningbo',name:'宁波'},
        {id:'wenzhou',name:'温州'},
        {id:'taizhou',name:'台州'},
        {id:'quzhou',name:'衢州'},
        {id:'jinhua',name:'金华'}
    ];
    $scope.address = '泗凯路61弄20号201室';
    $scope.phone = '0086 15072200010' ;
    $scope.emails = 'zhangwenwen1556@163.com';
})
.controller('myresources',function ($scope) {
    $scope.resourcesList = [
        {id:1,img:'img/team/img1-md.jpg',name:'我',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
        {id:2,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5},
        {id:3,img:'img/team/img1-md.jpg',name:'我',company:'德阳贸易',address:'杭州，浙江，中国',desc:'发布产品PU，2016/10/08',pushed:5},
        {id:4,img:'img/team/img2-md.jpg',name:'张总',company:'德阳贸易',address:'海宁，浙江，中国',desc:'发布PU生产服务，2016/10/08',pushed:5}
    ];
    $scope.selectOption = [
        {id:'me',name:'我'},
        {id:'zhangzong',name:'张总'},
        {id:'lisi',name:'李四'},
        {id:'xiaoliu',name:'小刘'},
        {id:'zhangsan',name:'张三'},
    ];
})
;
