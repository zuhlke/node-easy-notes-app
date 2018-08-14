const services = require('../services/note.service.js');
const noteService = services.noteService();

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content cannot be empty."
        });
    }

    noteService.create(req.body)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while create note."
        });
    });
};

exports.findAll = (req, res) => {
    noteService.findAll()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    noteService.findOne(req.params.noteId)
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

    noteService.update(req.params.noteId, req.body)
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
    noteService.deleteAll()
        .then(res.send({message: "All notes deleted successfully."}))
        .catch(err => {
            return res.status(500).send({message: "Could not delete any notes: " + err.message});
        });
};

exports.deleteOne = (req, res) => {
    noteService.deleteOne(req.params.noteId)
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