const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: '{VALUE} is not valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    return _.pick(user, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var token = jwt.sign({ _id: user._id}, 'new123');
    user.tokens.push({access: 'auth', token});
    return user.save().then((res) => {
        return token;
    });
};

UserSchema.statics.getUserByToken = function(token) {
    var decoded

    try {
        decoded = jwt.verify(token, 'new123');
        return User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
    }
    catch(e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

};

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password'))
    {
        bcrypt.genSalt(8, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };