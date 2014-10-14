var events = require('../data/events');
var Event = require('mongoose').model('Event');


var CONTROLLER_NAME = 'events';
var locationPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

function filterEvents(events){
    var currentDate = new Date();
    var evntDate = new Date(events.eventDate);
    return evntDate.getTime() > currentDate.getTime();
};
function pastEvents(events){
    var currentDate = new Date();
    var evntDate = new Date(events.eventDate);
    return evntDate.getTime() < currentDate.getTime();
};

function compare(a,b) {
    var aDate =  new Date(a.eventDate);
    var bDate = new Date(b.eventDate);

    if (aDate.getTime() < bDate.getTime())
        return -1;
    if (aDate.getTime() > bDate.getTime())
        return 1;
    return 0;
};



module.exports = {
    postEvent: function(req, res, next) {
        var eventData = req.body;
        eventData.location = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        };

        if(!req.user.phoneNumber)
        {
            req.session.error = 'You should provide phone number!';
            res.redirect('/events/create');
            return;
        }
        eventData.creatorName = req.user.username;
        eventData.creatorPhone = req.user.phoneNumber;

        var currentTime = new Date();
        var selectedDate = new Date(eventData.eventDate);

        //Check if date off the event is in the past - DOSE NOT WORK ???
        if (selectedDate.getTime() < currentTime.getTime()) {
            req.session.error = 'Date should be in the future!';
            res.redirect('/events/create');
            return;
        }
        if(eventData.title.length < 3)
        {
            req.session.error = 'Title should be at least 3 chars!';
            res.redirect('/events/create');
            return;
        }
        var latAndLong = eventData.location.latitude + ', '+ eventData.location.longitude;


//        Matches For latitude anf longitude
//
//        +90.0, -127.554334 45, 180
//            -90, -180
//            -90.000, -180.0000
//            +90, +180
//        47.1231231, 179.99999999
//        Doesn't Match
//
//        -90., -180.
//            +90.1, -100.111
//            -91, 123.456
//        045, 180

        if(!locationPattern.test(latAndLong))
        {
            req.session.error = 'Latitude or Longitude are not in the correct format!';
            res.redirect('/events/create');
            return;
        }
        if(eventData.eventType == 0)
        {
            eventData.selectedInitiative = 'public';
        }else if(eventData.eventType == 1)
        {
            eventData.selectedInitiative = eventData.selectedInitiative[0];
        }
        else
        {
            eventData.selectedInitiative = eventData.selectedInitiative[1];
        }


        events.create(eventData, function(err, createdEvent)
        {
            console.log(eventData);
            if(err)
            {
                req.session.error = err;
                res.redirect('/events/create');
                return;
            }
            res.redirect('/events');

        });

    },
    getEventForm: function(req,res,next)
    {
        res.render(CONTROLLER_NAME + '/create',{initiatives: req.user.telerikAcademyInitiatives});
    },
    getEvents: function(req,res,next) {
        events.findAll({},function (err, events) {
            if (err) {
                req.session.error = err;
                res.redirect('/');
                return;
            }
            var username = req.user.username;
            events  = events.filter(filterEvents).sort(compare);

            events.forEach(function(ev)
            {

                ev.isInTheEvent = false;
                if( ev.people.indexOf(req.user.username) > -1)
                {
                    ev.isInTheEvent = true;
                }
            });
            res.render(CONTROLLER_NAME + '/all', { events: events });
        });
    },
    getPastEvents : function(req,res,next) {
    events.findAll({},function (err, events) {
        if (err) {
            req.session.error = err;
            res.redirect('/');
            return;
        }
        events  = events.filter(pastEvents).sort(compare);
        
        res.render(CONTROLLER_NAME + '/past', { events: events });
    });
},
    getEventDetails: function(req,res,next)
    {
        events.findById(req.params.id,function(err,event){
            if(err)
            {
                req.session.error = err;
                res.redirect('/events');
                return;
            }
            var isInTheEvent = false;
            if( event.people.indexOf(req.user.username) > -1)
            {
                isInTheEvent = true;
            }


            console.log(isInTheEvent);
            res.render(CONTROLLER_NAME + '/details', {event: event, isPartOfTheEvent: isInTheEvent});
        });
    },
    addComment: function(req,res,next)
    {
        var conditions = { _id: req.params.id };
        var update = {$push: {comments: {author: req.user.username, text: req.body.comment }}};
        var options = {};

        events.update(conditions, update,options, function(err, numAffected) {
            if (err) {
                console.log('Failed to add comment: ' + err);
                return;
            }
            req.session.success = 'Comment sent successfully!';
            res.redirect('/events/' + req.params.id);
        });
    },
    joinEvent: function(req,res,next){
        var update;
        var responseMessage;
        if(req.body.Button === 'Join')
        {
            var update = {$push: {people: req.user.username}};
            responseMessage = 'You Join event successfully!';
        }
        else
        {
            update = {$pull: {people: req.user.username}};
            responseMessage = 'You Leave event successfully!';
        }
        var conditions = { _id: req.body.eventId };

        var options = {};
        events.update(conditions, update,options, function(err, numAffected) {
            if(err)
            {
                req.session.error = err;
                res.redirect('/events');
                return;
            }
            req.session.success = responseMessage;
            res.redirect('/events');
        });
    }

}