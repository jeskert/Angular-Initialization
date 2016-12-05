'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.controller('PlayerController', ['$scope', function($scope) {
  $scope.playing = false;
  $scope.audio = document.createElement('audio');
  $scope.audio.src = '/media/npr.mp4';
  $scope.play = function () {
      $scope.audio.play();
      $scope.playing = true;
  };
  
  $scope.stop = function () {
      $scope.audio.pause();
      $scope.playing = false;
  };

  $scope.audio.addEventListener('ended', function () {
      $scope.$apply(function () {
          $scope.stop()
      });
  });
}]);
app.controller('RelatedController', ['$scope', function ($scope) {
    
}]);