const knex = require('../database/knex');
const appError = require('../utils/app.error');
const DiskStorage = require('../providers/DiskStorage');
class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;
    const user = await knex('users').where({ id: user_id }).first(); //user_id:user_id nao precisa pq o nome e o mesmo
    const diskStorage = new DiskStorage();

    if (!user) {
      throw new appError('Usuário não autorizado', 401);
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }
    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;
    await knex('users').update(user).where({ id: user_id });
    return response.json(user);
  }
}
module.exports = UserAvatarController;
