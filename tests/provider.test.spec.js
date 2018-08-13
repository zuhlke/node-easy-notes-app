const { Verifier } = require('@pact-foundation/pact');
const { app } = require('../server.js');

const path = require('path')

const getPactFilePath = (relativePath) => {
  const dir = path.dirname(path.dirname(module.filename));
  console.log(dir); // show the working dir
  return dir + '/' + relativePath;
}

app.post('/setup', (req, res) => {
    console.log('Setup state:', req.body.state);
    res.end();
});

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
    it('should validate the expectations of Matching Service', () => {

        let opts = {
            provider: 'easy-notes-app',
            providerBaseUrl: 'http://localhost:8082',
            providerStatesSetupUrl: 'http://localhost:8082/setup',
            pactUrls: [ getPactFilePath('pacts/easy-notes-client-easy-notes-app.json')]
        };

        return new Verifier().verifyProvider(opts)
            .then(output => {
                console.log('Pact Verification Complete!')
                console.log(output)
            });
    });
});
