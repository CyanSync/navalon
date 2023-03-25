import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { IncomingMessage, ServerResponse } from "http";

import { Game, GameStatus } from "./entity/Game";
import { User } from "./entity/User";
import "reflect-metadata";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-2_WHIGoYP3n",
  tokenUse: "id",
  clientId: ["ir15j2df7lc1apu83nvcbtbnk", "27qlrc2c6prp1c2tfl0pdbqgfu"],
});

const typeDefs = `#graphql
  enum GameStatus{
    LOBBY,
    ACTIVE,
    FINISHED,
  }

  type Game{
    id: String,
    name: String
    status: GameStatus,
    usersInGame: [User]
  }

  type User{
    id: String,
    name: String,
    email: String,
  }

  type Query {
    games: [Game]
 }
`;

const users: User[] = [
  {
    id: "shshjfh",
    name: "Shahan",
    email: "shahan.neda@gmail.com",
  },
];

const games: Game[] = [
  {
    id: "game1",
    name: " Shahans Game",
    status: GameStatus.ACTIVE,
    usersInGame: [users[0], users[0], users[0]],
  },
  {
    id: "game2",
    name: "Bobs Game",
    status: GameStatus.FINISHED,
    usersInGame: [],
  },
  {
    id: "game3",
    name: "Lemons Game",
    status: GameStatus.FINISHED,
    usersInGame: [],
  },
];

const resolvers = {
  GameStatus: {
    LOBBY: GameStatus.LOBBY,
    ACTIVE: GameStatus.ACTIVE,
    FINISHED: GameStatus.FINISHED,
  },
  Query: {
    games: (parent: any, args: any, contextValue: Context) => {
      console.log(contextValue.user);
      if (!contextValue.user) {
        throw new Error("User is not authenticated");
      }
      return games;
    },
    // user: (parent: any, args: any, contextValue: Context) => {
    // }
  },
};

interface Context {
  user: User | undefined;
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }: { req: IncomingMessage; res: ServerResponse }) => {
      console.log("doing context");
      const token = req.headers.authorization || "";
      try {
        console.log(token);
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
}

startServer();
