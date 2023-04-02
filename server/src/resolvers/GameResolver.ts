import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { Service } from "typedi";

import { Game } from "../entity/Game";
import { User } from "../entity/User";
import { ResolverContext } from "../index";
import { GameService } from "../services/GameService";

@Service()
@Resolver(Game)
class GameResolver implements ResolverInterface<Game> {
  constructor(private gameService: GameService) {}

  @Query(() => [Game])
  games(@Ctx() ctx: ResolverContext) {
    console.log("getting games");
    return this.gameService.getGames();
  }

  @Mutation(() => Game)
  createGame(@Arg("name") name: string, @Ctx() ctx: ResolverContext) {
    if (!ctx.user) {
      throw Error("You must be logged in to create a game");
    }

    return this.gameService.createGame({ name, user: ctx.user });
  }

  @Mutation(() => Boolean)
  async joinGame(@Arg("gameId") gameId: number, @Ctx() ctx: ResolverContext) {
    if (!ctx.user) {
      throw Error("You must be logged in to create a game");
    }
    console.log("adding user", ctx.user, "to game", gameId);

    await this.gameService.addUserToGame({ userId: ctx.user.id, gameId });
    return true;
  }

  @Query(() => Game, { nullable: true })
  game(@Arg("id") id: number, @Ctx() ctx: ResolverContext) {
    return this.gameService.getGame(id);
  }

  @FieldResolver(() => [User], { defaultValue: [] })
  async usersInGame(@Root() root: Game): Promise<User[]> {
    return await this.gameService.getUsersInGame(root.id);
  }
}

export { GameResolver };
