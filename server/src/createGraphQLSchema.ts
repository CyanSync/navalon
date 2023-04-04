import { buildSchema } from "type-graphql";
import Container from "typedi";

import { GameResolver } from "./resolvers/GameResolver";

async function createGraphQLSchema() {
  return await buildSchema({
    resolvers: [GameResolver],
    container: Container,
    
  });
}
export { createGraphQLSchema };
