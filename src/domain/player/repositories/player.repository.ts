import { IRepository } from "../../../shared/repositories/abstract.repository";
import { ICreatePlayer, IPlayer, IShortPlayer } from "../entities/Player";

export interface IPlayerRepository
  extends IRepository<IPlayer, string, ICreatePlayer> {
  findNearby(
    lat: number,
    lng: number,
    distance: number,
  ): Promise<IShortPlayer[]>;
}
