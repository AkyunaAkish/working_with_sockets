working_with_sockets.controller('MainController', function($scope){

  $scope.anchorArr = [];

  $scope.addRoom = function(name) {
    $scope.anchorArr.push(name);
    $scope.room_name = null;
  }

});
