'use strict';

app.controller('SignUpCtrl', ['$scope', '$location', 'auth', 'notifier', function($scope, $location, auth, notifier) {
    $scope.signup = function(user) {
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if(user.email.match(pattern))
        {
            if(user.password.length<6)
            {
                notifier.error('Password should ne at least 6 characters!');
                return;
            }
            if(user.password != user.confirmPassword)
            {
                notifier.error("Passwords does not match")
            }
            else
            {
                auth.signup(user).then(function(data) {
                    notifier.success('Registration successful!');
                    $location.path('/home');
                });
            }
        }
        else
        {
            notifier.error("Please enter valid email!")
        }

    }
}]);