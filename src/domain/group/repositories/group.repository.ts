import { IRepository } from "../../../shared/repositories/abstract.repository";
import { ICreateGroup, IGroup } from "../entities/Group";

export interface IGroupRepository
  extends IRepository<IGroup, string, ICreateGroup> {
  findByPlayerID(playerID: string): Promise<IGroup[]>;
  findNearby(lat: number, lng: number, distance: number): Promise<IGroup[]>;
}
