import { Service } from "typedi";

import { AppDataSource } from "../datasource";
import { Game, GameStatus } from "../entity/Game";
import { User } from "../entity/User";

@Service()
class GameService {
  async getGames() {
    const gamesRepo = AppDataSource.getRepository(Game);
    const games = await gamesRepo.find();
    return games;
  }
}

export { GameService };
