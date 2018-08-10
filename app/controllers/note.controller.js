const Note = require('../models/note.model.js');
const service = require('../services/note.service.js');

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty."
        });
    }

    service.create(req.body)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while create note."
        });
    });
};

exports.findAll = (req, res) => {
    service.findAll()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    service.findOne(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    })
};

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty."
        });
    }

    service.update(req.params.noteId, req.body)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

exports.deleteAll = (req, res) => {
    service.deleteAll()
        .then(res.send({message: "All notes deleted successfully."}))
        .catch(err => {
            return res.status(500).send({message: "Could not delete any notes: " + err.message});
        });
};

exports.deleteOne = (req, res) => {
    service.deleteOne(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }

        res.send(
            {
                message: "Note deleted successfully.",
                note: note
            });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};