var mongoose = require('mongoose');

module.exports.init = function() {
    var eventSchema = mongoose.Schema({
        title: { type: String, require: '{PATH} is required', unique: true },
        documetation: String,
        location: {latitude:Number, longitude:Number},
        category: String,
        creatorName:String,
        creatorPhone:String,
        eventDate: Date,
        eventType:Number, // 0 - Public, 1 - Initiative, 2 - Season,
        selectedInitiative:{type:String},
        comments: {type: [{author:String, text:String}], default:[]},
        people: {type:[String], default:[]}

    });

    var Event = mongoose.model('Event', eventSchema);
};


