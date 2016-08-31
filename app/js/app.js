/* App Module */

var webApp = angular.module('jcwebApp', [
  'ngRoute',
  'homeController'
]);

webApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'html/categoryList.html',
      controller: 'HomePageCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);
