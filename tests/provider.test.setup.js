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

function addFirstNote() {
    return noteService.create(expectedNotes[0]);
}

function addSecondNote() {
    return noteService.create(expectedNotes[1]);
}

function doNothing() {
    return Promise.resolve(true);
}

function goToState(desiredState) {
    console.log('Setup state:', desiredState);
    switch(desiredState) {
        case 'empty': return noteService.deleteAll();
        case 'first note': return addFirstNote();
        case 'second note': return addSecondNote();
        case 'two notes': return addFirstNote().then(addSecondNote);
        default: return doNothing();
    }
}

exports.stateService = () => {
    return {
        moveToRequestedState: (req, res) => {
            return goToState(req.body.state).then(() => {
                return res.status(200).send('');
            })
        },
        getExpectedNote: (subscript) => {
            return expectedNotes[subscript];
        }
    };
};
