import { Generated } from "kysely";

import { GameStatus } from "../entity/Game";

interface GameTable {
  id: Generated<number>;
  name: string;
  status: GameStatus;
  created_at: Generated<Date>;
}

export { GameTable };
