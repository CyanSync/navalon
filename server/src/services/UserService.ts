import { AppDataSource } from "../datasource";
import { Game, GameStatus } from "../entity/Game";
import { User } from "../entity/User";

class UserService {
  async getUsers() {
    const usersRepo = AppDataSource.getRepository(User);
    const users = await usersRepo.find();
    return users;
  }
}

export { UserService };
