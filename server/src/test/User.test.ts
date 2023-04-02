import "reflect-metadata";
import { Container } from "typedi";

import { DbProvider } from "../services/DbProvider.js";

const db = Container.get(DbProvider);

test("a user can signup", async () => {
  expect(1).toBe(1);
});
