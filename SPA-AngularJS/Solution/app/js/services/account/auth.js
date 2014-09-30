'use strict';

app.factory('auth', ['$http', '$q', 'identity', 'notifier', 'authorization', 'baseServiceUrl', function($http, $q, identity, notifier, authorization, baseServiceUrl) {
    var usersApi = baseServiceUrl + '/api/users'

    return {
        signup: function(user) {
            var deferred = $q.defer();
            $http.post(usersApi + '/register', user)
                .success(function() {
                    deferred.resolve();
                }, function(response) {
                    deferred.reject(response);
                }).error(function(error) {
                    notifier.error(error['message']);
                });

            return deferred.promise;
        },
        login: function(user){
            var deferred = $q.defer();
            user['grant_type'] = 'password';
            $http.post(usersApi + '/login', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', { headers: {'Content-Type': 'application/x-www-form-urlencoded'} })
                .success(function(response) {
                    if (response["access_token"]) {
                        identity.setCurrentUser(response);
                        deferred.resolve(true);
                    }
                    else {
                        deferred.resolve(false);
                    }
                }).error(function(err){
                    notifier.error(err['error_description'])
                });

            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();
            $http.post(usersApi + '/logout', {}, { headers: headers })
                .success(function() {
                    identity.setCurrentUser(undefined);
                    deferred.resolve();
                });

            return deferred.promise;
        },
        isAuthenticated: function() {
            var deferred = $q.defer();
            if (identity.isAuthenticated()) {
                deferred.resolve();
            }
            else {
                deferred.reject('not authorized');
            }
            return deferred.promise;
        },
        isAuthorizedForRole: function(role) {
            var deferred = $q.defer();
            if (identity.isAuthorizedForRole(role)) {
                deferred.resolve();
            }
            else {
                deferred.reject('not authorized');
            }
            return deferred.promise;
        }
    }
}])