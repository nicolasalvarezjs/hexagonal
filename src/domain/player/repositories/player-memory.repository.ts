import { ICreatePlayer, IPlayer, IShortPlayer } from "../entities/Player";
import { IPlayerRepository } from "./player.repository";

export class PlayerMemoryRepository implements IPlayerRepository {
  Players: IPlayer[] = [];
  counterID: string = "0";

  increaseID() {
    this.counterID = (Number(this.counterID) + 1).toString();
  }

  findNearby(
    lat: number,
    lng: number,
    distance: number,
  ): Promise<IShortPlayer[]> {
    return new Promise((res, rej) => {
      res(this.Players);
    });
  }

  create(entity: ICreatePlayer): Promise<IPlayer> {
    return new Promise((res, rej) => {
      const Player: IPlayer = {
        _id: this.counterID,
        ...entity,
      };
      this.Players.push(Player);
      this.increaseID();
      res(Player);
    });
  }
  findById(id: string): Promise<IPlayer> {
    return new Promise((res, rej) => {
      const Player = this.Players.find((Player) => Player._id === id);
      res(Player || null);
    });
  }
  findAll(): Promise<IPlayer[]> {
    return new Promise((res, rej) => {
      const Players = this.Players;
      res(Players);
    });
  }
  update(id: string, entity: IPlayer): Promise<IPlayer> {
    return new Promise((res, rej) => {
      this.findById(id).then((Player) => {
        const Players = this.Players.filter((Player) => Player._id !== id);
        this.Players = Players;
        this.Players.push(entity);
        res(entity);
      });
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      const Players = this.Players.filter((Player) => Player._id !== id);
      this.Players = Players;
      res(true);
    });
  }
}
