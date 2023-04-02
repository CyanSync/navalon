import { Kysely, sql } from "kysely";

async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema
    .createTable("games")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("status", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("owner", "serial", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("game_users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("game", "serial", (col) => col.notNull())
    .addColumn("user", "serial", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema.createIndex("game_users_game_idx").on("game_users").column("game").execute();
  await db.schema.createIndex("game_users_user_idx").on("game_users").column("user").execute();
}

async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex("game_users_game_idx").execute();
  await db.schema.dropIndex("game_users_user_idx").execute();

  await db.schema.dropTable("users").execute();
  await db.schema.dropTable("games").execute();
  await db.schema.dropTable("game_users").execute();
}

export { up, down };
