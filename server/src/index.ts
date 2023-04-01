import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { promises as fs } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import * as path from "path";
import pg from "pg";

import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { fileURLToPath } from "url";

import { AppDataSource } from "./datasource.js";
import { UserTable } from "./db/UserTable.js";
import { Game, GameStatus } from "./entity/Game.js";
import { User } from "./entity/User.js";
import { GameResolver } from "./resolvers/GameResolver.js";
import { DbProvider } from "./services/DbProvider.js";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-2_WHIGoYP3n",
  tokenUse: "id",
  clientId: ["ir15j2df7lc1apu83nvcbtbnk", "27qlrc2c6prp1c2tfl0pdbqgfu"],
});

interface Context {
  user: User | undefined;
}

async function startServer() {
  const schema = await buildSchema({
    resolvers: [GameResolver],
    container: Container,
  });
  const server = new ApolloServer<Context>({ schema });

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
      try {
        const payload = await verifier.verify(token);
        console.log("Token is valid. Payload:", payload);
        return { user: new User(payload.email as string, payload.name as string) };
      } catch (e) {
        return { user: new User("shahan.neda@gmail.com", "Shahan Nedadahandeh") };
        //   throw new GraphQLError("User is not authenticated", {
        //     extensions: {
        //       code: "UNAUTHENTICATED",
        //     },
        //   });
      }
    },
  });
  console.log(`server started at ${url}`);
}

startServer();
