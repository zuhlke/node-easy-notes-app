# node-easy-notes-app
This is the application server for the easy-notes PoC.
It is written in node.js and offers a REST interface to
the easy-notes client.

The purpose of the client and server is to
learn about Consumer-Driven Contract (CDC)
testing using Pact.

To run this application in a workstation,
you need a local copy of mongodb.
The easiest way to start one running is to run the command
```
mongo_setup_local.sh
```
in the `scripts` folder.

After copying the pacts file from the consumer
side into the `pacts` folder, run the tests as follows:
```
npm run pactTest
```

This verifies the conformance of the API to the contract expressed
in the pact file.