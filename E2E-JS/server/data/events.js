var Event = require('mongoose').model('Event');

module.exports = {
    create: function(user, callback) {
        Event.create(user, callback);
    },
    update: function(conditions, update, options, callback) {
        Event.update(conditions, update, options, callback);
    },
    findById: function(id, callback) {
        Event.findOne({_id: id}, callback);
    },
    findAll: function(cond,callback){
        Event.find(cond, callback);

    }
};