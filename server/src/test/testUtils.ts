import { ExecutionResult } from "graphql";
import { graphql } from "graphql/graphql";
import { Maybe } from "type-graphql";

import { ResolverContext } from "..";
import { createGraphQLSchema } from "../createGraphQLSchema";

export async function gqlCall({
  source,
  variableValues,
  context,
}: // = { user: { id: 0, name: "Shahan Neda", email: "test@example.com" } },
{
  source: string;
  variableValues?: Maybe<{
    readonly [variable: string]: unknown;
  }>;
  context?: ResolverContext;
}): Promise<ExecutionResult> {
  return graphql({
    schema: await createGraphQLSchema(),
    source,
    variableValues,
    contextValue: context,
  });
}
