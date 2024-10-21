import { GroupService } from "./Group";
import { GroupMemoryRepository } from "../repositories/group-memory.repository";
import { IProfile } from "src/shared";
import { IShortPlayer } from "src/domain/player/entities/Player";

describe("GroupService", () => {
  let groupService: GroupService;
  let groupRepository: GroupMemoryRepository;
  let shortPlayer: IShortPlayer = {
    _id: "1234",
    score: {
      wins: 0,
      losses: 0,
      matches: 0,
    },
    generalRating: {
      speed: 0,
      shot: 0,
      team: 0,
      dribble: 0,
      def: 0,
    },
    ratings: [],
  };

  beforeEach(() => {
    groupRepository = new GroupMemoryRepository();
    groupService = new GroupService(groupRepository);
  });

  it("should create a new group with the provided player ID and profile", async () => {
    const playerID = "1234";
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };

    const createdGroup = await groupService.create(shortPlayer, profile);

    expect(createdGroup).toHaveProperty("_id");
    expect(createdGroup.admins).toEqual([playerID]);
    expect(createdGroup.profile.name).toBe("Test Group");
    expect(createdGroup.profile.picture).toBe("test-picture");
  });

  it("should add a new admin to the group", async () => {
    const playerID = "1234";
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };

    const createdGroup = await groupService.create(shortPlayer, profile);
    const playerIDToAdd = "5678";

    const updatedGroup = await groupService.addAdmin(
      playerIDToAdd,
      createdGroup._id,
    );

    expect(updatedGroup.admins).toContain(playerIDToAdd);
  });

  it("should add a new player to the group", async () => {
    const playerID = "1234";
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };

    const createdGroup = await groupService.create(shortPlayer, profile);
    const playerIDToAdd = "5678";

    const updatedGroup = await groupService.joinGroup(
      { ...shortPlayer, _id: playerIDToAdd },
      createdGroup._id,
    );

    expect(updatedGroup.players.length).toBe(2);
    expect(updatedGroup.players[1]._id).toBe(playerIDToAdd);
  });

  it("should remove a player from the group", async () => {
    const playerID = "1234";
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };

    const createdGroup = await groupService.create(shortPlayer, profile);
    const playerIDToAdd = "5678";
    await groupService.addAdmin(playerIDToAdd, createdGroup._id);

    const updatedGroup = await groupService.removePlayerToGroup(
      createdGroup._id,
      playerIDToAdd,
    );

    expect(updatedGroup.players).not.toContain(playerIDToAdd);
  });

  it("should remove an admin from the group", async () => {
    const playerID = "1234";
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };

    const createdGroup = await groupService.create(shortPlayer, profile);
    const playerIDToAdd = "5678";
    await groupService.addAdmin(playerIDToAdd, createdGroup._id);

    const updatedGroup = await groupService.removeAdminToGroup(
      createdGroup._id,
      playerIDToAdd,
    );

    expect(updatedGroup.admins).not.toContain(playerIDToAdd);
  });

  it("should find nearby groups", async () => {
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };
    const profile2: IProfile = {
      name: "Test Group2",
      picture: "test-picture",
    };
    await groupService.create(shortPlayer, profile);
    await groupService.create(shortPlayer, profile2);

    const players = await groupService.findNearby(10, 10, 10);

    expect(players.length).toBe(2);
  });

  it("should find groups by playerID", async () => {
    const profile: IProfile = {
      name: "Test Group",
      picture: "test-picture",
    };
    const profile2: IProfile = {
      name: "Test Group2",
      picture: "test-picture",
    };
    await groupService.create(shortPlayer, profile);
    await groupService.create(shortPlayer, profile2);

    const players = await groupService.findByPlayerID(shortPlayer._id);

    expect(players.length).toBe(2);
  });
});
