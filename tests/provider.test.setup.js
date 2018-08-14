const services = require('./note.service.wrapper.js');
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
const notes = [];

function doNothing() {
    return Promise.resolve(true);
}

function addFirstNote() {
    return noteService.deleteAll().then(() => {
        console.log('database cleared');
        return noteService.create(expectedNotes[0]);
    }).then(note => {
        notes[0] = note;
        return note;
    }).catch(err => {
        console.log('caught exception:', err.message);
    });
}

function addSecondNote() {
    return noteService.create(expectedNotes[1]).then(note => {
       notes[1] = note;
       return note;
   }).catch(err => {
       console.log('caught exception:', err.message);
   });
}

function deleteFirstNote() {
    if(notes[0]) {
        return noteService.deleteOne(notes[0]._id)
    } else {
        return doNothing();
    }
}

function goToState(desiredState) {
    console.log('Setup state:', desiredState);
    if(currentState === desiredState) {
        console.log('Already in state', currentState)
        return doNothing();
    }
    currentState = desiredState; // for next time - assume the state change will succeed
    switch(desiredState) {
        case 'no notes': return noteService.deleteAll(); break;
        case 'first note': return addFirstNote(); break;
        case 'second note': return addFirstNote().then(addSecondNote).then(deleteFirstNote); break;
        case 'two notes': return addFirstNote().then(addSecondNote); break;
        default: return doNothing(); break;
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
