import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

import { User } from "./User";

@ObjectType()
class Game {
  @Field((type) => ID)
  id: string = "0";

  @Field()
  @MaxLength(30)
  name: string = "";

  @Field()
  status: GameStatus = GameStatus.LOBBY;

  @Field((type) => [User])
  usersInGame: User[] = [];
}

enum GameStatus {
  LOBBY,
  ACTIVE,
  FINISHED,
}

export { GameStatus, Game };
