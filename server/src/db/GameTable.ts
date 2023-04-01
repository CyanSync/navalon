import { Generated } from "kysely";

interface GameTable {
  id: Generated<number>;

  email: string;
  name: string;
  status: string;
}

export { GameTable };
