const services = require('../app/services/note.service.js');
const realNoteService = services.noteService();

const real2fake = {};
const fake2real = {
    '1b71b7eeecbd28bac0b3f1ea': null,
    '28bac0b3f1ea1b71b7eeecdb': null
};

function findAndAllocateUnusedFake(real) {
    for (var fake in fake2real) {
        if (fake2real.hasOwnProperty(fake)) {
//            console.log('examining fake', fake, 'which has value', fake2real[fake])
            if (fake2real[fake] === null) {
                fake2real[fake] = real;
                return fake;
            }
        }
    }
    console.log('no unallocated fakes found');
    return null;
}

exports.noteService = () => {
    return {
        create: (note) => {
            return realNoteService.create(note)
            .then(newNote => {
                const real = newNote._id;
                const fake = findAndAllocateUnusedFake(real);
                real2fake[real] = fake;
//                console.log('created note and converted id', real, 'to', fake);
                newNote._id = fake;
                return newNote;
            });
        },

        findAll: () => {
            return realNoteService.findAll()
            .then(notes => {
//                console.log('findAll() returned', notes);
                for (var note of notes) {
//                    console.log('found (all) note and converted id', note._id, 'to', real2fake[note._id]);
                    note._id = real2fake[note._id];
                }
                return notes;
            });
        },

        findOne: (fake) => {
            return realNoteService.findOne(fake2real[fake])
            .then(note => {
//                console.log('found (one) note and converted id', note._id, 'to', fake);
                note._id = fake;
                return note;
            });
        },

        update: (fake, note) => {
            return realNoteService.update(fake2real[fake])
            .then(note => {
//                console.log('updated note and converted id', note._id, 'to', fake);
                note._id = fake;
                return note;
            });
        },

        deleteAll: () => {
            return realNoteService.deleteAll()
            .then(result => {
                for (var fake in fake2real) {
                    if (fake2real.hasOwnProperty(fake)) {
                        const real = fake2real[fake];
//                        console.log('deleted (all) fake id', fake, 'and real counterpart', real);
                        if(real !== null) {
                            delete real2fake[real];
                        }
                        fake2real[fake] = null;
                    }
                }

                return result;
            });
        },

        deleteOne: (fake) => {
            const real = fake2real[fake];
            return realNoteService.deleteOne(real)
            .then(note => {
//                console.log('deleted (one) fake id', fake, 'and real counterpart', real);
                delete real2fake[real];
                fake2real[fake] = null;
                note._id = fake;
                return note;
            });
        }
    };
};
