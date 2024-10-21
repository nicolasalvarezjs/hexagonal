import { GroupMemoryRepository } from "./group-memory.repository";
import { ICreateGroup, IGroup } from "../entities/Group";
import { IShortPlayer } from "src/domain/player/entities/Player";

describe("GroupMemoryRepository", () => {
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
  let shortPlayer2: IShortPlayer = {
    _id: "5678",
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
  });

  it("should create a new group with the provided data", async () => {
    const newGroup: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer],
      profile: {
        name: "test",
        picture: "test",
      },
      invitations: [],
    };

    const createdGroup = await groupRepository.create(newGroup);

    expect(createdGroup).toHaveProperty("_id");
    expect(createdGroup.admins).toEqual(["1234"]);
    expect(createdGroup.profile.name).toBe("test");
    expect(createdGroup.profile.picture).toBe("test");
  });

  it("should find a group by ID", async () => {
    const newGroup: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer],
      profile: {
        name: "test",
        picture: "test",
      },
      invitations: [],
    };

    const createdGroup = await groupRepository.create(newGroup);
    const foundGroup = await groupRepository.findById(createdGroup._id);

    expect(foundGroup).toBeTruthy();
    expect(foundGroup._id).toBe(createdGroup._id);
  });

  it("should return null if a group is not found by ID", async () => {
    const group = await groupRepository.findById("non-existent-id");
    expect(group).toBeNull();
  });

  it("should return all groups", async () => {
    const group1: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer],
      profile: {
        name: "Group 1",
        picture: "picture1",
      },
      invitations: [],
    };

    const group2: ICreateGroup = {
      admins: ["5678"],
      matches: [],
      players: [shortPlayer],
      profile: {
        name: "Group 2",
        picture: "picture2",
      },
      invitations: [],
    };

    await groupRepository.create(group1);
    await groupRepository.create(group2);

    const groups = await groupRepository.findAll();
    expect(groups.length).toBe(2);
  });

  it("should return nearby groups", async () => {
    const group1: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer],
      profile: {
        name: "Group 1",
        picture: "picture1",
      },
      invitations: [],
    };

    const group2: ICreateGroup = {
      admins: ["5678"],
      matches: [],
      players: [shortPlayer],
      profile: {
        name: "Group 2",
        picture: "picture2",
      },
      invitations: [],
    };

    await groupRepository.create(group1);
    await groupRepository.create(group2);

    const groups = await groupRepository.findNearby(10, 10, 10);
    expect(groups.length).toBe(2);
  });

  it("should find groups by playerID", async () => {
    const group1: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer, shortPlayer2],
      profile: {
        name: "Group 1",
        picture: "picture1",
      },
      invitations: [],
    };

    const group2: ICreateGroup = {
      admins: ["5678"],
      matches: [],
      players: [shortPlayer, shortPlayer2],
      profile: {
        name: "Group 2",
        picture: "picture2",
      },
      invitations: [],
    };

    await groupRepository.create(group1);
    await groupRepository.create(group2);

    const foundGroups = await groupRepository.findByPlayerID("5678");

    expect(foundGroups.length).toBe(2);
  });

  it("should update a group by ID", async () => {
    const group: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer, shortPlayer2],
      profile: {
        name: "Group 1",
        picture: "picture1",
      },
      invitations: [],
    };

    const createdGroup = await groupRepository.create(group);

    const updatedGroupData: IGroup = {
      _id: createdGroup._id,
      admins: ["1234"],
      matches: [],
      players: [shortPlayer, shortPlayer2],
      profile: {
        name: "Updated Group",
        picture: "updatedPicture",
      },
      invitations: [],
    };

    const updatedGroup = await groupRepository.update(
      createdGroup._id,
      updatedGroupData,
    );

    expect(updatedGroup.profile.name).toBe("Updated Group");
  });

  it("should delete a group by ID", async () => {
    const group: ICreateGroup = {
      admins: ["1234"],
      matches: [],
      players: [shortPlayer, shortPlayer2],
      profile: {
        name: "Group 1",
        picture: "picture1",
      },
      invitations: [],
    };

    const createdGroup = await groupRepository.create(group);

    const deleteResult = await groupRepository.delete(createdGroup._id);
    expect(deleteResult).toBe(true);

    const foundGroup = await groupRepository.findById(createdGroup._id);
    expect(foundGroup).toBeNull();
  });
});
