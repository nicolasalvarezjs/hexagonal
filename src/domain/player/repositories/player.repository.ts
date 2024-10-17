import { IRepository } from "../../../shared/repositories/abstract.repository";
import { IPlayer } from "../entities/Player";

export interface IPlayerRepository extends IRepository<IPlayer, string> {}
