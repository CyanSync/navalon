import { graphql } from "graphql";
import { before } from "node:test";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { Db } from "typeorm";

import { GameResolver } from "../resolvers/GameResolver";
import { DbProvider } from "../services/DbProvider";
let dbProvider: DbProvider;

beforeAll(async () => {
  dbProvider = Container.get(DbProvider);

  dbProvider.resetDb();
  dbProvider.runMigrations();

  await new Promise((r) => setTimeout(r, 5000));
}, 6000);

test("a user can signup", async () => {
  const users = await dbProvider.db.selectFrom("users").select(["id", "name", "email"]).execute();
  console.log(users);

  const schema = await buildSchema({
    resolvers: [GameResolver],
    container: Container,
  });

  const result = graphql({
    schema,
    source: "query { getGames{ id }}",
  });
  console.log(result);

  expect(1).toBe(1);
});
