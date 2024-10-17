import { IRepository } from "../../../shared/repositories/abstract.repository";
import { IMatch } from "../entities/Match";

export interface IMatchRepository extends IRepository<IMatch, string> {}
