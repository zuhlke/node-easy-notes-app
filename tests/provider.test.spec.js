const path = require('path')
const { Verifier } = require('@pact-foundation/pact');
const config = require('../config/pact.test.config.js');
const { app, dbConnection } = require('../app/app.js');
const setup = require('./provider.test.setup.js').stateService();

let server;

beforeAll(() => {
    dbConnection.connect().then(() => {
        app.post('/setup', setup.moveToRequestedState);

        server = app.listen(config.port, () => {
            console.log("Server is listening on port", config.port);
        });

        return server;
    });
});

afterAll(() => {
    server.close(() => {
        console.log('Closed down application server on port', config.port);
        return dbConnection.close();
    });
});

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {

    it('should validate the expectations of Matching Service', (done) => {

        const opts = {
            provider: 'easy-notes-app',
            providerBaseUrl: config.url,
            providerStatesSetupUrl: config.url + '/setup',
            publishVerificationResult: true,
            providerVersion: require('../package').version,
            pactUrls: [ 'http://localhost/pacts/provider/easy-notes-app/consumer/easy-notes-client/latest/test' ]
        };

        return new Verifier().verifyProvider(opts)
            .then(output => {
                console.log('Pact Verification Complete!');
                console.log(output);
            }).then(done)
            .catch(done);
    });
});
