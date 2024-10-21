import { IRating, IRatingTo } from "src/shared";
import { ICreatePlayer } from "../entities/Player";
import { IPlayerRepository } from "../repositories/player.repository";

export class PlayerService {
  constructor(private playerRepository: IPlayerRepository) {}

  private getInitPlayer(): ICreatePlayer {
    return {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };
  }

  create() {
    const newPlayer = this.getInitPlayer();
    return this.playerRepository.create(newPlayer);
  }

  async ratingTo(playerID: string, playerToID: string, rating: IRating) {
    const newRating: IRatingTo = {
      playerID,
      rating,
    };
    const playerTo = await this.playerRepository.findById(playerToID);
    playerTo.ratings.push(newRating);
    return this.playerRepository.update(playerToID, playerTo);
  }

  findNearby(lat: number, lng: number, distance: number) {
    return this.playerRepository.findNearby(lat, lng, distance);
  }
}
