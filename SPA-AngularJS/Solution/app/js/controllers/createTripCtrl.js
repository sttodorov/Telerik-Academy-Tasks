'use strict';

app.controller('createTripCtrl', ['$scope', 'identity','notifier','tripsService','citiesService','$location', function($scope, identity, notifier,tripService,citiesService,$location) {

    citiesService.getCities().then(function(data){
        $scope.allCities = data;
    });

    $scope.createTrip = function(trip)
    {
        var d = new Date();
        if(trip.departureTime.getTime() < d.getTime())
        {
            notifier.error("The date must be in the future!");

        }else if(trip.from==trip.to)
        {
            notifier.error("Start and end destination must be different!");
        }
        else{
            tripService.createTrip(trip).then(function(data){
                console.log(data);
            })
        }
    }


}]);

