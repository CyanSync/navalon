import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { GameUser } from "./GameUser.js";
import { User } from "./User.js";

@ObjectType()
// @Entity()
class Game {
  constructor(id: number, name: string, status: GameStatus, usersInGame: User[]) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.usersInGame = usersInGame;
  }

  @Field((type) => ID)
  id: number;

  @Field()
  name: string = "";

  @Field()
  status: GameStatus = GameStatus.LOBBY;

  @Field(() => [User])
  usersInGame: User[];
}

enum GameStatus {
  LOBBY,
  ACTIVE,
  FINISHED,
}

export { GameStatus, Game };
