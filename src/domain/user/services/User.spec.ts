import { UserMemoryRepository } from "../repositories/user-memory.repository";
import { IUserRepository } from "../repositories/user.repository";
import { UserService } from "./User";

describe("User service test", () => {
  let userRepository: IUserRepository = new UserMemoryRepository();
  let userService: UserService = new UserService(userRepository, {
    sendCode: (phone: string) => Promise.resolve(true),
    verify: (phone, code) => Promise.resolve(true),
  });
  let phone = "1234";

  beforeAll(() => {
    userRepository.create({ phone, isRental: false }).then();
  });

  test("Create user", async () => {
    const phone = "12345";
    const user = await userService.create(phone, false);
    const userFound = await userService.findByID(user._id);
    expect(user._id).toBe(userFound._id);
    expect(user.phone).toBe(userFound.phone);
  });

  test("Find by phone", async () => {
    const user = await userService.findByPhone(phone);
    expect(user).toBeTruthy();
    expect(user.phone).toBe(phone);
  });

  test("Send code", async () => {
    const codeIsSent = await userService.sendCode(phone);
    expect(codeIsSent).toBeTruthy();
  });

  test("Check code", async () => {
    const codeIsCorrect = await userService.verifyCode(phone, "1234");
    expect(codeIsCorrect).toBeTruthy();
  });
});
