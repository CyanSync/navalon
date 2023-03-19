import { CognitoUser } from "@aws-amplify/auth";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

function useAuthentication(): string | null {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    Auth.currentSession().then((data) => {
      setToken(data.getAccessToken().getJwtToken());
    });
    console.log("did session");
  }, []);

  return token;
}

type UserResponse = {
  id: string;
  username: string;
  attributes: {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
  };
};

function useCurrentUser(): UserResponse | null {
  const [data, setData] = useState<UserResponse | null>(null);

  useEffect(() => {
    Auth.currentUserInfo().then((data) => {
      setData(data);
    });
  }, []);

  if (data) {
    return data;
  }

  return null;
}
export { useAuthentication, useCurrentUser };
