import { Generated } from "kysely";

import { GameStatus } from "../entity/Game";

interface GameTable {
  id: Generated<number>;
  name: string;
  status: string; // GameStatus
  created_at: Generated<Date>;
  owner: number;
}

export { GameTable };
