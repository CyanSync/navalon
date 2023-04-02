/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['Float'];
  name: Scalars['String'];
  status: Scalars['Float'];
  usersInGame: Array<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  joinGame: Scalars['Boolean'];
};


export type MutationCreateGameArgs = {
  name: Scalars['String'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  games: Array<Game>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type CreateGameMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame: { __typename?: 'Game', id: number } };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: number, name: string, usersInGame: Array<{ __typename?: 'User', id: number, name: string }> }> };

export type JoinGameMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JoinGameMutation = { __typename?: 'Mutation', joinGame: boolean };


export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const GamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"usersInGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const JoinGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<JoinGameMutation, JoinGameMutationVariables>;