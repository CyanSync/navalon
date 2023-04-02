import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { Login } from "./src/Login";
import { CreateNewGameView } from "./src/components/CreateNewGameView";
import { CreateNewButton, GameSelectorView } from "./src/components/GameSelectorView";
import { useAuthentication } from "./src/utils/getUserHook";

// Initialize Apollo Client
const httpLink = createHttpLink({
  uri: "http://192.168.1.120:4000",
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
        <NavigationContainer theme={DarkTheme} linking={{ enabled: true, prefixes: ["localhost"] }}>
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
