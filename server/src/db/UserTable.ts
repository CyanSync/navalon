import { Generated } from "kysely";

interface UserTable {
  id: Generated<number>;

  email: string;
  name: string;
}

export { UserTable };
