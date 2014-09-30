app.factory('statsService', ['$http', '$q',  'notifier', 'baseServiceUrl', function($http, $q, notifier, baseServiceUrl) {
    var driversUrl = baseServiceUrl +'/api/stats';

    return {
        getStatistic: function () {
            var deferred = $q.defer();
            $http.get(driversUrl)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    for (var errorMsg in error.ModelState) {
                        notifier.error(error.ModelState[errorMsg][0]);
                    }
                });

            return deferred.promise;
        }
    }

}]);