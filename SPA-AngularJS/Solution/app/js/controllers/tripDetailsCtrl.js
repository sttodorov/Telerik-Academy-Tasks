'use strict';

app.controller('tripDetailsCtrl', ['$scope', 'identity','tripsService','$routeParams', function($scope, identity,tripService,$routeParams) {

    $scope.isAuth = identity.isAuthenticated();

    tripService.getTripDetails($routeParams.id).then(function (data) {
        $scope.trip = data;
    });

    $scope.joinTrip = function()
    {
        tripService.joinTrip($routeParams.id).then(function(data){
        })
    }
}]);

