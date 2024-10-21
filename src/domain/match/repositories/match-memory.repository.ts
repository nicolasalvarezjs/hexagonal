import { ICreateMatch, IMatch } from "../entities/Match";
import { IMatchRepository } from "./match.repository";

export class MatchMemoryRepository implements IMatchRepository {
  Matchs: IMatch[] = [];
  counterID: string = "0";

  increaseID() {
    this.counterID = (Number(this.counterID) + 1).toString();
  }

  create(entity: ICreateMatch): Promise<IMatch> {
    return new Promise((res, rej) => {
      const Match: IMatch = {
        _id: this.counterID,
        ...entity,
      };
      this.Matchs.push(Match);
      this.increaseID();
      res(Match);
    });
  }
  findById(id: string): Promise<IMatch> {
    return new Promise((res, rej) => {
      const Match = this.Matchs.find((Match) => Match._id === id);
      res(Match || null);
    });
  }
  findAll(): Promise<IMatch[]> {
    return new Promise((res, rej) => {
      const Matchs = this.Matchs;
      res(Matchs);
    });
  }
  update(id: string, entity: IMatch): Promise<IMatch> {
    return new Promise((res, rej) => {
      this.findById(id).then((Match) => {
        const Matchs = this.Matchs.filter((Match) => Match._id !== id);
        this.Matchs = Matchs;
        this.Matchs.push(entity);
        res(entity);
      });
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      const Matchs = this.Matchs.filter((Match) => Match._id !== id);
      this.Matchs = Matchs;
      res(true);
    });
  }
}
