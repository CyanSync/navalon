import { useQuery } from "@apollo/client";
import { DangerousChangeType } from "graphql";
import { gql } from "graphql-tag";

import { graphql } from "./__generated__";

const GET_BOOKS = graphql(
  `
    #graphql
    query Books {
      books {
        title
        author
      }
    }
  `
);

function Dogs() {
  const { data, error } = useQuery(GET_BOOKS);

  if (error) {
    return <div>Loading</div>;
  }
  return <div> {data.books[0].title} </div>;
}

export { Dogs };
