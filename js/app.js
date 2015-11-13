'use strict';

angular.module('app',['ngRoute', '7minute', 'ngSanitize', 'mediaPlayer', 'LocalStorageModule', 'ui.bootstrap', 'ngAnimate'])
    .config(['$routeProvider','$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {
    $routeProvider.when('/start', {
        templateUrl: 'partials/start.html'
    });
    $routeProvider.when('/workout', {
        templateUrl: 'partials/workout.html',
        controller: 'WorkoutController'
    });
    $routeProvider.when('/finish', {
        templateUrl: 'partials/finish.html'
    });
    $routeProvider.otherwise({
        redirectTo: '/start'
    });
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://*.youtube.com/**'
    ]);

}]);


angular.module('7minute', []);