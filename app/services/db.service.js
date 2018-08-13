const mongoose = require('mongoose');

exports.dbConnection = (url) => {
    return {
        connect: () => {
            return mongoose.connect(url, { useNewUrlParser: true })
            .then(() => {
                console.log("Successfully connected to the database at", url);
            }).catch(err => {
                console.log("Could not connect to the database. Exiting now...");
                process.exit();
            });
        },

        close: () => {
            return mongoose.connection.close(() => {
                console.log('Mongoose connection with DB :', url, 'is disconnected through app termination');
            });
        }
    };
}
