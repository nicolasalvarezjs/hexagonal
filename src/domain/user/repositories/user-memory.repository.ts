import { ICreateUser, IUser } from "../entities/User";
import { IUserRepository } from "./user.repository";

export class UserMemoryRepository implements IUserRepository {
  users: IUser[] = [];
  counterID: string = "0";

  increaseID() {
    this.counterID = (Number(this.counterID) + 1).toString();
  }

  findByPhone(phone: string): Promise<IUser | null> {
    return new Promise((res, rej) => {
      const user = this.users.find((user) => user.phone === phone);
      res(user || null);
    });
  }
  create(entity: ICreateUser): Promise<IUser> {
    return new Promise((res, rej) => {
      const user: IUser = {
        _id: this.counterID,
        phone: entity.phone,
        isRental: entity.isRental,
      };
      this.users.push(user);
      this.increaseID();
      res(user);
    });
  }
  findById(id: string): Promise<IUser> {
    return new Promise((res, rej) => {
      const user = this.users.find((user) => user._id === id);
      res(user || null);
    });
  }
  findAll(): Promise<IUser[]> {
    return new Promise((res, rej) => {
      const users = this.users;
      res(users);
    });
  }
  update(id: string, entity: IUser): Promise<IUser> {
    return new Promise((res, rej) => {
      this.findById(id).then((user) => {
        const users = this.users.filter((user) => user._id !== id);
        this.users = users;
        this.users.push(entity);
        res(entity);
      });
    });
  }
  delete(id: string): Promise<boolean> {
    return new Promise((res, rej) => {
      const users = this.users.filter((user) => user._id !== id);
      this.users = users;
      res(true);
    });
  }
}
