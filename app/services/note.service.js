const Note = require('../models/note.model.js');


exports.create = note => {
    const newNote = new Note({
        title: note.title || "Untitled Note",
        content: note.content
    });

    return newNote.save();
};

exports.findAll = () => {
    return Note.find();
};

exports.findOne = noteId => {
    return Note.findById(noteId);
};

exports.update = (noteId, note) => {
    return Note.findByIdAndUpdate(noteId, {
        title: note.title || "Untitled Note",
        content: note.content
    }, {new: true});
};

exports.deleteAll = () => {
    return Note.remove({});
};

exports.deleteOne = noteId => {
    return Note.findByIdAndRemove(noteId);
};
