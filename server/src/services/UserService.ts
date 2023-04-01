import { AppDataSource } from "../datasource.js";
import { Game, GameStatus } from "../entity/Game.js";
import { User } from "../entity/User.js";

class UserService {
  async getUsers() {
    const usersRepo = AppDataSource.getRepository(User);
    const users = await usersRepo.find();
    return users;
  }
}

export { UserService };
