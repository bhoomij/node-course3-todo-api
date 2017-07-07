const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Successfully connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({_id: ObjectID('595f06116471cd5ad24ab844')}, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res)=> {
    //     console.log(res);
    // });


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('595dc4993fbaec2258a13df3')
    }, {
        $set: {
            name: 'Jane'
        },
        $inc: {
            age: 1
        }
    },
    {
        returnOriginal: false
    }).then((res) => console.log(res));

    // db.close();
});

