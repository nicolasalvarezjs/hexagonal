import { ICreateGroup, IGroup } from "../entities/Group";
import { IGroupRepository } from "./group.repository";

export class GroupMemoryRepository implements IGroupRepository {
  Groups: IGroup[] = [];
  counterID: string = "0";

  increaseID() {
    this.counterID = (Number(this.counterID) + 1).toString();
  }

  findByPlayerID(playerID: string): Promise<IGroup[]> {
    return new Promise((res, rej) => {
      const Groups = this.Groups.filter((group) =>
        group.players.find((player) => player._id === playerID),
      );
      res(Groups);
    });
  }

  create(entity: ICreateGroup): Promise<IGroup> {
    return new Promise((res, rej) => {
      const Group: IGroup = {
        _id: this.counterID,
        ...entity,
      };
      this.Groups.push(Group);
      this.increaseID();
      res(Group);
    });
  }
  findById(id: string): Promise<IGroup> {
    return new Promise((res, rej) => {
      const Group = this.Groups.find((Group) => Group._id === id);
      res(Group || null);
    });
  }
  findAll(): Promise<IGroup[]> {
    return new Promise((res, rej) => {
      const Groups = this.Groups;
      res(Groups);
    });
  }
  findNearby(lat: number, lng: number, distance: number): Promise<IGroup[]> {
    return new Promise((res, rej) => {
      const Groups = this.Groups;
      res(Groups);
    });
  }
  update(id: string, entity: IGroup): Promise<IGroup> {
    return new Promise((res, rej) => {
      this.findById(id).then((Group) => {
        const Groups = this.Groups.filter((Group) => Group._id !== id);
        this.Groups = Groups;
        this.Groups.push(entity);
        res(entity);
      });
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      const Groups = this.Groups.filter((Group) => Group._id !== id);
      this.Groups = Groups;
      res(true);
    });
  }
}
