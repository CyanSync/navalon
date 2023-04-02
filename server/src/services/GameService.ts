import { Service } from "typedi";

import { DbProvider } from "./DbProvider.js";
import { AppDataSource } from "../datasource.js";
import { Game, GameStatus } from "../entity/Game.js";
import { User } from "../entity/User.js";

@Service()
class GameService {
  constructor(public dbProvider: DbProvider) {}

  async getGames() {
    console.log(" got game");
    const games = await this.dbProvider.db
      .selectFrom("games")
      .select(["games.id", "games.name", "games.created_at", "games.status"])
      .orderBy("created_at", "desc")
      .execute();

    console.log("before ");
    const usersInGames = await this.dbProvider.db
      .selectFrom("game_users")
      .select(["game_users.game", "game_users.user"])
      .where(
        "game_users.game",
        "in",
        games.map((g) => g.id)
      )
      .innerJoin("users", "users.id", "game_users.user")
      .select(["users.name", "users.email"])
      .execute();

    const finalGames: Record<number, Game> = {};
    games.forEach((game) => {
      const fullGame = new Game(game.id, game.name, game.status, []);
      finalGames[game.id] = fullGame;
    });

    usersInGames.forEach((userInGame) => {
      const game = finalGames[userInGame.game];
      const user = new User(userInGame.user, userInGame.name, userInGame.email);
      finalGames[game.id].usersInGame.push(user);
    });

    return Object.values(finalGames);
  }

  async createGame({ name, user }: { name: string; user: User }): Promise<Game> {
    const status = GameStatus.ACTIVE;
    const game = await this.dbProvider.db
      .insertInto("games")
      .values({ name, status })
      .returning(["id", "name", "status"])
      .executeTakeFirstOrThrow();

    const gameUser = await this.dbProvider.db
      .insertInto("game_users")
      .values({ game: game.id, user: user.id })
      .returning(["id"])
      .execute();

    return new Game(game.id.toString(), game.name, status);
  }
}

export { GameService };
