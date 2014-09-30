'use strict';

app.filter('statusImage', function() {
    return function(input) {
        if(input){
            return 'img/Tick.png';
        }
        else{
            return 'img/Cross.png';
        }

    }
});