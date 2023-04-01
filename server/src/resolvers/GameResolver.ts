import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Game } from "../entity/Game.js";
import { GameService } from "../services/GameService.js";

@Service()
@Resolver(Game)
class GameResolver {
  constructor(private gameService: GameService) {}

  @Query((returns) => [Game])
  games() {
    return this.gameService.getGames();
  }
}

export { GameResolver };
