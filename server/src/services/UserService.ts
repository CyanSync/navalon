import { Service } from "typedi";

import { DbProvider } from "./DbProvider";
import { AppDataSource } from "../datasource";
import { Game, GameStatus } from "../entity/Game";
import { User } from "../entity/User";

@Service()
class UserService {
  constructor(public dbProvider: DbProvider) {}
  async getUsers() {
    // const usersRepo = AppDataSource.getRepository(User);
    // const users = await usersRepo.find();
    // return users;
  }

  async getUserByEmailOrCreate(email: string, name: string) {
    const user = await this.dbProvider.db
      .selectFrom("users")
      .select(["id", "name", "email"])
      .executeTakeFirst();

    if (user) {
      return new User(user.id, user.email, user.name);
    } else {
      const user = await this.dbProvider.db
        .insertInto("users")
        .values({ name, email })
        .returning(["id", "name", "email"])
        .executeTakeFirstOrThrow();
      return new User(user.id, user.email, user.name);
    }
  }
}

export { UserService };
