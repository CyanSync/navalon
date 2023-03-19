import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { Game, GameStatus } from "./entity/Game";

const typeDefs = `#graphql
  enum GameStatus{
    LOBBY,
    ACTIVE,
    FINISHED,
  }

  type Game{
    id: String,
    status: GameStatus
  }

  type Query {
    games: [Game]
  }
`;

const games: [Game] = [
  {
    id: "he",
    status: GameStatus.ACTIVE,
  },
];

const resolvers = {
  GameStatus: {
    LOBBY: GameStatus.LOBBY,
    ACTIVE: GameStatus.ACTIVE,
    FINISHED: GameStatus.FINISHED,
  },
  Query: {
    games: () => games,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`GraphQL server ready at: ${url}`);
}

startServer();
