import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { IncomingMessage, ServerResponse } from "http";
import { Container } from "typedi";

import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { Game, GameStatus } from "./entity/Game";
import { User } from "./entity/User";
import { GameResolver } from "./resolvers/GameResolver";

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
