import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Game } from "./Game.js";
import { User } from "./User.js";

@Entity()
export class GameUser {
  // @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Game, (game) => game.gameUsers)
  game: Game;

  // @ManyToOne(() => User, (user) => user.userGames)
  user: User;
}
