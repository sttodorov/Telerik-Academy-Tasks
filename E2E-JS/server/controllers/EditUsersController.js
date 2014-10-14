var encryption = require('../utilities/encryption');
var users = require('../data/users');
var fs = require('fs');

var CONTROLLER_NAME = 'users';
var phonePattern = /^[0-9 +/]{4,20}$/;

module.exports = {
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
        req.session.success = 'Avatar successfully changed!';
        res.redirect('/profile');

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
    getPassword: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/password');
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