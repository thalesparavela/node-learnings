const { Router } = require("express");

const UsersController = require("../controllers/users.controller");

const usersRoutes = Router();

function myMiddleware(request, response, next) {

  console.log(request.body);
  if(!request.body.admin){
    return response.json({message: "user unauthorized"})
  }
  next();
}
const usersController = new UsersController();
/*Método Get*/
/*usersRoutes.get("/:id/:user", (request, response) => {
  const { id, user } = request.params;
  route params são obrigatórios
  response.send(
    `ID da mensagem é : ${id}.
    Usuário é: ${user}.`
  );
});*/
usersRoutes.get("/", (request, response) => {
  const { page, limit } = request.query;
  /*query params não são obrigatórios*/
  response.send(
    `Página é: ${page}.
    Mostrar é: ${limit}.`
  );
});
/*Método Post*/

usersRoutes.post("/",myMiddleware, usersController.create);
module.exports = usersRoutes;
