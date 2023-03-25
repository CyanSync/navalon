import { User } from "./User";

class Game {
  id: string = "0";
  name: string = "";
  status: GameStatus = GameStatus.LOBBY;
  usersInGame: User[] = [];
}

enum GameStatus {
  LOBBY,
  ACTIVE,
  FINISHED,
}

export { GameStatus, Game };
