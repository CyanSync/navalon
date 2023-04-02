import { Service } from "typedi";

import { DbProvider } from "./DbProvider";
import { AppDataSource } from "../datasource";
import { Game, GameStatus } from "../entity/Game";
import { User } from "../entity/User";

@Service()
class GameService {
  constructor(public dbProvider: DbProvider) {}

  async getGames() {
    const games = await this.dbProvider.db
      .selectFrom("games")
      .select(["games.id", "games.name", "games.created_at", "games.status", "owner"])
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
      let gameStatus = game.status as GameStatus;
      if (Object.values(GameStatus).indexOf(gameStatus) === -1) {
        gameStatus = GameStatus.LOBBY;
      }

      const fullGame = new Game(game.id, game.name, gameStatus, [], game.created_at, game.owner);
      finalGames[game.id] = fullGame;
    });
    console.log(finalGames);

    usersInGames.forEach((userInGame) => {
      const game = finalGames[userInGame.game];
      const user = new User(userInGame.user, userInGame.email, userInGame.name);
      finalGames[game.id].usersInGame.push(user);
    });

    return Object.values(finalGames).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getGame(id: number) {
    console.log("getting game", id);
    const game = await this.dbProvider.db
      .selectFrom("games")
      .select(["games.id", "games.name", "games.created_at", "games.status", "owner"])
      .orderBy("created_at", "desc")
      .where("games.id", "=", id)
      .executeTakeFirst();
    console.log("gmae is", game);
    return game;
  }

  async getUsersInGame(id: number) {
    console.log("getting users in game", id);
    const usersInGames = await this.dbProvider.db
      .selectFrom("game_users")
      .select(["game_users.user"])
      .where("game_users.game", "=", id)
      .innerJoin("users", "users.id", "game_users.user")
      .selectAll()
      .execute();
    return usersInGames;
  }

  async createGame({ name, user }: { name: string; user: User }): Promise<Game> {
    const status = GameStatus.LOBBY;
    const game = await this.dbProvider.db
      .insertInto("games")
      .values({ name, status, owner: user.id })
      .returning(["id", "name", "status", "created_at"])
      .executeTakeFirstOrThrow();

    await this.dbProvider.db
      .insertInto("game_users")
      .values({ game: game.id, user: user.id })
      .returning(["id"])
      .execute();

    return new Game(game.id, game.name, status, [], game.created_at, user.id);
  }

  async addUserToGame({ userId, gameId }: { userId: number; gameId: number }) {
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
