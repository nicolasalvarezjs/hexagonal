import { IUserRepository } from "src/domain/user/repositories/user.repository";
import { UserService } from "src/domain/user/services/User";

export class CreateUserCase {
  private userService: UserService;

  constructor(userRepository: IUserRepository) {
    this.userService = new UserService(userRepository);
  }

  execute(phone: string, isRental: boolean) {
    return this.userService.create(phone, isRental);
  }
}
