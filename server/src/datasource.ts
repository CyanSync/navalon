import { DataSource } from "typeorm";
import "reflect-metadata";

import { Game } from "./entity/Game.js";
import { GameUser } from "./entity/GameUser.js";
import { User } from "./entity/User.js";

const entities = [Game, User, GameUser];

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "dev",
  password: "dev",
  database: "navalon",
  entities,
  synchronize: true,
  logging: true,
});

export { AppDataSource };
