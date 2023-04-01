import { Generated } from "kysely";

import { GameStatus } from "../entity/Game.js";

interface GameTable {
  id: Generated<number>;
  name: string;
  status: GameStatus;
}

export { GameTable };
