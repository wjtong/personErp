/**
 * Created by jinlongxi on 17/3/27.
 */
angular.module('directives.OniBarDirective', [])

  .directive('keyboardshow', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        window.addEventListener('native.keyboardshow', function (e) {
          angular.element(element).css({
            'bottom': e.keyboardHeight + 'px'
          });
        });

        window.addEventListener('native.keyboardhide', function (e) {
          angular.element(element).css({
            'bottom': 0
          });
        });
      }
    };
  })
  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {

        scope.$on('$ionicView.beforeEnter', function () {

          scope.$watch(attributes.hideTabs, function (value) {
            $rootScope.hideTabs = 'tabs-item-hide';
          });

        });

        scope.$on('$ionicView.beforeLeave', function () {
          scope.$watch(attributes.hideTabs, function (value) {
            $rootScope.hideTabs = 'tabs-item-hide';
          });
          scope.$watch('$destroy', function () {
            $rootScope.hideTabs = false;
          })

        });
      }
    };
  })
  .directive('rjHoldActive', ['$ionicGesture', '$timeout', '$ionicBackdrop',
    function ($ionicGesture, $timeout, $ionicBackdrop) {
      return {
        scope: false,
        restrict: 'A',
        replace: false,
        link: function (scope, iElm, iAttrs, controller) {
          $ionicGesture.on("hold", function () {
            iElm.addClass('active');
            $timeout(function () {
              iElm.removeClass('active');
            }, 300);
          }, iElm);
        }
      };
    }
  ])
  // .directive('rjCloseBackDrop', [function () {
  //   return {
  //     scope: false,
  //     restrict: 'A',
  //     replace: false,
  //     link: function (scope, iElm, iAttrs, controller) {
  //       var htmlEl = angular.element(document.querySelector('html'));
  //       htmlEl.on("click", function (event) {
  //         if (event.target.nodeName === "HTML" &&
  //           scope.popup.optionsPopup &&
  //           scope.popup.isPopup) {
  //           scope.popup.optionsPopup.close();
  //           scope.popup.isPopup = false;
  //         }
  //       });
  //     }
  //   };
  // }])
  .directive('resizeFootBar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
    // Runs during compile
    return {
      replace: false,
      link: function (scope, iElm, iAttrs, controller) {
        scope.$on("taResize", function (e, ta) {
          if (!ta) return;
          var scroll = document.body.querySelector("#message-detail-content");
          var scrollBar = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
          // console.log(scroll);
          var taHeight = ta[0].offsetHeight;
          var newFooterHeight = taHeight + 10;
          newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

          iElm[0].style.height = newFooterHeight + 'px';
          scroll.style.bottom = newFooterHeight + 'px';
          scrollBar.scrollBottom();
        });
      }
    };
  }])
  .directive('rjPositionMiddle', ['$window', function ($window) {
    return {
      replace: false,
      link: function (scope, iElm, iAttrs, controller) {
        var height = $window.innerHeight - 44 - 49 - iElm[0].offsetHeight;
        if (height >= 0) {
          iElm[0].style.top = (height / 2 + 44) + 'px';
        } else {
          iElm[0].style.top = 44 + 'px';
        }
      }
    }
  }]);


