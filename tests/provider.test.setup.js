const services = require('../app/services/note.service.js');
const noteService = services.noteService();

const expectedNotes = [
    {
        title: 'Third Note',
        content: 'Me, a name I call myself'
    },
    {
        title: 'Fourth Note',
        content: 'Far, a long long way to run'
    }
];

let currentState;

function addFirstNote() {
    return noteService.deleteAll().then(() => {
        return noteService.create(expectedNotes[0]);
    });
}

function addSecondNote() {
    return noteService.create(expectedNotes[1]);
}

function doNothing() {
    return Promise.resolve(true);
}

function goToState(desiredState) {
    console.log('Setup state:', desiredState);
    if(currentState === desiredState) {
        console.log('Already in state', currentState)
        return doNothing();
    }
    currentState = desiredState; // for next time - assume the state change will succeed
    switch(desiredState) {
        case 'empty': return noteService.deleteAll();
        case 'first note': return addFirstNote();
        case 'second note': return noteService.deleteAll().then(addSecondNote);
        case 'two notes': return addFirstNote().then(addSecondNote);
        default: return doNothing();
    }
}

exports.stateService = () => {
    return {
        moveToRequestedState: (req, res) => {
            return goToState(req.body.state).then(() => {
                return res.status(200).send('');
            }).catch(err => {
                currentState = null;
                return res.status(500).send(err);
            });
        },
        getExpectedNote: (subscript) => {
            return expectedNotes[subscript];
        }
    };
};
