const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const NotesController = require('../controllers/notes.controller');

const notesRoutes = Router();

const notesController = new NotesController();
notesRoutes.use(ensureAuthenticated);
notesRoutes.get('/', notesController.index);
notesRoutes.post('/', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes;
