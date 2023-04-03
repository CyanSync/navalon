import { Generated } from "kysely";

import { GameStatus } from "../entity/Game";

interface GameSettingsTable {
  id: Generated<number>;
  game_id: number;

  percival: boolean;
  oberon: boolean;
  mordred: boolean;
  lady_of_lake: boolean;
}

export { GameSettingsTable };
