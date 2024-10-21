import { UserMemoryRepository } from "./user-memory.repository";
import { IUser, ICreateUser } from "../entities/User";

describe("UserMemoryRepository", () => {
  let userRepository: UserMemoryRepository;

  beforeEach(() => {
    userRepository = new UserMemoryRepository();
  });

  it("should create a user", async () => {
    const newUser: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    const createdUser = await userRepository.create(newUser);

    expect(createdUser).toHaveProperty("_id");
    expect(createdUser.phone).toBe(newUser.phone);
    expect(createdUser.isRental).toBe(newUser.isRental);
  });

  it("should find a user by phone", async () => {
    const newUser: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    await userRepository.create(newUser);

    const foundUser = await userRepository.findByPhone("123456789");
    expect(foundUser).not.toBeNull();
    expect(foundUser?.phone).toBe("123456789");
  });

  it("should return null if user not found by phone", async () => {
    const foundUser = await userRepository.findByPhone("nonexistentphone");
    expect(foundUser).toBeNull();
  });

  it("should find all users", async () => {
    const user1: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    const user2: ICreateUser = {
      phone: "987654321",
      isRental: true,
    };
    await userRepository.create(user1);
    await userRepository.create(user2);

    const users = await userRepository.findAll();
    expect(users.length).toBe(2);
  });

  it("should find user by id", async () => {
    const newUser: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    const createdUser = await userRepository.create(newUser);

    const foundUser = await userRepository.findById(createdUser._id);
    expect(foundUser).not.toBeNull();
    expect(foundUser?._id).toBe(createdUser._id);
  });

  it("should return null if user not found by id", async () => {
    const foundUser = await userRepository.findById("nonexistentid");
    expect(foundUser).toBeNull();
  });

  it("should update a user", async () => {
    const newUser: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    const createdUser = await userRepository.create(newUser);

    const updatedUser: IUser = {
      _id: createdUser._id,
      phone: "123456789",
      isRental: true,
    };
    const result = await userRepository.update(createdUser._id, updatedUser);

    expect(result.isRental).toBe(true);
  });

  it("should delete a user", async () => {
    const newUser: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    const createdUser = await userRepository.create(newUser);

    const result = await userRepository.delete(createdUser._id);
    expect(result).toBe(true);

    const foundUser = await userRepository.findById(createdUser._id);
    expect(foundUser).toBeNull();
  });

  it("should increase the ID when a user is created", async () => {
    const newUser1: ICreateUser = {
      phone: "123456789",
      isRental: false,
    };
    await userRepository.create(newUser1);

    const newUser2: ICreateUser = {
      phone: "987654321",
      isRental: true,
    };
    await userRepository.create(newUser2);

    expect(Number(userRepository.counterID)).toBe(2);
  });
});
