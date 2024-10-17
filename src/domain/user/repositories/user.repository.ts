import { IRepository } from "../../../shared/repositories/abstract.repository";
import { IUser } from "../entities/User";

export interface IUserRepository extends IRepository<IUser, string> {
  findByPhone(phone: string): Promise<IUser>;
}
