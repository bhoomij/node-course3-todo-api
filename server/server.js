var express = require('express');
var bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo.js');
const { User } = require('./models/user.js');
const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body.text);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((todo) => {
        res.send(todo);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo)
        {
            return res.status(404).send({text: 'Todo not found for given ID'});
        }
        res.send({todo});
    }).catch( (e) => res.status(404).send(e));

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo)
        {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(404).send(e));

});

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
})

module.exports = { app };