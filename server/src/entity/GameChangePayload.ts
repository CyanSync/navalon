import { Field, ObjectType } from "type-graphql";

@ObjectType()
class GameChangePayload {
  @Field()
  shouldRefetch: boolean = false;

  constructor(shouldRefetch: boolean = false) {
    this.shouldRefetch = shouldRefetch;
  }
}

export { GameChangePayload };
