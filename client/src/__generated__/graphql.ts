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
  gameSettings: GameSettings;
  id: Scalars['Float'];
  name: Scalars['String'];
  owner: Scalars['Float'];
  status: GameStatus;
  usersInGame: Array<User>;
};

export type GameChangePayload = {
  __typename?: 'GameChangePayload';
  shouldRefetch: Scalars['Boolean'];
};

export type GameSettings = {
  __typename?: 'GameSettings';
  gameId: Scalars['Float'];
  ladyOfLake: Scalars['Boolean'];
  mordred: Scalars['Boolean'];
  oberon: Scalars['Boolean'];
  percival: Scalars['Boolean'];
};

export type GameSettingsInput = {
  gameId: Scalars['Float'];
  ladyOfLake?: Scalars['Boolean'];
  mordred?: Scalars['Boolean'];
  oberon?: Scalars['Boolean'];
  percival?: Scalars['Boolean'];
};

/** The different statuses that a game can be in. */
export enum GameStatus {
  Active = 'ACTIVE',
  Finished = 'FINISHED',
  Lobby = 'LOBBY'
}

export type Mutation = {
  __typename?: 'Mutation';
  createGame: Game;
  joinGame: Scalars['Boolean'];
  updateGameSettings: GameSettings;
};


export type MutationCreateGameArgs = {
  name: Scalars['String'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['Float'];
};


export type MutationUpdateGameSettingsArgs = {
  gameSettingsInput: GameSettingsInput;
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games: Array<Game>;
};


export type QueryGameArgs = {
  id: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  gameChange: GameChangePayload;
};


export type SubscriptionGameChangeArgs = {
  gameId: Scalars['Float'];
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

export type GameQueryVariables = Exact<{
  gameId: Scalars['Float'];
}>;


export type GameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: number, name: string, status: GameStatus, owner: number, usersInGame: Array<{ __typename?: 'User', id: number, name: string, email: string }>, gameSettings: { __typename?: 'GameSettings', gameId: number, percival: boolean, oberon: boolean, mordred: boolean, ladyOfLake: boolean } } | null };

export type SubscriptionSubscriptionVariables = Exact<{
  gameId: Scalars['Float'];
}>;


export type SubscriptionSubscription = { __typename?: 'Subscription', gameChange: { __typename?: 'GameChangePayload', shouldRefetch: boolean } };

export type UpdateGameSettingsMutationVariables = Exact<{
  gameSettingsInput: GameSettingsInput;
}>;


export type UpdateGameSettingsMutation = { __typename?: 'Mutation', updateGameSettings: { __typename?: 'GameSettings', gameId: number, percival: boolean, oberon: boolean, mordred: boolean, ladyOfLake: boolean } };

export type GamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', id: number, name: string, usersInGame: Array<{ __typename?: 'User', id: number, name: string }> }> };

export type JoinGameMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JoinGameMutation = { __typename?: 'Mutation', joinGame: boolean };


export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const GameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Game"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"usersInGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"gameSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"percival"}},{"kind":"Field","name":{"kind":"Name","value":"oberon"}},{"kind":"Field","name":{"kind":"Name","value":"mordred"}},{"kind":"Field","name":{"kind":"Name","value":"ladyOfLake"}}]}}]}}]}}]} as unknown as DocumentNode<GameQuery, GameQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameChange"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shouldRefetch"}}]}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
export const UpdateGameSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGameSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameSettingsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GameSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGameSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameSettingsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameSettingsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameId"}},{"kind":"Field","name":{"kind":"Name","value":"percival"}},{"kind":"Field","name":{"kind":"Name","value":"oberon"}},{"kind":"Field","name":{"kind":"Name","value":"mordred"}},{"kind":"Field","name":{"kind":"Name","value":"ladyOfLake"}}]}}]}}]} as unknown as DocumentNode<UpdateGameSettingsMutation, UpdateGameSettingsMutationVariables>;
export const GamesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"games"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"usersInGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GamesQuery, GamesQueryVariables>;
export const JoinGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<JoinGameMutation, JoinGameMutationVariables>;