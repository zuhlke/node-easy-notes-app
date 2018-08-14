const path = require('path')
const { Verifier } = require('@pact-foundation/pact');
//const { VerifierOptions } = require('@pact-foundation/pact-node');
const config = require('../config/pact.test.config.js');
const { app, dbConnection } = require('../app/app.js');

let server;

beforeAll(() => {
    dbConnection.connect().then(() => {
        app.post('/setup', (req, res) => {
            console.log('Setup state:', req.body.state);
            return res.status(200).send('');
        });

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

        let opts = {
            provider: 'easy-notes-app',
            providerBaseUrl: config.url,
            providerStatesSetupUrl: config.url + '/setup',
            pactUrls: [ path.resolve(process.cwd(), 'pacts', 'easy-notes-client-easy-notes-app.json') ]
        };

        return new Verifier().verifyProvider(opts)
            .then(output => {
                console.log('Pact Verification Complete!');
                console.log(output);
                done();
            }).catch(done);
    });
});
