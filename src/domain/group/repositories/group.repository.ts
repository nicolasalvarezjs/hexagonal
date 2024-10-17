import { IRepository } from "../../../shared/repositories/abstract.repository";
import { IGroup } from "../entities/Group";

export interface IGroupRepository extends IRepository<IGroup, string> {
  findByPlayerID(playerID: string): Promise<IGroup[]>;
}
