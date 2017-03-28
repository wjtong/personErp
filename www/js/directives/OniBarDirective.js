/**
 * Created by jinlongxi on 17/3/27.
 */
angular.module('starter.directives', [])

  .directive('keyboardshow', function($rootScope, $ionicPlatform, $timeout, $ionicHistory, $cordovaKeyboard) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        window.addEventListener('native.keyboardshow',function (e){
          alert("1231231231231321312321")
          angular.element(element).css({
            'bottom':e.keyboardHeight + 'px'
          });


        });

        window.addEventListener('native.keyboardhide',function (e){
          angular.element(element).css({
            'bottom':0
          });
        });
      }
    };
  });
