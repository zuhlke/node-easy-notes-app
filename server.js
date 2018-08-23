const { app, dbConnection } = require('./app/app.js');

const server = dbConnection.connect().then(() => {
    return app.listen(8082, () => {
        console.log("Server is listening on port 8082");
    });
});
