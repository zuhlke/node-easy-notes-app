const Note = require('../models/note.model.js');

exports.noteService = () => {
    return {
        create: note => {
            const newNote = new Note({
                title: note.title || "Untitled Note",
                content: note.content
            });

            return newNote.save();
        },

        findAll: () => {
            return Note.find();
        },

        findOne: noteId => {
            return Note.findById(noteId);
        },

        update: (noteId, note) => {
            return Note.findByIdAndUpdate(noteId, {
                title: note.title || "Untitled Note",
                content: note.content
            }, {new: true});
        },

        deleteAll: () => {
            return Note.remove({});
        },

        deleteOne: noteId => {
            return Note.findByIdAndRemove(noteId);
        }
    };
};
