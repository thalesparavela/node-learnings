const {Router} = require("express");

const SessionsController = require('../controllers/session.controller');
const { route } = require('./notes.routes');
const sessionsController = new SessionsController();

const sessionsRoutes = Router();

sessionsRoutes.post('/',sessionsController.create);

module.exports = sessionsRoutes;
