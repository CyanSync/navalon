import { useQuery } from "@apollo/client";
import { GraphQLAPIClass } from "@aws-amplify/api-graphql";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
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
        status
        usersInGame {
          id
          name
        }
      }
    }
  `
);

function GameSelectorView({}: object) {
  const { data } = useQuery(GET_GAMES);

  return (
    <Wrapper>
      <FlatList
        style={{ width: "100%" }}
        data={data?.games}
        renderItem={({ item }) => <GameBubble game={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </Wrapper>
  );
}
function GameBubble({ game }: { game: Game }) {
  return (
    <Card>
      <Card.Title title={game.name} />
      <Card.Content>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
          <Text variant="labelSmall"> In game: </Text>
          {game.usersInGame.map((user) => (
            <Chip style={{ margin: 3, width: "10", maxWidth: 100 }}>{user.name}</Chip>
          ))}
        </View>
        <Button mode="contained-tonal">Join</Button>
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
