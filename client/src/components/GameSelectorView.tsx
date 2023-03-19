import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Text, View, Image } from "react-native";

import { useAuthentication, useCurrentUser } from "../utils/getUserHook";

function GameSelectorView({}: object) {
  const auth = useAuthentication();
  const user = useCurrentUser();

  console.log(user);
  console.log("inside", auth);

  return (
    <View>
      {user ? <Image source={{ uri: user.attributes.picture }} /> : null}
      <Text>
        GameSelectorView:
        {/* {auth} */}
        <br />
        {user ? (
          <>
            {user.attributes.email}
            <br />
            {user.attributes.given_name} {user.attributes.family_name}
            <br />
            <br />
          </>
        ) : null}
      </Text>
    </View>
  );
}

export { GameSelectorView };
