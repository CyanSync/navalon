import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  Subscription,
} from "type-graphql";
import { Service } from "typedi";

import { Game } from "../entity/Game";
import { GameChangePayload } from "../entity/GameChangePayload";
import { GameSettings } from "../entity/GameSettings";
import { User } from "../entity/User";
import { ResolverContext } from "../index";
import { GameService } from "../services/GameService";
import { GameSettingsService } from "../services/GameSettingsService";

@Service()
@Resolver(Game)
class GameResolver implements ResolverInterface<Game> {
  constructor(private gameService: GameService, private gameSettingsService: GameSettingsService) {}

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

  @FieldResolver(() => [User], { defaultValue: [] })
  async gameSettings(@Root() root: Game): Promise<GameSettings> {
    return await this.gameSettingsService.getGameSettings(root.id);
  }

  @Mutation(() => GameSettings)
  async updateGameSettings(
    @Arg("gameSettingsInput") newSettings: GameSettings,
    @Ctx() ctx: ResolverContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    if (!ctx.user) {
      throw Error("You must be logged in to edit a game.");
    }

    // TODO: Check user is owner of game before allowing them to update the settings

    const output = await this.gameSettingsService.setGameSettings(newSettings);
    await pubSub.publish("GAME_CHANGE", new GameChangePayload(true));

    return output;
  }

  @Subscription(() => GameChangePayload, { topics: "GAME_CHANGE" })
  gameChange(
    @Root() gameChangePayload: GameChangePayload,
    @Arg("gameId") gameId: number
  ): GameChangePayload {
    console.log("here");
    return gameChangePayload;
  }
}

export { GameResolver };
