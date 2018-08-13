const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organise and keep track of all your notes."});
});

const dbConfig = require('../config/database.config.js');
const dbConnection = require('./services/db.service.js').dbConnection(dbConfig.url);
require('./routes/note.routes.js')(app);

module.exports = {
    app,
    dbConnection
};
