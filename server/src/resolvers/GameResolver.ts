import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Game } from "../entity/Game.js";
import { GameService } from "../services/GameService.js";

@Service()
@Resolver(Game)
class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => [Game])
  games() {
    return this.gameService.getGames();
  }

  @Mutation(() => Game)
  createGame(@Arg("name") name: string) {
    return this.gameService.createGame({ name });
  }
}

export { GameResolver };
