var UsersController = require('./UsersController');
var EventsControlle = require('./EventsController');
var EditUsersController = require('./EditUsersController');

module.exports = {
    users: UsersController,
    editUsers: EditUsersController,
    events: EventsControlle
};