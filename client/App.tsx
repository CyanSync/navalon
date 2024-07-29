import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createClient } from "graphql-ws";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { Login } from "./src/Login";
import { CreateNewGameView } from "./src/components/CreateNewGameView";
import { GameLobbyView } from "./src/components/GameLobbyView";
import { CreateNewButton, GameSelectorView } from "./src/components/GameSelectorView";
import { useAuthentication } from "./src/utils/getUserHook";

// const URI = "192.168.1.116:4000";
const URI = "localhost:4000";
// Initialize Apollo Client
const httpLink = createHttpLink({
  // uri: "http://192.168.1.120:4000",
  uri: "http://" + URI,
});

const authLink = setContext((_, { headers }) => {
  try {
    const token = localStorage.getItem("token");
    console.log("token is", token);
    return {
      headers: {
        ...headers,
        authorization: token ?? "",
      },
    };
  } catch (e) {}
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://" + URI,
  })
);
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer
          theme={DarkTheme}
          linking={{ enabled: false, prefixes: ["localhost"] }}>
          {/* <View style={styles.container}> */}
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="GameSelectorView"
              component={GameSelectorView}
              options={{
                headerRight: CreateNewButton,
              }}
            />
            <Stack.Screen name="CreateNewGameView" component={CreateNewGameView} />
            <Stack.Screen name="GameLobbyView" component={GameLobbyView} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
