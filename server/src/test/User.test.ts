import { graphql } from "graphql";
import { before } from "node:test";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { Db } from "typeorm";

import { gqlCall } from "./testUtils";
import { GameResolver } from "../resolvers/GameResolver";
import { DbProvider } from "../services/DbProvider";
import { UserService } from "../services/UserService";
let dbProvider: DbProvider;

beforeAll(async () => {
  dbProvider = Container.get(DbProvider);

  dbProvider.resetDb();
  dbProvider.runMigrations();

  await new Promise((r) => setTimeout(r, 5000));
}, 6000);

test("user can create a game and will be in that game", async () => {
  const userService = Container.get(UserService);
  const user1 = await userService.getUserByEmailOrCreate("shahan@shahan.ca", "Shahan Neda");
  const user2 = await userService.getUserByEmailOrCreate("shahan2@shahan.ca", "Shahan Neda2");
  // const users = await dbProvider.db.selectFrom("users").select(["id", "name", "email"]).execute();

  const { data, errors } = await gqlCall({
    source: `#graphql
		mutation CreateGame($name: String!) {
			createGame(name: $name) {
				id
			}
		}`,
    variableValues: { name: "Test Game" },
    context: { user: user1 },
  });

  const games = await dbProvider.db
    .selectFrom("games")
    .select(["id", "name"])
    .where("games.name", "=", "Test Game")
    .execute();

  expect(games.length).toBe(1);
  games[0].name = "Test Game";

  const gameUser = await dbProvider.db
    .selectFrom("game_users")
    .select(["game_users.id", "game", "user"])
    .where("game", "=", games[0].id)
    .rightJoin("users", "users.id", "game_users.user")
    .select(["users.email"])
    .execute();

  expect(gameUser.length).toBe(1);
  expect(gameUser[0].email).toBe("test@example.com");
});
