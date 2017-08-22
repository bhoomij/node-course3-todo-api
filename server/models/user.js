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

UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
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
        return Promise.reject();
    }
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({email}).then((user) => {
        if(!user) {
            return reject();
        }
        return bcrypt.compare(password, user.password).then((res) => {
                if(res) {
                    return user;
                }
                else {
                    return reject();
                }
            });
    });
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