import { useMutation, useQuery } from "@apollo/client";
import { GraphQLAPIClass } from "@aws-amplify/api-graphql";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Button, Card, Chip, Text, List, Switch } from "react-native-paper";
import ListItem from "react-native-paper/lib/typescript/src/components/List/ListItem";

import { Spacer } from "./Spacer";
import { Wrapper } from "./Wrapper";
import { UsersInGameChips } from "../UsersInGameChips";
import { graphql } from "../__generated__";
import { Game, GameSettings } from "../__generated__/graphql";
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
        gameSettings {
          gameId
          percival
          oberon
          mordred
          ladyOfLake
        }
      }
    }
  `
);

function GameLobbyView({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "GameLobbyView">) {
  const gameId = Number(route.params.gameId);
  const [gameData, setGameData] = useState<{ game?: Game }>({});

  const { error, refetch } = useQuery(GET_GAME, {
    variables: { gameId },
    onCompleted: (data) => setGameData({ game: data?.game }),
  });

  const isFocused = useIsFocused();

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

  if (!gameData) {
    return (
      <Wrapper>
        <Text variant="headlineMedium">Loading...</Text>
      </Wrapper>
    );
  }

  if (!gameData.game) {
    return (
      <Wrapper>
        <Text variant="headlineMedium">Could not find game</Text>
      </Wrapper>
    );
  }

  setInterval(async () => {
    await refetch();
  }, 1000);
  const game = gameData.game;

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
          <GameSettingsView
            gameSettings={gameData.game.gameSettings}
            key={JSON.stringify(gameData.game.gameSettings)}
          />
        </Card.Content>
      </Card>
    </Wrapper>
  );
}

const UPDATE_SETTINGS = graphql(
  `
    #graphql
    mutation UpdateGameSettings($gameSettingsInput: GameSettingsInput!) {
      updateGameSettings(gameSettingsInput: $gameSettingsInput) {
        gameId
        percival
        oberon
        mordred
        ladyOfLake
      }
    }
  `
);

function GameSettingsView({ gameSettings }: { gameSettings: GameSettings }) {
  console.log("doing render");
  const [ladyOfLake, setLadyOfLake] = useState(gameSettings.ladyOfLake);
  const [mordred, setMordred] = useState(gameSettings.mordred);
  const [oberon, setOberon] = useState(gameSettings.oberon);
  const [percival, setPercival] = useState(gameSettings.percival);

  const [updateSettings, { data, loading, error }] = useMutation(UPDATE_SETTINGS);
  console.log(gameSettings.gameId);

  useEffect(() => {
    updateSettings({
      variables: {
        gameSettingsInput: {
          gameId: gameSettings.gameId,
          percival,
          oberon,
          mordred,
          ladyOfLake,
        },
      },
    });
  }, [ladyOfLake, mordred, oberon, percival]);

  function ToggleBox({
    item,
    setItem,
    name,
    description,
  }: {
    item: boolean;
    setItem: (value: boolean) => void;
    name: string;
    description: string;
  }) {
    return (
      <List.Item
        title={name}
        description={description}
        left={(props) => <List.Icon {...props} icon="ladybug" />}
        onPress={() => {}}
        right={() => (
          <Switch
            value={item}
            onValueChange={async () => {
              setItem(!item);
              console.log(data, error);
            }}
          />
        )}
      />
    );
  }

  return (
    <View>
      <Text variant="headlineMedium">Game Settings</Text>
      <Spacer />
      <ToggleBox
        item={ladyOfLake}
        setItem={setLadyOfLake}
        name="Lady of the Lake"
        description="Lady of the Lake will be in the game"
      />
      <ToggleBox
        item={mordred}
        setItem={setMordred}
        name="Mordred"
        description="Mordred will be in the game"
      />
      <ToggleBox
        item={oberon}
        setItem={setOberon}
        name="Oberon"
        description="Oberon will be in the game"
      />

      <ToggleBox
        item={percival}
        setItem={setPercival}
        name="Percival"
        description="Percival will be in the game"
      />
    </View>
  );
}

export { GameLobbyView };
