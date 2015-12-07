var app = angular.module('movies');

app.factory('Films', ['$resource',function($resource){
 return $resource('/films.json', {},{
   query: { method: 'GET', isArray: true },
   create: { method: 'POST' }
 })
}]);

app.factory('Film', ['$resource', function($resource){
 return $resource('/films/:id.json', {}, {
   show: {method: 'GET' },
   update: { method: 'PUT', params: {id: '@id'} },
   delete: { method: 'DELETE', params: {id: '@id'} }
 });
}]);

app.controller('MoviesController', ['$scope', '$http', '$location', '$resource', '$route', '$routeParams', 'Films', 'Film', function($scope, $http, $location, $resource, $route, $routeParams, Films, Film){

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
    $route.reload();
  };

  $scope.viewDetails = function(movie){
    $location.path("/" + movie.id);
  };

}]);

app.controller('MovieDetailController', ['$scope', '$http', '$location', '$resource', '$routeParams', 'Films', 'Film', function($scope, $http, $location, $resource, $routeParams, Films, Film){
  var movieId = $routeParams.id;
  $scope.moviedId = $routeParams.id;

  var Movie = $resource('/films/:filmId.json', {filmId: '@film_id'}, {"save": {"method": 'PUT'}});
  Movie.get({filmId:movieId}).$promise.then(
    function(response){
      $scope.movie = response;
    },
    function(error){
      console.log("request failed");
    }
  );

  $scope.save = function(movie){
    alert(movieId);
    Film.update($scope.movie, function(){
      $location.path('/');
    }, function(error){
      console.log(error);
    });
  };
}]);
