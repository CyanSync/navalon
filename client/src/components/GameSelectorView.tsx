import { useQuery } from "@apollo/client";
import { GraphQLAPIClass } from "@aws-amplify/api-graphql";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

import { Wrapper } from "./Wrapper";
import { graphql } from "../__generated__";
import { Game } from "../__generated__/graphql";
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
        <Button mode="contained-tonal" style={{ marginTop: 10 }}>
          Join
        </Button>
      </Card.Content>
    </Card>
  );
}

export { GameSelectorView };
