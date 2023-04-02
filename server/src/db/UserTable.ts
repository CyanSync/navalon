import { Generated } from "kysely";

interface UserTable {
  id: Generated<number>;

  email: string;
  name: string;
  created_at: Generated<Date>;
}

export { UserTable };
