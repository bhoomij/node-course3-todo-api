const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Successfully connected to MongoDB server');

    // db.collection('Todos').find({_id: new ObjectID('595dc4588d7aed138813c798')}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos count:', count);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({text: 'Bhoomi'}).toArray().then((docs) => {
        console.log(docs);
    });

    // db.close();
});

