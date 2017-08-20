const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

var todos = [{
    _id: new ObjectID(),
    text: 'First todo'
}, {
    _id: new ObjectID(),
    text: 'Second todo',
    completed: true,
    completedAt: 456
}];

var populateTodos = (done) => {
    Todo.remove({}).then( () => {
        Todo.insertMany(todos);
    }).then(() => done());
};

var userOneID = new ObjectID();
var userTwoID = new ObjectID();

var users = [{
    _id: userOneID,
    email: "test1@test.com",
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID}, 'new123')
    }]
},
{
    _id: userTwoID,
    email: "test2@test.com",
    password: 'userTwoPass'
}];

var populateUsers = (done) => {
    User.remove({}).then( () => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
    
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};