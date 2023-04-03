import React from "react";
import { Chip } from "react-native-paper";

import { User } from "./__generated__/graphql";

function UsersInGameChips({ users }: { users: User[] }) {
  return (
    <>
      {users.map((user) => (
        <Chip style={{ margin: 5, width: "max-content" }} compact key={user.id}>
          {user.name}
        </Chip>
      ))}
    </>
  );
}

export { UsersInGameChips };
