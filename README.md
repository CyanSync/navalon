# Navalon


Notes for setting up from scratch:
`cd server/dependencies && docker compose up --build` to spin up database
`npm install` in both client and server folder
`npm run dev` in both client and server folder



Follow:
https://docs.amplify.aws/gen1/react/start/getting-started/introduction/


Get google api keys from:
https://console.cloud.google.com/apis/credentials?project=navalon-381021&supportedpurview=project

For from scratch AWS setup:
https://us-east-2.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-2_RrxCZ2TGR/sign-in/identity-providers/details/Google?region=us-east-2
Make sure:
User pool attribute
Google attribute
email
email
email_verified
email_verified
family_name
family_name
given_name
given_name
username
sub