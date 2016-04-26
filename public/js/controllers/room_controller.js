working_with_sockets.controller('RoomController', function($scope, $state, $stateParams){

  $scope.messages = [];

  socket.emit('join', { room_name: $stateParams.room });

  socket.on('message', function (data) {
    var tempObj = {};
    tempObj.message = data;
    tempObj.date = Date.now();
    $scope.messages.push(tempObj);

    // use $scope.apply in order to make sure the view is updated
    // even though this event was fired outside of Angular's digest
    $scope.$apply();
  })

  $scope.self = function (text) {
    var emission = {location: 'home', message: text, date: Date.now()};
    socket.emit('self', emission);
    $scope.selfMessage = null;
  }


  $scope.all = function (text) {
    var emission = {location: 'node', message: text, date: Date.now()};
    socket.emit('all', emission);
    $scope.allMessage = null;
  }

  $scope.sendMessage = function (text) {
    var emission = {location: 'node', message: text, date: Date.now()};
    socket.emit('message', emission);
    $scope.roomMessage = null;
  }

  $scope.directMessage = function(text) {
    var emission = {location: 'angular', message: text, date: Date.now()};
    socket.emit('direct_message', emission);
    $scope.direct_message = null;
  }

  $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
  });


  $scope.room = $stateParams.room;

});
