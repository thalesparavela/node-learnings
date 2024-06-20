const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const UsersController = require('../controllers/users.controller');
const UserAvatarController = require('../controllers/user.avatar.controller');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

/*Middleware teste */
function myMiddleware(request, response, next) {
  console.log(request.body);
  if (!request.body.admin) {
    return response.json({ message: 'user unauthorized' });
  }
  next();
}

/*Método Get*/
/*usersRoutes.get("/:id/:user", (request, response) => {
  const { id, user } = request.params;
  route params são obrigatórios
  response.send(
    `ID da mensagem é : ${id}.
    Usuário é: ${user}.`
  );
});*/
usersRoutes.get('/', (request, response) => {
  const { page, limit } = request.query;
  /*query params não são obrigatórios*/
  response.send(
    `Página é: ${page}.
    Mostrar é: ${limit}.`,
  );
});
/*Método Post*/

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

module.exports = usersRoutes;
