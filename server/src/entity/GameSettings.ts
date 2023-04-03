import { IsInt } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { inherits } from "util";

import { Game } from "./Game";

@InputType("GameSettingsInput")
@ObjectType()
class GameSettings {
  @Field()
  @IsInt()
  gameId: number;

  @Field()
  percival: boolean = false;

  @Field()
  oberon: boolean = false;

  @Field()
  mordred: boolean = false;

  @Field()
  ladyOfLake: boolean = false;

  constructor(
    gameId: number,
    percival: boolean = false,
    oberon: boolean = false,
    mordred: boolean = false,
    ladyOfLake: boolean = false
  ) {
    this.gameId = gameId;
    this.percival = percival;
    this.oberon = oberon;
    this.mordred = mordred;
    this.ladyOfLake = ladyOfLake;
  }
}

export { GameSettings };
// @ObjectType()
// export class GameSettings extends AbstractGameSettings {}

// @InputType()
// export class GameSettingsInput extends AbstractGameSettings {}
