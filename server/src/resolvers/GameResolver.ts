import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Game } from "../entity/Game.js";
import { ResolverContext } from "../index.js";
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
  createGame(@Arg("name") name: string, @Ctx() ctx: ResolverContext) {
    console.log("ctx", ctx);
    console.log(ctx.user);
    if (!ctx.user) {
      throw Error("You must be logged in to create a game");
    }

    return this.gameService.createGame({ name, user: ctx.user });
  }

  @Mutation(() => Boolean)
  joinGame(@Arg("gameId") gameId: number, @Ctx() ctx: ResolverContext) {
    if (!ctx.user) {
      throw Error("You must be logged in to create a game");
    }

    this.gameService.addUserToGame({ userId: ctx.user.id, gameId });
    return true;
  }
}

export { GameResolver };
