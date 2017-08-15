
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose.js');
const { Todo } = require('./../server/models/todo.js');
const { User } = require('./../server/models/user.js');

var id = "5992faef58f8a317d0c462c1";

// if(!ObjectID.isValid(id))
// {
//     console.log('not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => console.log('Todos ' + todos));


// Todo.findOne({
//     _id: id
// }).then((todo) => console.log('Todo ' + todo));

// Todo.findById(id).then((todo) => {
//     if(!todo)
//     {
//         console.log('Todo not found');
//     }
//     else {
//         console.log('Todo by ID ' + todo);
//     }
 
// });

// User.findById('').then((user) => {
//     if(!user)
//     {
//         console.log('User not found');
//     }
//     else{
//         console.log('User ' + user);
//     }
// })