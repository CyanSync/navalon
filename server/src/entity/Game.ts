class Game {
  id: string = "0";
  status: GameStatus = GameStatus.LOBBY;
}

enum GameStatus {
  LOBBY,
  ACTIVE,
  FINISHED,
}

export { GameStatus, Game };
