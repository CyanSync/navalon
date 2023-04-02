import { Service } from "typedi";

import { DbProvider } from "./DbProvider.js";
import { AppDataSource } from "../datasource.js";
import { Game, GameStatus } from "../entity/Game.js";
import { User } from "../entity/User.js";

@Service()
class GameService {
  constructor(public dbProvider: DbProvider) {}

  async getGames() {
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
      const fullGame = new Game(game.id, game.name, game.status, [], game.created_at);
      finalGames[game.id] = fullGame;
    });

    usersInGames.forEach((userInGame) => {
      const game = finalGames[userInGame.game];
      const user = new User(userInGame.user, userInGame.email, userInGame.name);
      console.log(user);
      finalGames[game.id].usersInGame.push(user);
    });

    return Object.values(finalGames).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createGame({ name, user }: { name: string; user: User }): Promise<Game> {
    const status = GameStatus.ACTIVE;
    const game = await this.dbProvider.db
      .insertInto("games")
      .values({ name, status })
      .returning(["id", "name", "status", "created_at"])
      .executeTakeFirstOrThrow();

    await this.dbProvider.db
      .insertInto("game_users")
      .values({ game: game.id, user: user.id })
      .returning(["id"])
      .execute();

    return new Game(game.id, game.name, status, [], game.created_at);
  }

  async addUserToGame({ userId, gameId }: { userId: number; gameId: number }) {
    console.log("in add user to game");
    const alreadyInGame = await this.dbProvider.db
      .selectFrom("game_users")
      .where("game_users.game", "=", gameId)
      .where("game_users.user", "=", userId)
      .select("id")
      .execute();

    if (alreadyInGame.length !== 0) {
      // User is already in game
      return;
    }
    await this.dbProvider.db
      .insertInto("game_users")
      .values({ game: gameId, user: userId })
      .returning(["id"])
      .execute();
  }
}

export { GameService };
