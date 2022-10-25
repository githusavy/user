require('./config/config');
require('./models/database');
require('./config/passportConfig');

// imports 
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const cors = require('cors');
const passport = require('passport');

const bodyParser = require('body-parser');
const baseRoute = require('./routes/router');


// Swagger
const Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Registration API",
            version: "1.0.0",
            description: "A Simple User Registration API",
        },
        servers: [{
            url: "http://localhost:3000",
            description: "User Registration",
        }, ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(Options);

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/user', baseRoute);

// error handler
app.use((error, req, res, next) => {
    if (error.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(error.errors).forEach(key => valErrors.push(error.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT, () => console.log('Server Started at Port: ', process.env.PORT));