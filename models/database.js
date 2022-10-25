const mongoose = require('mongoose');

//establish connection to mongodb 
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err));
    }
});

require('./user.model');