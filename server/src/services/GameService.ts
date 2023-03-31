import { Service } from "typedi";

import { Game, GameStatus } from "../entity/Game";
import { User } from "../entity/User";

const users: User[] = [
  {
    id: "shshjfh",
    name: "Shahan",
    email: "shahan.neda@gmail.com",
  },
];

@Service()
class GameService {
  getGames() {
    const games: Game[] = [
      {
        id: "game1",
        name: " Shahans Game",
        status: GameStatus.ACTIVE,
        usersInGame: [users[0], users[0], users[0]],
      },
      {
        id: "game2",
        name: "Bobs Game",
        status: GameStatus.FINISHED,
        usersInGame: [],
      },
      {
        id: "game3",
        name: "Lemons Game",
        status: GameStatus.FINISHED,
        usersInGame: [],
      },
    ];
    return games;
  }
}

export { GameService };
