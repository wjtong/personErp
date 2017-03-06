angular.module('login.services', [])

//登陆＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  .factory('Login',function($rootScope){
    var url =$rootScope.interfaceUrl;//服务器
    //var url = "http://192.168.3.62:3400/personContacts/control/";
    return {
      login:function (userLoginId,cb) {
        $.ajax({
          url:url+"userAppLogin",
          data:{
            userLoginId:userLoginId
          },
          async : false,
          type:'POST',
          success: function(result){
            if(jQuery.type(result) === "string"){
              result =   jQuery.parseJSON(result);
            }
            if(result.resultMap!=null){
              if($.type(cb)==='function' ){
                cb(result.resultMap);
              }
            }
          }
        });
      }
    }
  })
