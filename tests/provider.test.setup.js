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

const notes = [];

function doNothing() {
    return Promise.resolve(true);
}

function addFirstNote() {
    return noteService.deleteAll().then(() => {
//        console.log('database cleared');
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
        const noteId = notes[0]._id;
        delete notes[0];
        return noteService.deleteOne(noteId);
    } else {
        return doNothing();
    }
}

function goToState(desiredState) {
    console.log('Setup state:', desiredState);
    switch(desiredState) {
        case 'no notes': return noteService.deleteAll();
        case 'first note': return addFirstNote();
        case 'second note': return addFirstNote().then(addSecondNote).then(deleteFirstNote);
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
                return res.status(500).send(err);
            });
        },
        getExpectedNote: (subscript) => {
            return expectedNotes[subscript];
        }
    };
};
