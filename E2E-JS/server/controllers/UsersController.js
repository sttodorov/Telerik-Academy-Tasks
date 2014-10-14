    var encryption = require('../utilities/encryption');
    var users = require('../data/users');
    var events = require('../data/events');
    var fs = require('fs');
    var User = require('mongoose').model('User');


    var CONTROLLER_NAME = 'users';
    var usernamePattern = /^[A-Za-z0-9._ ]{6,20}$/;
    var phonePattern = /^[0-9 +/]{4,20}$/;

    module.exports = {
    getRegister: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/register')
    },
    postRegister: function(req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        var userData = {};
        var intitiatives = [];
        var currentInitiative = {};

        req.busboy.on('file', function (fieldname, file, filename) {
            var date = new Date().getTime();
            fstream = fs.createWriteStream(__dirname + '/../../public/img/' + date + filename);
            file.pipe(fstream);
            userData.avatar = date + filename;
        });

        req.busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {

            if(fieldname.indexOf('socialLink') > -1)
            {
               if(!userData['socialLinks'])
               {
                   userData['socialLinks'] =[];
               }
                userData['socialLinks'].push(val);
            }
            // Initiatives work for only one!!!
            else if(fieldname.indexOf('initiative') > -1)
            {
                if(fieldname.indexOf('Year')>-1)
                {
                    currentInitiative.year = val;
                }else
                {
                    currentInitiative.initiative =val;
                }
                if(currentInitiative.year && currentInitiative.initiative)
                {
                    intitiatives.push(currentInitiative);
                    currentInitiative ={};
                }
            }
            else
            {
                userData[fieldname] = val;
            }
        });

        req.busboy.on('finish', function () {

            if (userData.password != userData.confirmPassword) {
                req.session.error = 'Passwords do not match!';
                res.redirect('/register');
                return;
            }
            if(userData.username.length <6)
            {
                req.session.error = 'Username too short. Min 6 chars!';
                res.redirect('/register');
                return;
            }
            if(!usernamePattern.test(userData.username))
            {
                req.session.error = 'Username not valid!';
                res.redirect('/register');
                return;
            }
            if(!phonePattern.test(userData.phoneNumber))
            {
                req.session.error = 'Invalid Phone number!';
                res.redirect('/register');
                return;
            }

            users.findByUsername(userData.username, function(err, user) {
                if(!!user) {
                    req.session.error = 'Username already taken!';
                    res.redirect('/register');
                    return;
                }
            });

            userData.salt = encryption.generateSalt();
            userData.hashPass = encryption.generateHashedPassword(userData.salt, userData.password);
            console.log("INITTIATIVES");
            console.log(intitiatives);
            userData.telerikAcademyInitiatives = intitiatives;

            users.create(userData, function(err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }
                req.logIn(user, function(err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()}); // TODO
                    }
                    else {
                        res.redirect('/');
                    }
                })
            });
        });
    },
    getLogin: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    },
    getProfile: function(req, res, next) {
        events.findAll({creatorName : req.user.username},function(err, events)
        {
            res.render(CONTROLLER_NAME + '/profile', {eventsByCuurentUser: events});

        });
    },
    getAvatar: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/avatar');
    },
    postAvatar: function(req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        var oldAvatar = req.user.avatar;
        var newAvatar = '';
        req.busboy.on('file', function (fieldname, file, filename) {
            var date = new Date().getTime();
            fstream = fs.createWriteStream(__dirname + '/../../public/img/' + date + filename);
            file.pipe(fstream);
            newAvatar = date + filename;
        });

        req.busboy.on('finish', function () {
            var conditions = { _id: req.user._id }
                , update = {$set: {avatar: newAvatar}}
                , options = {};
            users.update(conditions, update, options, function(err, numAffected) {
                if (err) {
                    console.log('Failed to change avatar: ' + err);
                    return;
                }
                fs.unlink(__dirname + '/../../public/img/' + oldAvatar, function (err) {
                    if (err) throw err;
                    console.log('successfully deleted the old avatar');
                });
           });
        });

        res.redirect('/avatar');

    },
    getPassword: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/password');
    },
    getPhoneNumber: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/phoneNumber');
    },
    postPhoneNumber: function(req, res, next) {
        var postNumber = req.body;
        if(!phonePattern.test(postNumber.phone)){
            req.session.error = 'Invalid phone number';
            res.redirect('/phoneNumber');
            return;
        }
        var conditions = { _id: req.user._id }
            , update = {$set: {phoneNumber: postNumber.phone}}
            , options = {};

        users.update(conditions, update, options, function(err, numAffected) {
            if (err) {
                console.log('Failed to change phone: ' + err);
                return;
            }
            req.session.success = 'Phone successfully changed!';
            res.redirect('/profile');
        });

    },
    getSocialLink: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/socialLink');
    },
    postSocialLink: function(req, res, next) {
        var postNumber = req.body;

        var conditions = { _id: req.user._id }
            , update = {$push: {socialLinks: postNumber.link}}
            , options = {};

        users.update(conditions, update, options, function(err, numAffected) {
            if (err) {
                console.log('Failed to add link: ' + err);
                return;
            }
            req.session.success = 'Link Added successfully !';
            res.redirect('/profile');
        });

    },
    postPassword: function(req, res, next) {
        var passwordData = req.body;
        var currentHashPass = encryption.generateHashedPassword(req.user.salt, passwordData.oldPassword);
        if (currentHashPass !== req.user.hashPass) {
            req.session.error = 'Invalid old password';
            res.redirect('/password');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/password');
            return;
        }

        var newHashPass = encryption.generateHashedPassword(req.user.salt, passwordData.newPassword);
        var conditions = { _id: req.user._id }
            , update = {$set: {hashPass: newHashPass}}
            , options = {};

        users.update(conditions, update, options, function(err, numAffected) {
            if (err) {
                console.log('Failed to change password: ' + err);
                return;
            }
            req.session.success = 'Password successfully changed!';
            res.redirect('/profile');
        });
    }
};