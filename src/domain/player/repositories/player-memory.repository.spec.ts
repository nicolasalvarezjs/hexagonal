import { PlayerMemoryRepository } from "./player-memory.repository";
import { ICreatePlayer, IPlayer } from "../entities/Player";

describe("PlayerMemoryRepository", () => {
  let playerRepository: PlayerMemoryRepository;

  beforeEach(() => {
    playerRepository = new PlayerMemoryRepository();
  });

  it("should create a player", async () => {
    const playerNew: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const createdPlayer = await playerRepository.create(playerNew);

    expect(createdPlayer).toHaveProperty("_id");
    expect(createdPlayer.generalRating).toEqual(playerNew.generalRating);
    expect(createdPlayer.groups).toEqual(playerNew.groups);
    expect(createdPlayer.ratings).toEqual(playerNew.ratings);
    expect(createdPlayer.score).toEqual(playerNew.score);
  });

  it("should find player by id", async () => {
    const playerNew: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const createdPlayer = await playerRepository.create(playerNew);
    const foundPlayer = await playerRepository.findById(createdPlayer._id);

    expect(foundPlayer).not.toBeNull();
    expect(foundPlayer?._id).toBe(createdPlayer._id);
  });

  it("should return null if player not found by id", async () => {
    const foundPlayer = await playerRepository.findById("nonexistentid");
    expect(foundPlayer).toBeNull();
  });

  it("should find all players", async () => {
    const player1: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const player2: ICreatePlayer = {
      generalRating: {
        def: 1,
        dribble: 1,
        shot: 1,
        speed: 1,
        team: 1,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 1,
        matches: 1,
        wins: 1,
      },
    };

    await playerRepository.create(player1);
    await playerRepository.create(player2);

    const players = await playerRepository.findAll();
    expect(players.length).toBe(2);
  });

  it("should find nearby players", async () => {
    const player1: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const player2: ICreatePlayer = {
      generalRating: {
        def: 1,
        dribble: 1,
        shot: 1,
        speed: 1,
        team: 1,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 1,
        matches: 1,
        wins: 1,
      },
    };

    await playerRepository.create(player1);
    await playerRepository.create(player2);

    const players = await playerRepository.findNearby(10, 10, 10);
    expect(players.length).toBe(2);
  });

  it("should update a player", async () => {
    const playerNew: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const createdPlayer = await playerRepository.create(playerNew);

    const updatedPlayer: IPlayer = {
      _id: createdPlayer._id,
      generalRating: {
        def: 5,
        dribble: 5,
        shot: 5,
        speed: 5,
        team: 5,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 5,
        matches: 5,
        wins: 5,
      },
    };

    const result = await playerRepository.update(
      createdPlayer._id,
      updatedPlayer,
    );

    expect(result.generalRating).toEqual(updatedPlayer.generalRating);
    expect(result.score).toEqual(updatedPlayer.score);
  });

  it("should delete a player", async () => {
    const playerNew: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const createdPlayer = await playerRepository.create(playerNew);
    const result = await playerRepository.delete(createdPlayer._id);

    expect(result).toBe(true);

    const foundPlayer = await playerRepository.findById(createdPlayer._id);
    expect(foundPlayer).toBeNull();
  });

  it("should increase the ID when a player is created", async () => {
    const playerNew1: ICreatePlayer = {
      generalRating: {
        def: 0,
        dribble: 0,
        shot: 0,
        speed: 0,
        team: 0,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 0,
        matches: 0,
        wins: 0,
      },
    };

    const playerNew2: ICreatePlayer = {
      generalRating: {
        def: 1,
        dribble: 1,
        shot: 1,
        speed: 1,
        team: 1,
      },
      groups: [],
      ratings: [],
      score: {
        losses: 1,
        matches: 1,
        wins: 1,
      },
    };

    await playerRepository.create(playerNew1);
    await playerRepository.create(playerNew2);

    expect(Number(playerRepository.counterID)).toBe(2);
  });
});
