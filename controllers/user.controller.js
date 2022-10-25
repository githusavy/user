const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

// function to register a user in the database
module.exports.register = (req, res, next) => {
    var user = new User();
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.Email = req.body.Email;
    user.Password = req.body.Password;
    // save the user details on to mongo database
    user.save().then((doc) => {
        doc = doc.toJSON();
        delete doc.__v;
        res.send(doc);
    }).catch((error) => {
        if (error.code == 11000) {
            res.status(422).send(['Duplicate email adrress found.']);
        } else {
            return next(error);
        }
    });
}

// function to check the user authentication
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// function lists all the users in the database
exports.getAllUsers = (req, res) => {
    User.find().then((results) => {
        res.status(200).send(results);
    }).catch((Error) => {
        res.send(Error);
    })
}

// function which returns a user's information based on the ID
exports.getById = (req, res) => {
    User.findById(req.params.id).then((result) => {
        result = result.toJSON();
        delete result.__v;
        res.status(200).send(result);
    }).catch((error) => {
        res.sendStatus(404);
    });
};

// function which updates a user's information based on the ID
exports.updateById = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            // returns results after update
            User.findById(req.params.id)
                .then((result) => {
                    result = result.toJSON();
                    delete result._id;
                    delete result.__v;
                    res.status(200).send(result);
                }).catch((error) => {
                    res.status(404).send(error);
                });
        }).catch((error) => {
            res.status(404).send(error);
        });
};

//delete a users record based on the user id
exports.deleteById = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send({
                code: 200,
                message: 'User Removed Successfully'
            });
        }).catch((Error) => {
            res.status(500).send(Error);
        })
}