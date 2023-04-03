import { useMutation, useQuery } from "@apollo/client";
import { GraphQLAPIClass } from "@aws-amplify/api-graphql";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Button, Card, Chip, Text, List } from "react-native-paper";
import ListItem from "react-native-paper/lib/typescript/src/components/List/ListItem";

import { Spacer } from "./Spacer";
import { Wrapper } from "./Wrapper";
import { UsersInGameChips } from "../UsersInGameChips";
import { graphql } from "../__generated__";
import { Game } from "../__generated__/graphql";
import { RootStackParamList } from "../rootStackParamList";
import { useAuthentication, useCurrentUser } from "../utils/getUserHook";

const GET_GAME = graphql(
  `
    #graphql
    query Game($gameId: Float!) {
      game(id: $gameId) {
        id
        name
        status
        usersInGame {
          id
          name
          email
        }
        owner
      }
    }
  `
);

function GameLobbyView({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "GameLobbyView">) {
  const gameId = Number(route.params.gameId);
  const { data, error, refetch } = useQuery(GET_GAME, { variables: { gameId } });

  const isFocused = useIsFocused();
  console.log(data);

  useEffect(() => {
    refetch();
  }, [isFocused]);

  if (error) {
    console.log(error);
    return (
      <Wrapper>
        <Text variant="headlineMedium">Could not load game</Text>
      </Wrapper>
    );
  }

  if (!data) {
    return (
      <Wrapper>
        <Text variant="headlineMedium">Loading...</Text>
      </Wrapper>
    );
  }

  if (!data.game) {
    return (
      <Wrapper>
        <Text variant="headlineMedium">Could not find game</Text>
      </Wrapper>
    );
  }

  const game = data.game;

  return (
    <Wrapper shouldCenterVertically={false}>
      <Text variant="headlineMedium">
        Game Lobby (id: {gameId}): {game.name}
      </Text>
      <Spacer />
      <Card>
        <Card.Title title="Users In Game:" />
        <Card.Content>
          <UsersInGameChips users={game.usersInGame} />
        </Card.Content>
      </Card>
    </Wrapper>
  );
}
export { GameLobbyView };
