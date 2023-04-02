import { MaxLength } from "class-validator";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { GameUser } from "./GameUser";
import { User } from "./User";

@ObjectType()
// @Entity()
class Game {
  constructor(
    id: number,
    name: string,
    status: GameStatus,
    usersInGame: User[],
    createdAt: Date,
    owner: number
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.usersInGame = usersInGame;
    this.createdAt = createdAt;
    this.owner = owner;
  }

  @Field((type) => Number)
  id: number;

  @Field()
  name: string = "";

  @Field((type) => GameStatus)
  status: GameStatus = GameStatus.LOBBY;

  @Field(() => [User])
  usersInGame: User[];

  @Field()
  owner: number;

  createdAt: Date;
}

enum GameStatus {
  LOBBY = "LOBBY",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
registerEnumType(GameStatus, {
  name: "GameStatus",
  description: "The different statuses that a game can be in.",
});

export { GameStatus, Game };
