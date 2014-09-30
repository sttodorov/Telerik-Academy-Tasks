app.factory('tripsFilterService', ['$http', '$q', 'notifier', 'authorization', 'baseServiceUrl', function($http, $q, notifier, authorization, baseServiceUrl) {
    var tripsUrl = baseServiceUrl +'/api/trips';

    return {
        getTripsByPage: function (page) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(tripsUrl + '?page=' + page, { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        },
        getTripsOrderedAndByPage: function (page, orderBy, type) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(tripsUrl + '?page=' + page + '&orderBy=' + orderBy + '&orderType=' + type, { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        },
        getTripsByDestination: function (page, from, to) {

            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            if (from != undefined && to != undefined) {
                $http.get(tripsUrl + '?page=' + page + '&from=' + from + '&to=' + to, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (error) {
                        notifier.error(error['message']);
                    });
            }
            if (from == undefined && to != undefined) {
                $http.get(tripsUrl + '?page=' + page + '&to=' + to, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (error) {
                        notifier.error(error['message']);
                    });
            }
            if (from != undefined && to == undefined) {
                $http.get(tripsUrl + '?page=' + page + '&from=' + from, { headers: headers })
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (error) {
                        notifier.error(error['message']);
                    });
            }
            return deferred.promise;
        },
        getFinishedTrips: function (page, finished) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(tripsUrl + '?page=' + page + '&finished=' + finished, { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        },
        getSelfTrips: function (page, mine) {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(tripsUrl + '?page=' + page + '&onlyMine=' + mine, { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        }
    }
}]);