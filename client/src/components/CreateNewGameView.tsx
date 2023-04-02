import { useMutation } from "@apollo/client";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Button, Card, Chip, Text, TextInput } from "react-native-paper";

import { Spacer } from "./Spacer";
import { Wrapper } from "./Wrapper";
import { graphql } from "../__generated__";
import { RootStackParamList } from "../rootStackParamList";

const CREATE_GAME = graphql(
  `
    #graphql
    mutation CreateGame($name: String!) {
      createGame(name: $name) {
        id
      }
    }
  `
);

function CreateNewGameView() {
  const [gameName, setGameName] = useState<string>("");
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_GAME);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function submit() {
    if (!gameName) {
      return;
    }

    mutateFunction({ variables: { name: gameName } });
    navigation.navigate("GameSelectorView");
  }

  return (
    <Wrapper>
      <TextInput label="Game Name" value={gameName} onChangeText={setGameName} mode="outlined" />
      <Spacer />
      <Button mode="contained-tonal" onPress={submit}>
        Create
      </Button>
    </Wrapper>
  );
}

export { CreateNewGameView };
