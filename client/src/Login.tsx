import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Amplify, Hub, Auth } from "aws-amplify";
import { createURL, openURL } from "expo-linking";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";

import awsConfig from "./aws-exports";

const isLocalHost = Boolean(__DEV__);

const [localRedirectSignIn, productionRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(",");

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
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

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

function Login() {
  const [user, setUser] = useState(null);
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
          break;
        // Only needed for separate tabs
        // case "cognitoHostedUI":
        //   WebBrowser.maybeCompleteAuthSession({});
        //   break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
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
      <Text>{user && user.getUsername()}</Text>
      <Text>{appLink}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export { Login };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
