app.factory('tripsService', ['$http', '$q', 'identity', 'notifier', 'authorization', 'baseServiceUrl', function($http, $q, identity, notifier, authorization, baseServiceUrl) {
    var tripsUrl = baseServiceUrl +'/api/trips';

    return {
        createTrip: function (trip) {
        var deferred = $q.defer();
        var headers = authorization.getAuthorizationHeader();
        $http.post(tripsUrl, trip, { headers: headers })
            .success(function (data) {
                deferred.resolve(data);
                notifier.success("Successfully created trip!");
            }).error(function (error) {
                notifier.error(error['message']);
            });

        return deferred.promise;
        },
        getLatestTrips: function () {
            var deferred = $q.defer();
            $http.get(tripsUrl)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        },
        getTripDetails: function (id) {
        var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(tripsUrl +'/'+id  , { headers: headers })
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                notifier.error(error['message']);
            });

        return deferred.promise;
        },
        joinTrip: function (id) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.put(tripsUrl +'/'+id ,{} , { headers: headers })
                .success(function (data) {
                    notifier.success("Successfuli joined!");
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        }
    }
}]);