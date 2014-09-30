'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', function($routeProvider) {
        var routeUserChecks = {
            adminRole: {
                authenticate: function(auth) {
                    return auth.isAuthorizedForRole('admin');
                }
            },
            authenticated: {
                authenticate: function(auth) {
                    return auth.isAuthenticated();
                }
            }
        };


        $routeProvider
            .when('/register', {
                templateUrl: 'views/partials/register.html',
                controller: 'SignUpCtrl'
            })
            .when('/', {
                templateUrl: '../views/partials/home.html',
                controller: 'HomeCtrl'
            })
            .when('/trips', {
                templateUrl: 'views/partials/trips.html',
                controller: 'tripsCtrl'
                //resolve: routeUserChecks.authenticated
            })
            .when('/trips/create', {
                templateUrl: 'views/partials/createTrip.html',
                controller: 'createTripCtrl',
                resolve: routeUserChecks.authenticated
            })
            .when('/drivers', {
                templateUrl: 'views/partials/drivers.html',
                controller: 'driversCtrl'
                //resolve: routeUserChecks.authenticated
            })
            .when('/drivers/:id', {
                templateUrl: 'views/partials/driverDetails.html',
                controller: 'driverDetailsCtrl',
                resolve: routeUserChecks.authenticated
            })
            .when('/trips/:id', {
                templateUrl: 'views/partials/tripDetails.html',
                controller: 'tripDetailsCtrl',
                resolve: routeUserChecks.authenticated
            })
            .when('/unauthorized', {
                templateUrl: 'views/partials/unauthorized.html'
                //controller: 'HomeCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    .constant('baseServiceUrl', 'http://spa2014.bgcoder.com');
//    .constant('baseServiceUrl', 'http://localhost:1337');

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    })
});