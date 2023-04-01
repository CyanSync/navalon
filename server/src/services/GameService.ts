import { Service } from "typedi";

import { DbProvider } from "./DbProvider.js";
import { AppDataSource } from "../datasource.js";
import { Game, GameStatus } from "../entity/Game.js";
import { User } from "../entity/User.js";

@Service()
class GameService {
  constructor(public dbProvider: DbProvider) {}

  async getGames() {
    const games = this.dbProvider.db.selectFrom("games").select(["id", "name"]).execute();
    return games;
  }

  async createGame({ name }: { name: string }): Promise<Game> {
    const status = GameStatus.ACTIVE;
    const game = await this.dbProvider.db
      .insertInto("games")
      .values({ name, status })
      .returning(["id", "name", "status"])
      .executeTakeFirstOrThrow();

    return new Game(game.id.toString(), game.name, status);
  }
}

export { GameService };
