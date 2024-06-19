const { hash, compare } = require('bcryptjs');
const appError = require('../utils/app.error');
const sqliteConnection = require('../database/sqlite');

class UsersController {
  /*
   * No máximo 5 métodos - Boa prática
   * index - GET para listar vários registros
   * show - GET para exibir um registro específico
   * create - POST para criar um novo registro
   * update - PUT para atualizar um registro
   * delete - DELETE para excluir um registro
   */

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    );
    if (checkUserExists) {
      throw new appError('Este e-mail já está em uso.');
    }
    const hashedPassword = await hash(password, 8);
    if (!name) {
      throw new appError('Nome é obrigatório');
    }
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)',
      [name, email, hashedPassword],
    );
    return response.status(201).json();
    response.status(201).json({ name, email, password });
  }
  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id,
    ]);

    if (!user) {
      throw new appError('Usuário não encontrado');
    }
    const userWithUpdateEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new appError('Este email já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new appError('Você precisa informar a senha antiga');
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new appError('Senha incorreta');
      }
      user.password = await hash(password, 8);
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id],
    );
    return response.status(200).json();
  }
}
module.exports = UsersController;
