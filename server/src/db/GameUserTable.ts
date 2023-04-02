import { Generated } from "kysely";

import { GameStatus } from "../entity/Game";

interface GameUserTable {
  id: Generated<number>;
  game: number;
  user: number;
  created_at: Generated<Date>;
}

export { GameUserTable };
