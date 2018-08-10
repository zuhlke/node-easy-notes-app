const { Verifier } = require('@pact-foundation/pact');

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
    it('should validate the expectations of Matching Service', () => {

        let opts = {
            provider: 'easy-notes-app',
            providerBaseUrl: 'http://35.197.206.134:8080',
            pactUrls: ['/Users/yuwa/Projects/node-easy-notes-app/pacts/easy-notes-client-easy-notes-app.json']
        };

        return new Verifier().verifyProvider(opts)
            .then(output => {
                console.log('Pact Verification Complete!')
                console.log(output)
            });
    });
});
