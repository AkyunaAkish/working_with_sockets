working_with_sockets.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('initial', {
    url: "/",
    templateUrl: "partials/main.html",
    controller: "MainController"
  })
  .state('node', {
    url: "/node_chat",
    templateUrl: "partials/node_chat.html",
    controller: "NodeController"
  })
  .state('angular', {
    url: "/angular_chat",
    templateUrl: "partials/angular_chat.html",
    controller: "AngularController"
  })
  .state('room', {
    url: "/chat/:room",
    templateUrl: "partials/room.html",
    controller: "RoomController"
  })

  $locationProvider.html5Mode(true);

});
