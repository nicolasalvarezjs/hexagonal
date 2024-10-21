export interface IRating {
  speed: number;
  shot: number;
  team: number;
  dribble: number;
  def: number;
}

export interface IRatingTo {
  rating: IRating;
  playerID: string;
}
