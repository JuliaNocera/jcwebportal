/* HOME PAGE CONTROLLER */

var homeController = angular.module('homeController', ['ngResource']);

homeController.controller('HomePageCtrl', ['$scope', '$http',
  function($scope, $http) {
      function getPosts() {
        var first = ['post 1', 'post 2', 'post 3'];
        var second = [
          {categoryName: 'category A', posts: ['post 1', 'post 2', 'post 3']},
          {categoryName: 'category B', posts: ['post a', 'post b', 'post c']}
        ];
        return second;
      }
      $scope.categories = getPosts();
      $scope.title = 'Hello World';
  }
]);


// get data from firebase
// display categories
// click to view saved items in categories
// click item to view details

// create a new category
// create a new post inside a category (first step is simple markdown file being daved to FB & served )
