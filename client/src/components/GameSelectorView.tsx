import { useQuery } from "@apollo/client";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { Text, View, Image } from "react-native";

import { Wrapper } from "./Wrapper";
import { graphql } from "../__generated__";
import { useAuthentication, useCurrentUser } from "../utils/getUserHook";

const GET_GAMES = graphql(
  `
    #graphql
    query Games {
      games {
        id
        status
      }
    }
  `
);

function GameSelectorView({}: object) {
  const auth = useAuthentication();
  const user = useCurrentUser();

  const { data, error } = useQuery(GET_GAMES);

  console.log(user);
  console.log("inside", auth);
  if (data) {
    console.log(data.games[0]);
  }

  return (
    <Wrapper>
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
        {data?.games?.map((game) => (
          <div>
            ID: {game.id}
            <br />
            Status: {game.status}
          </div>
        ))}
      </Text>
    </Wrapper>
  );
}

export { GameSelectorView };
