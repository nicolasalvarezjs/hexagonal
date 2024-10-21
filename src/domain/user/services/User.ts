import { IUser } from "../entities/User";
import { IUserRepository } from "../repositories/user.repository";
import { VerificationService } from "./Verification";

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private verificationService?: VerificationService,
  ) {}

  create(phone: string, isRental: boolean) {
    return this.userRepository.create({ phone, isRental });
  }
  findByPhone(phone: string): Promise<IUser | null> {
    return this.userRepository.findByPhone(phone);
  }
  findByID(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }
  sendCode(phone: string) {
    return this.verificationService.sendCode(phone);
  }
  verifyCode(phone: string, code: string) {
    return this.verificationService.verify(phone, code);
  }
}
