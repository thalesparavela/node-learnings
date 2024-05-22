const appError = require("../utils/app.error");

class UsersController {
  /*
   * No máximo 5 métodos - Boa prática
   * index - GET para listar vários registros
   * show - GET para exibir um registro específico
   * create - POST para criar um novo registro
   * update - PUT para atualizar um registro
   * delete - DELETE para excluir um registro
   */

   create(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      throw new appError("Nome é obrigatório");
    }
    response.status(201).json({ name, email, password });
  }
}
module.exports = UsersController;
