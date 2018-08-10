const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organise and keep track of all your notes."});
});

app.listen(8082, () => {
    console.log("Server is listening on port 8082");
});

// mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
.then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
});

require('./app/routes/note.routes.js')(app);

const gracefulExit = () => {
    mongoose.connection.close(function () {
        console.log('Mongoose connection with DB :', dbConfig.url, 'is disconnected through app termination');
        process.exit(0);
    });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = {
    app
};

