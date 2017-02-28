angular.module('vote.controllers', [])


  .controller('editVoteCtrl', function($scope) {

    $scope.addVotes = function () {
      $("#votes").append("" +
        "<textarea style='display: inline-block;width: 80%'></textarea>" +
        "<img src='img/delNode.gif' onclick='$(this).prev().remove(); $(this).next().remove(); $(this).remove();'/><br>" +
        "");
    };
  })

  .controller('castVoteCtrl', function($scope, Contact) {
    $scope.personList = Contact.getAll();

    $scope.onOff = false;
    $scope.changeOnOff = function (onOff) {
      if (onOff == true) {
        $scope.onOff = false;
      } else {
        $scope.onOff = true;
      }
    };
  })


  .controller('voteListCtrl', function($scope, $state) {

  })


;
