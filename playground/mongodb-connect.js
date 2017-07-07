const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Successfully connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, res) => {
    //     if(err) {
    //         return console.log('Unable to insert', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

     db.collection('Users').insertOne({
        text: 'Bhoomi',
        age: 25,
        location: 'Ahmedabad'
    }, (err, res) => {
        if(err) {
            return console.log('Unable to insert', err);
        }
        console.log(res.ops[0]._id.getTimestamp());
    });

    db.close();
});

