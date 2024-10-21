import { PlayerService } from "./Player";
import { PlayerMemoryRepository } from "../repositories/player-memory.repository";
import { IRating, IRatingTo } from "src/shared";

describe("PlayerService", () => {
  let playerService: PlayerService;
  let playerRepository: PlayerMemoryRepository;

  beforeEach(() => {
    playerRepository = new PlayerMemoryRepository();
    playerService = new PlayerService(playerRepository);
  });

  it("should create a new player with default values", async () => {
    const createdPlayer = await playerService.create();

    expect(createdPlayer).toHaveProperty("_id");
    expect(createdPlayer.generalRating).toEqual({
      def: 0,
      dribble: 0,
      shot: 0,
      speed: 0,
      team: 0,
    });
    expect(createdPlayer.groups).toEqual([]);
    expect(createdPlayer.ratings).toEqual([]);
    expect(createdPlayer.score).toEqual({
      losses: 0,
      matches: 0,
      wins: 0,
    });
  });

  it("should find nearby players", async () => {
    await playerService.create();
    await playerService.create();

    const players = await playerService.findNearby(10, 10, 10);

    expect(players.length).toBe(2);
  });

  it("should add a rating to another player", async () => {
    const player1 = await playerService.create();
    const player2 = await playerService.create();

    const rating: IRating = {
      def: 3,
      dribble: 4,
      shot: 5,
      speed: 2,
      team: 3,
    };

    await playerService.ratingTo(player1._id, player2._id, rating);

    const updatedPlayer2 = await playerRepository.findById(player2._id);

    expect(updatedPlayer2.ratings.length).toBe(1);
    const newRating: IRatingTo = updatedPlayer2.ratings[0];

    expect(newRating.playerID).toBe(player1._id);
    expect(newRating.rating).toEqual(rating);
  });

  it("should update the player when rating is added", async () => {
    const player1 = await playerService.create();
    const player2 = await playerService.create();

    const rating: IRating = {
      def: 2,
      dribble: 3,
      shot: 1,
      speed: 4,
      team: 5,
    };

    await playerService.ratingTo(player1._id, player2._id, rating);

    const updatedPlayer2 = await playerRepository.findById(player2._id);

    expect(updatedPlayer2.ratings.length).toBe(1);
    expect(updatedPlayer2.ratings[0].rating).toEqual(rating);
  });
});
