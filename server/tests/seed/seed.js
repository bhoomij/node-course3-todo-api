const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');


var userOneID = new ObjectID();
var userTwoID = new ObjectID();

var todos = [{
    _id: new ObjectID(),
    text: 'First todo',
    _creator: userOneID
}, {
    _id: new ObjectID(),
    text: 'Second todo',
    completed: true,
    completedAt: 456,
    _creator: userTwoID
}];

var populateTodos = (done) => {
    Todo.remove({}).then( () => {
        Todo.insertMany(todos);
    }).then(() => done());
};

var users = [{
    _id: userOneID,
    email: "test1@test.com",
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
},
{
    _id: userTwoID,
    email: "test2@test.com",
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoID}, process.env.JWT_SECRET)
    }]
}];

var populateUsers = (done) => {
    User.remove({}).then( () => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
    
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};