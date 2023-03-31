import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { GameUser } from "./GameUser";
import { User } from "./User";

@ObjectType()
@Entity()
class Game {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string = "0";

  @Field()
  @MaxLength(30)
  @Column()
  name: string = "";

  @Field()
  @Column()
  status: GameStatus = GameStatus.LOBBY;

  @OneToMany(() => GameUser, (gameUser) => gameUser.game)
  @JoinTable()
  gameUsers: GameUser[];
}

enum GameStatus {
  LOBBY,
  ACTIVE,
  FINISHED,
}

export { GameStatus, Game };
