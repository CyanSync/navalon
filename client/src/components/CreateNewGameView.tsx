import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Button, Card, Chip, Text, TextInput } from "react-native-paper";

import { Spacer } from "./Spacer";
import { Wrapper } from "./Wrapper";

function CreateNewGameView() {
  const [gameName, setGameName] = useState<string>("");
  function submit() {}

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
