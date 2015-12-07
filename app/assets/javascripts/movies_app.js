(function() {
  var app = angular.module('movies',[
    'ngRoute',
    'ngResource',
    'ngMessages',
    'templates']);

  app.config(["$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/", {
         controller: "MoviesController",
        templateUrl: "movies_list.html"
      }).when("/new", {
        controller: "MoviesController",
        templateUrl: "create_movies.html"
      }).when("/:id", {
        controller: "MovieDetailController",
        templateUrl: "movie_details.html"
      });
    }
  ]);
})();
