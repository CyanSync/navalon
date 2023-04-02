import { ExecutionResult } from "graphql";
import { graphql } from "graphql/graphql";
import { Maybe } from "type-graphql";

import { createGraphQLSchema } from "../createGraphQLSchema";

export async function gqlCall({
  source,
  variableValues,
}: {
  source: string;
  variableValues?: Maybe<{
    readonly [variable: string]: unknown;
  }>;
}): Promise<ExecutionResult> {
  return graphql({
    schema: await createGraphQLSchema(),
    source,
    variableValues,
  });
}
