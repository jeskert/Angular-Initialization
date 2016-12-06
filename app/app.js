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

var apiKey = 'MDExODQ2OTg4MDEzNzQ5OTM4Nzg5MzFiZA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', function ($scope, $http) {

    var audio = document.createElement('audio');
    $scope.audio = audio;
    $scope.play = function (program) {
        if ($scope.playing){
            audio.pause();
        }
        var url = program.audio[0].format.mp4.$text;
        audio.src = url;
        audio.play();
        $scope.playing = true;
    }
    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function(data, status) {
        $scope.programs = data.list.story;
    }).error(function(data, status) {
    });
});

app.directive('nprLink', function() {
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            play: '&'
        },
        templateUrl: 'view1/nprListItem.html',
        link: function(scope, ele, attr) {
            scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    }
});
