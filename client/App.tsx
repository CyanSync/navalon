import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Login } from "./src/Login";
import { GameSelectorView } from "./src/components/GameSelectorView";
import { useAuthentication } from "./src/utils/getUserHook";

// Initialize Apollo Client
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log("token is", token);
  return {
    headers: {
      ...headers,
      authorization: token ?? "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
