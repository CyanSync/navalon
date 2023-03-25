import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <ApolloProvider client={client}>
        <NavigationContainer theme={DarkTheme}>
          {/* <View style={styles.container}> */}
          <Stack.Navigator initialRouteName="GameSelector">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="GameSelector" component={GameSelectorView} />
          </Stack.Navigator>
          {/* </View> */}
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
