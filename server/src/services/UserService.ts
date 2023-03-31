import { Game, GameStatus } from "../entity/Game";
import { User } from "../entity/User";

const users: User[] = [
  {
    id: "shshjfh",
    name: "Shahan",
    email: "shahan.neda@gmail.com",
  },
];

class UserService {
  getUsers() {
    return users;
  }
}

export { UserService };
