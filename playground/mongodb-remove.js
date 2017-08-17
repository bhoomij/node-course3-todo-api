
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose.js');
const { Todo } = require('./../server/models/todo.js');
const { User } = require('./../server/models/user.js');

// Todo.remove({}).then((res) => console.log(res));

// Todo.findOneAndRemove({_id: '5995b20cfa1b40107cf89874'}).then((res) => console.log(res));

// Todo.findByIdAndRemove('5995b93a04e771e7b8a9148e').then((todo) => console.log(todo));