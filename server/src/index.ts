import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { promises as fs } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { DropViewBuilder, FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import * as path from "path";
import pg from "pg";

import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { fileURLToPath } from "url";

import { createGraphQLSchema } from "./createGraphQLSchema";
import { AppDataSource } from "./datasource";
import { UserTable } from "./db/UserTable";
import { Game, GameStatus } from "./entity/Game";
import { User } from "./entity/User";
import { GameResolver } from "./resolvers/GameResolver";
import { DbProvider } from "./services/DbProvider";
import { UserService } from "./services/UserService";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-2_WHIGoYP3n",
  tokenUse: "id",
  clientId: ["ir15j2df7lc1apu83nvcbtbnk", "27qlrc2c6prp1c2tfl0pdbqgfu"],
});

export interface ResolverContext {
  user: User | undefined;
}

async function startServer() {
  const schema = await createGraphQLSchema();
  const server = new ApolloServer<ResolverContext>({ schema });

  // const { id } = await db
  //   .insertInto("user")
  //   .values({ name: "Shahan", email: "test" })
  //   .returning("id")
  //   .executeTakeFirstOrThrow();
  // await AppDataSource.initialize();
  await Container.get(DbProvider).runMigrations();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }: { req: IncomingMessage; res: ServerResponse }) => {
      const token = req.headers.authorization || "";
      let userInfo: { name: string; email: string };

      try {
        const payload = await verifier.verify(token);
        console.log(payload);
        const name = payload.given_name + " " + payload.family_name;
        const email = payload.email as string;
        userInfo = { name, email };
      } catch (e) {
        userInfo = { name: "Test User", email: "test@example.com" };
        // console.log("Set user to test user!");
        // return { user: new User("shahan.neda@gmail.com", "Shahan Nedadahandeh") };
        //   throw new GraphQLError("User is not authenticated", {
        //     extensions: {
        //       code: "UNAUTHENTICATED",
        //     },
        //   });
      }

      const userService = Container.get(UserService);
      const user = await userService.getUserByEmailOrCreate(userInfo.email, userInfo.name);

      return { user };
    },
  });
  console.log(`server started at ${url}`);
}

startServer();
