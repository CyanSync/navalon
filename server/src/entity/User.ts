import { IsEmail, MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Game } from "./Game.js";
import { GameUser } from "./GameUser.js";

@ObjectType()
@Entity()
class User {
  @Field((type) => ID)
  // @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  // @IsEmail()
  // @Column()
  email: string;

  @Field((type) => String)
  // @MaxLength(100)
  // @Column()
  name: string;

  // @OneToMany(() => GameUser, (gameUser) => gameUser.user)
  userGames: GameUser[];

  // @ManyToMany(() => Game, (game) => game.usersInGame)
  // @Column()
  // gamesUserIsIn: Game[];

  constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export { User };
