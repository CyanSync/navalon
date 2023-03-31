import { IsEmail, MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Game } from "./Game";
import { GameUser } from "./GameUser";

@ObjectType()
@Entity()
class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string = "";

  @Field((type) => String)
  @IsEmail()
  @Column()
  email: string;

  @Field((type) => String)
  @MaxLength(100)
  @Column()
  name: string;

  @OneToMany(() => GameUser, (gameUser) => gameUser.user)
  userGames: GameUser[];

  // @ManyToMany(() => Game, (game) => game.usersInGame)
  // @Column()
  // gamesUserIsIn: Game[];

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}

export { User };
