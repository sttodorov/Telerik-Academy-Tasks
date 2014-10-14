var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: { type: String, require: '{PATH} is required', unique: true },
        avatar: String,
        salt: String,
        hashPass: String,
        organizationPoints:{type:Number, default:0},
        venuePoints:{type:Number, default:0},
        firstName:{ type: String, require: '{PATH} is required'},
        lastName:{ type: String, require: '{PATH} is required'},
        phoneNumber:String,
        emailAddress:String,
        telerikAcademyInitiatives:{type:[{initiative:String, year:Number}], default:[]},
        //telerikAcademyInitiatives:{initiative:String, year:Number},
        socialLinks:[String]

    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);
};


