app.factory('driversService', ['$http', '$q', 'notifier', 'authorization', 'baseServiceUrl', function($http, $q, notifier, authorization, baseServiceUrl) {
    var driversUrl = baseServiceUrl +'/api/drivers';

    return {
        getLatestDrivers: function () {
            var deferred = $q.defer();
            $http.get(driversUrl)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        },
        getDriversByNameAndPage: function(name, page){
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(driversUrl + '?page='+page + '&username='+name , { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });
            return deferred.promise;
        },
        getDriversByPage: function(page){
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(driversUrl + '?page='+page , { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });
            return deferred.promise;
        },
        getDriverDetails: function(id)
        {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();
            $http.get(driversUrl + '/'+id , { headers: headers })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    notifier.error(error['message']);
                });
            return deferred.promise;
        }
    }
}]);