import { promises as fs } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import * as path from "path";
import pg from "pg";
import { Service } from "typedi";
import { fileURLToPath } from "url";

import { GameTable } from "../db/GameTable.js";
import { GameUserTable } from "../db/GameUserTable.js";
import { UserTable } from "../db/UserTable.js";
const LOG = true;

interface Database {
  users: UserTable;
  games: GameTable;
  game_users: GameUserTable;
}

@Service()
class DbProvider {
  db: Kysely<Database>;

  constructor() {
    this.db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new pg.Pool({
          host: "localhost",
          database: "navalon",
          user: "dev",
          password: "dev",
          port: 5433,
        }),
      }),
      log: LOG ? console.log : undefined,
    });

    this.runMigrations();
  }

  async runMigrations() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const db = this.db;
    const migrator = new Migrator({
      db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, "../migrations"),
      }),
    });

    await migrator.migrateToLatest();

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(`migration "${it.migrationName}" was executed successfully`);
      } else if (it.status === "Error") {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
    }
  }
}

export { DbProvider };
