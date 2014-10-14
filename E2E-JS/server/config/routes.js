var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/profile', auth.isAuthenticated, controllers.users.getProfile);

    app.get('/avatar', auth.isAuthenticated, controllers.editUsers.getAvatar);
    app.post('/avatar', auth.isAuthenticated, controllers.editUsers.postAvatar);

    app.get('/password', auth.isAuthenticated, controllers.editUsers.getPassword);
    app.post('/password', auth.isAuthenticated, controllers.editUsers.postPassword);

    app.get('/phoneNumber', auth.isAuthenticated, controllers.editUsers.getPhoneNumber);
    app.post('/phoneNumber', auth.isAuthenticated, controllers.editUsers.postPhoneNumber);

    app.get('/socialLink', auth.isAuthenticated, controllers.editUsers.getSocialLink);
    app.post('/socialLink', auth.isAuthenticated, controllers.editUsers.postSocialLink);

    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);


    app.get('/eventsCreate', auth.isAuthenticated, controllers.events.getEventForm);
    app.post('/eventsCreate', auth.isAuthenticated, controllers.events.postEvent);

    app.get('/events', auth.isAuthenticated, controllers.events.getEvents);
    app.get('/eventsPast', auth.isAuthenticated, controllers.events.getPastEvents);
    app.post('/events', auth.isAuthenticated, controllers.events.joinEvent);

    app.get('/events/:id', auth.isAuthenticated, controllers.events.getEventDetails);
    app.post('/events/:id', auth.isAuthenticated, controllers.events.addComment);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};