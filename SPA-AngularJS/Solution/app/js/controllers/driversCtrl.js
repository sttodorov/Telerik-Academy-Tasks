'use strict';

app.controller('driversCtrl', ['$scope', 'identity','notifier','tripsService','driversService','$location', function($scope, identity, notifier,tripService,driversService,$location) {

    $scope.isAuth = identity.isAuthenticated();

    $scope.publicDrivers = "views/partials/driversPublic.html";
    $scope.driversFilters = "views/partials/driversFilters.html";

    $scope.page = 1;

    driversService.getLatestDrivers().then(function(data)
    {
        $scope.latestDrivers = data;
        $scope.resultCount = data.length;
    });

    $scope.getUsersByName = function(searchedUsername){
        if(searchedUsername==undefined)
        {
            driversService.getDriversByPage($scope.page).then(function(data){
                $scope.latestDrivers = data;
                $scope.resultCount = data.length;

            })
        }
        else
        {
            driversService.getDriversByNameAndPage(searchedUsername, $scope.page).then(function(data){
                $scope.latestDrivers = data;
                $scope.resultCount = data.length;

            })
        }
    }

    $scope.redirectToUser = function(id)
    {
        $location.path($location.path() +'/'+ id );
    }

    $scope.increasePage = function()
    {
        $scope.page++;
    }
    $scope.decreasePage = function()
    {
        if($scope.page>0)
        {
            $scope.page--;
        }
    }

}]);