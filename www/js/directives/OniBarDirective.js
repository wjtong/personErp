/**
 * Created by jinlongxi on 17/3/27.
 */
angular.module('directives.OniBarDirective', [])

  .directive('keyboardshow', function($rootScope, $ionicPlatform, $timeout, $ionicHistory, $cordovaKeyboard) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        window.addEventListener('native.keyboardshow',function (e){
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
  })
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {

        scope.$on('$ionicView.beforeEnter', function() {

          scope.$watch(attributes.hideTabs, function(value){
            $rootScope.hideTabs = 'tabs-item-hide';
          });

        });

        scope.$on('$ionicView.beforeLeave', function() {
          scope.$watch(attributes.hideTabs, function(value){
            $rootScope.hideTabs = 'tabs-item-hide';
          });
          scope.$watch('$destroy',function(){
            $rootScope.hideTabs = false;
          })

        });
      }
    };
  })


