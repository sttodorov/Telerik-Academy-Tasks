'use strict';

app.controller('tripsCtrl', ['$scope', 'identity','notifier','tripsService','tripsFilterService', 'citiesService','$location',
    function($scope, identity, notifier,tripService, tripsFilterService, citiesService,$location) {

        $scope.isAuth = identity.isAuthenticated();

        $scope.publicTrips = "views/partials/tripsPublic.html";
        $scope.privateTrips = "views/partials/tripsPrivate.html";
        $scope.tripsFilters = "views/partials/tripsFilters.html";

        $scope.sortModel={
            page:1,
            onlyMine:false,
            includeFinished:false
        };

        tripService.getLatestTrips().then(function(data)
        {
            $scope.latestTrips = data;
            $scope.resultCount = data.length;
        });

        citiesService.getCities().then(function(data){
            $scope.allCities = data;
        });

        $scope.CreateTrip = function()
        {
            $location.path($location.path() +'/create');
        }

        $scope.getFiltersResult = function(sortModel) {

            tripsFilterService.getTripsByPage(sortModel.page).then(function (data) {
                $scope.latestTrips = data;
                $scope.resultCount = data.length;
            });

            if (sortModel.sort != undefined && sortModel.order != undefined) {
                tripsFilterService.getTripsOrderedAndByPage(sortModel.page, sortModel.sort, sortModel.order).then(function (data) {
                    $scope.latestTrips = data;
                    $scope.resultCount = data.length;
                });
            }

            if (sortModel.from != undefined || sortModel.to != undefined) {
                tripsFilterService.getTripsByDestination(sortModel.page, sortModel.from, sortModel.to).then(function (data) {
                    $scope.latestTrips = data;
                    $scope.resultCount = data.length;

                });
            }

            if (sortModel.includeFinished)
            {
                tripsFilterService.getFinishedTrips(sortModel.page, sortModel.includeFinished).then(function(data){
                    $scope.latestTrips = data;
                    $scope.resultCount = data.length;
                });
            }

            if (sortModel.onlyMine)
            {
                tripsFilterService.getSelfTrips(sortModel.page,sortModel.onlyMine).then(function(data){
                    $scope.latestTrips = data;
                    $scope.resultCount = data.length;
                });
            }
        }

        $scope.increasePage = function()
        {
            $scope.sortModel.page++;
        }
        $scope.decreasePage = function()
        {
            if($scope.sortModel.page>1)
            {
                $scope.sortModel.page--;
            }
        }

}]);

