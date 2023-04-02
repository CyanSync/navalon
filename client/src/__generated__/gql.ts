/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    #graphql\n    mutation CreateGame($name: String!) {\n      createGame(name: $name) {\n        id\n      }\n    }\n  ": types.CreateGameDocument,
    "\n    #graphql\n    query Game($gameId: Float!) {\n      game(id: $gameId) {\n        id\n        name\n        status\n        usersInGame {\n          id\n          name\n        }\n        owner\n      }\n    }\n  ": types.GameDocument,
    "\n    #graphql\n    query Games {\n      games {\n        id\n        name\n        usersInGame {\n          id\n          name\n        }\n      }\n    }\n  ": types.GamesDocument,
    "\n    #graphql\n    mutation JoinGame($id: Float!) {\n      joinGame(gameId: $id)\n    }\n  ": types.JoinGameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateGame($name: String!) {\n      createGame(name: $name) {\n        id\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    mutation CreateGame($name: String!) {\n      createGame(name: $name) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query Game($gameId: Float!) {\n      game(id: $gameId) {\n        id\n        name\n        status\n        usersInGame {\n          id\n          name\n        }\n        owner\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    query Game($gameId: Float!) {\n      game(id: $gameId) {\n        id\n        name\n        status\n        usersInGame {\n          id\n          name\n        }\n        owner\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query Games {\n      games {\n        id\n        name\n        usersInGame {\n          id\n          name\n        }\n      }\n    }\n  "): (typeof documents)["\n    #graphql\n    query Games {\n      games {\n        id\n        name\n        usersInGame {\n          id\n          name\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation JoinGame($id: Float!) {\n      joinGame(gameId: $id)\n    }\n  "): (typeof documents)["\n    #graphql\n    mutation JoinGame($id: Float!) {\n      joinGame(gameId: $id)\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;