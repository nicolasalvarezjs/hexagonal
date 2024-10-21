import { IRepository } from "../../../shared/repositories/abstract.repository";
import { ICreateUser, IUser } from "../entities/User";

export interface IUserRepository
  extends IRepository<IUser, string, ICreateUser> {
  findByPhone(phone: string): Promise<IUser | null>;
}
