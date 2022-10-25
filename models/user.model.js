const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// schema definition for user information
var userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: 'First name can\'t be empty'
    },
    LastName: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    Email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    Password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    SecretHashKey: String
});

// Custom validation for email 
userSchema.path('Email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events section- defining a pre event for save function
userSchema.pre('save', function(next) {
    // hashing the password using bcryptjs
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.Password, salt, (err, hash) => {
            this.Password = hash;
            this.SecretHashKey = salt;
            next();
        });
    });
});

// Method which verifies the password entered with the hashed password
userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

// Method which generates the JWT token
userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET);
}

mongoose.model('User', userSchema);