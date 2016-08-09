angular.module('spootifying', ['ngRoute', 'myControllers', 'myFilters', 'myServices'])

.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/user.html',
    controller: 'UserController as ctrl'
  }).otherwise({
    redirectTo: '/'
  });
});
