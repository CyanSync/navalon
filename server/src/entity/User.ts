import { IsEmail, MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class User {
  @Field((type) => ID)
  id: string = "";

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  @MaxLength(100)
  name: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}

export { User };
