'use strict';

app.controller('driverDetailsCtrl', ['$scope', 'identity','notifier','driversService','$routeParams','$location', function($scope, identity, notifier,driversDetails,$routeParams,$location) {

    $scope.isAuth = identity.isAuthenticated();
    $scope.publicTrips = "views/partials/tripsPublic.html";

    driversDetails.getDriverDetails($routeParams.id).then(function (data) {
        $scope.driver = data;
        $scope.latestTrips = data.trips;
    });

}]);

