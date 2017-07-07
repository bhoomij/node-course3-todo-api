const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Successfully connected to MongoDB server');

    // db.collection('Todos').deleteOne({text: 'Learn Mongo'}).then((res) => console.log(res));

    // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => console.log(res));

    // db.collection('Users').deleteMany({name: 'Bhoomi'});

    db.collection('Users').findOneAndDelete({_id: ObjectID('595efdc5aacf9f23b03c788c')}).then((user) => {
        console.log(user);
    });

    // db.close();
});

