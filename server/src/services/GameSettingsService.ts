import { Service } from "typedi";

import { DbProvider } from "./DbProvider";
import { AppDataSource } from "../datasource";
import { Game, GameStatus } from "../entity/Game";
import { GameSettings } from "../entity/GameSettings";
import { User } from "../entity/User";

@Service()
class GameSettingsService {
  constructor(public dbProvider: DbProvider) {}

  async getGameSettings(gameId: number): Promise<GameSettings> {
    const game = await this.dbProvider.db
      .selectFrom("game_settings")
      .selectAll()
      .where("game_id", "=", gameId)
      .executeTakeFirst();

    if (!game) {
      return new GameSettings(gameId);
    }

    return new GameSettings(gameId, game.percival, game.oberon, game.mordred, game.lady_of_lake);
  }

  async setGameSettings(gameSettings: GameSettings): Promise<GameSettings> {
    console.log("SETTING TO ", gameSettings);
    const game = await this.dbProvider.db
      .insertInto("game_settings")
      .values({
        game_id: gameSettings.gameId,
        percival: gameSettings.percival,
        oberon: gameSettings.oberon,
        mordred: gameSettings.mordred,
        lady_of_lake: gameSettings.ladyOfLake,
      })
      .onConflict((oc) =>
        oc.column("game_id").doUpdateSet({
          percival: gameSettings.percival,
          oberon: gameSettings.oberon,
          mordred: gameSettings.mordred,
          lady_of_lake: gameSettings.ladyOfLake,
        })
      )
      .returningAll()
      .executeTakeFirstOrThrow();

    return new GameSettings(
      game.game_id,
      game.percival,
      game.oberon,
      game.mordred,
      game.lady_of_lake
    );
  }
}

export { GameSettingsService };
