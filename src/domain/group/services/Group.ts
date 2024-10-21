import { IProfile } from "src/shared";
import { ICreateGroup } from "../entities/Group";
import { IGroupRepository } from "../repositories/group.repository";
import { IShortPlayer } from "src/domain/player/entities/Player";

export class GroupService {
  constructor(private groupRepository: IGroupRepository) {}

  create(player: IShortPlayer, profile: IProfile) {
    const newGroup: ICreateGroup = {
      admins: [player._id],
      players: [player],
      matches: [],
      profile,
      invitations: [],
    };
    return this.groupRepository.create(newGroup);
  }

  async joinGroup(playerIDToAdd: IShortPlayer, groupID: string) {
    const group = await this.groupRepository.findById(groupID);
    group.players.push(playerIDToAdd);
    return this.groupRepository.update(groupID, group);
  }

  async addAdmin(playerIDToAdd: string, groupID: string) {
    const group = await this.groupRepository.findById(groupID);
    group.admins.push(playerIDToAdd);
    return this.groupRepository.update(groupID, group);
  }

  async removePlayerToGroup(groupID: string, playerIDToRemove: string) {
    const group = await this.groupRepository.findById(groupID);
    group.players = group.players.filter(
      (player) => player._id !== playerIDToRemove,
    );
    return this.groupRepository.update(groupID, group);
  }

  async removeAdminToGroup(groupID: string, playerIDToRemove) {
    const group = await this.groupRepository.findById(groupID);
    group.admins = group.admins.filter((admin) => admin !== playerIDToRemove);
    return this.groupRepository.update(groupID, group);
  }

  findNearby(lat: number, lng: number, distance: number) {
    return this.groupRepository.findNearby(lat, lng, distance);
  }

  findByPlayerID(playerID: string) {
    return this.groupRepository.findByPlayerID(playerID);
  }
}
