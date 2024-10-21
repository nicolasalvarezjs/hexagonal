import { IMatchRepository } from "../repositories/match.repository";

export class MatchService {
  constructor(private matchRepository: IMatchRepository) {}
}
