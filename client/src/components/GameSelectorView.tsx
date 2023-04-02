import { useMutation, useQuery } from "@apollo/client";
import { GraphQLAPIClass } from "@aws-amplify/api-graphql";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Button, Card, Chip, Text, List } from "react-native-paper";
import ListItem from "react-native-paper/lib/typescript/src/components/List/ListItem";

import { Wrapper } from "./Wrapper";
import { graphql } from "../__generated__";
import { Game } from "../__generated__/graphql";
import { RootStackParamList } from "../rootStackParamList";
import { useAuthentication, useCurrentUser } from "../utils/getUserHook";

const GET_GAMES = graphql(
  `
    #graphql
    query Games {
      games {
        id
        name
        usersInGame {
          id
          name
        }
      }
    }
  `
);

const JOIN_GAME = graphql(
  `
    #graphql
    mutation JoinGame($id: Float!) {
      joinGame(gameId: $id)
    }
  `
);

function GameSelectorView() {
  const { data, refetch } = useQuery(GET_GAMES);

  const isFocused = useIsFocused();

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <Wrapper>
      <FlatList
        style={{ width: "100%" }}
        data={data?.games}
        renderItem={({ item }) => <GameBubble game={item} key={item.id} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </Wrapper>
  );
}
function GameBubble({ game }: { game: Game }) {
  const [joinGame, { data, loading, error }] = useMutation(JOIN_GAME);

  return (
    <Card>
      <Card.Title title={game.name} />
      <Card.Content>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
          key={game.id}>
          <Text variant="labelSmall"> In game: </Text>
          {game.usersInGame.map((user) => (
            <Chip style={{ margin: 5, width: "max-content" }} compact key={user.id}>
              {user.name}
            </Chip>
          ))}
        </View>
        <Button
          mode="contained-tonal"
          onPress={() => {
            joinGame({ variables: { id: game.id } });
          }}>
          Join
        </Button>
      </Card.Content>
    </Card>
  );
}

function CreateNewButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Button
      mode="contained-tonal"
      onPress={() => {
        navigation.navigate("CreateNewGameView");
      }}>
      Create New Game
    </Button>
  );
}

export { GameSelectorView, CreateNewButton };
