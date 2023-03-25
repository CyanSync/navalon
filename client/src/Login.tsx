import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Amplify, Hub, Auth } from "aws-amplify";
import { createURL, openURL } from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

import awsConfig from "./aws-exports";
import { Wrapper } from "./components/Wrapper";
import { RootStackParamList } from "./rootStackParamList";

const isLocalHost = Boolean(__DEV__);

const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(",");

const [localRedirectSignOut, productionRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(",");

function getAppLink() {
  let val = createURL("");
  if (val.charAt(val.length - 1) != "/") {
    val = val + "/";
  }
  return val;
}
const appLink = getAppLink();

console.log(`App link is: ${appLink}`);

async function urlOpener(url, redirectUrl) {
  if (Platform.OS === "web") {
    return openURL(url);
  }

  //@ts-ignore URL is actually there for when we're using it
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

  if (type === "success") {
    if (Platform.OS === "ios") {
      WebBrowser.dismissBrowser();
      return openURL(newUrl);
    }

    // If we want to use separate tabs
    // if (Platform.OS === "web") {
    //   Auth.currentAuthenticatedUser();
    //   return openURL(newUrl);
    // }
  }
}

const updatedConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: appLink,
    redirectSignOut: appLink,
    urlOpener,
  },
};
Amplify.configure(updatedConfig);

function Login({ navigation }: NativeStackScreenProps<RootStackParamList, "GameSelector">) {
  const [user, setUser] = useState(null);
  const [email, setUserEmail] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("event", event);
      console.log("data", data);
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          localStorage.removeItem("token");
          break;
        // Only needed for separate tabs
        // case "cognitoHostedUI":
        //   WebBrowser.maybeCompleteAuthSession({});
        //   break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(async (currentUser) => {
        setUser(currentUser);
        const token = (await Auth.userSession(currentUser)).getIdToken().getJwtToken();
        if (token !== undefined) {
          localStorage.setItem("token", token);
          console.log(token);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return (
    <Wrapper>
      {user === null ? (
        <Button
          title="Sign In with Google"
          onPress={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }
        />
      ) : (
        <Button title="Sign Out" onPress={() => Auth.signOut()} />
      )}
      <Button title="Go to next page" onPress={() => navigation.navigate("GameSelector")} />
      <Text>{user && user.getUsername()}</Text>
      <Text>{appLink}</Text>
      <Text>{email && email}</Text>
      <StatusBar style="auto" />
    </Wrapper>
  );
}

export { Login };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
