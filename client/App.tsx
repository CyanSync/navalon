import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Login } from "./src/Login";
import { GameSelectorView } from "./src/components/GameSelectorView";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Login />
        <GameSelectorView />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
