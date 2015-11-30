var app = angular.module('movies');

app.controller('MoviesController', ['$scope','$location', function($scope, $location){
  var movies = [
    {id: 1, name: 'my first movie'},
    {id: 2, name: 'my second movie'}
  ];
  $scope.movies = movies;
  $scope.user = document.getElementById('name').innerHTML; // Find a better way to interact with devise via angular

  $scope.createMovie = function() {
    $location.path("/" + 'new').replace();
  };

  $scope.listMovies = function() {
    $location.path("/").replace();
  };
}]);
