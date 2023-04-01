import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { GameUser } from "./GameUser.js";
import { User } from "./User.js";

@ObjectType()
// @Entity()
class Game {
  constructor(id: string, name: string, status: GameStatus) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  @Field((type) => ID)
  id: string = "0";

  @Field()
  name: string = "";

  @Field()
  status: GameStatus = GameStatus.LOBBY;

  gameUsers: GameUser[];
}

enum GameStatus {
  LOBBY,
  ACTIVE,
  FINISHED,
}

export { GameStatus, Game };
