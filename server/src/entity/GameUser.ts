import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Game } from "./Game";
import { User } from "./User";

@Entity()
export class GameUser {
  // @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Game, (game) => game.gameUsers)
  game: Game;

  // @ManyToOne(() => User, (user) => user.userGames)
  user: User;
}
