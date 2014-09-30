'use strict';

app.controller('HomeCtrl', ['$scope', 'tripsService','driversService','statsService', function($scope, tripService,driversService,statsService) {

    $scope.publicDrivers = "views/partials/driversPublic.html";
    $scope.publicTrips = "views/partials/tripsPublic.html";

    tripService.getLatestTrips().then(function(data)
    {
        $scope.latestTrips = data;
    });

    driversService.getLatestDrivers().then(function(data)
    {
        $scope.latestDrivers = data;
    });

    statsService.getStatistic().then(function(data){
       $scope.statistic = data;
    });


}]);