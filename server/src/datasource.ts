import { DataSource } from "typeorm";
import "reflect-metadata";

import { Game } from "./entity/Game";
import { GameUser } from "./entity/GameUser";
import { User } from "./entity/User";

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
