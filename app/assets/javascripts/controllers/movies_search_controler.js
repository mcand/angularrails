var app = angular.module('movies');

app.factory('Films', ['$resource',function($resource){
 return $resource('/films.json', {},{
 query: { method: 'GET', isArray: true },
 create: { method: 'POST' }
 })
}]);

app.factory('Film', ['$resource', function($resource){
 return $resource('films/:id.json', {}, {
 show: {method: 'GET' },
 update: { method: 'PUT', params: {id: '@id'} },
 delete: { method: 'DELETE', params: {id: '@id'} }
 });
}]);

app.controller('MoviesController', ['$scope', '$http', '$location', '$resource', '$routeParams', 'Films', 'Film', function($scope, $http, $location, $resource, $routeParams, Films, Film){

  $scope.movies = Films.query();

  $scope.user = document.getElementById('name').innerHTML; // Find a better way to interact with devise via angular

  $scope.createMovie = function() {
    $scope.movies = Films.query();

    $http.get(
      '/categories.json'
    ).success(function(data,status,headers,config){
      $scope.categories = data;
    }).error(function(data, status, headers, config){
      alert("There was an error while fetching the categories on the database. Error " + status);
    });

    $location.path("/" + 'new').replace();
  };

  $scope.listMovies = function() {
    $location.path("/").replace();
  };

  $scope.save = function(){
    if($scope.form.$valid){
        Films.create({film: $scope.movie}, function(){
        $scope.form.$setPristine();
      }, function(error){
        alert("Movie not created");
      });
    }
  };

  $scope.deleteMovie = function(movie){
    Film.delete(movie);
    $scope.movies = Films.query();
  };

  $scope.viewDetails = function(movie){
    $scope.name="ola";
    alert(movie.id);
    $location.path("/" + movie.id);
    var Movie = $resource('films/:filmId'+'.json', {filmId: '@id'});
    $scope.movie = Movie.get({filmId: movie.id});
    $scope.movie.$promise.then(
      function(response){
        $scope.$apply();
        $scope.movie = response;

        console.log("filme e: " + response.name);
      },
      function(error){
        console.log("request failed");
      }
    );
  };

}]);
