import { IMatch } from "src/domain/match/entities/Match";
import { IShortPlayer } from "src/domain/player/entities/Player";
import { IProfile } from "src/shared";
import { IInvitation } from "src/shared/entities/Invitation";
import { ILocation } from "src/shared/entities/Location";

export interface ICreateGroup {
  profile: IProfile;
  players: IShortPlayer[];
  matches: IMatch[];
  admins: string[];
  invitations: IInvitation[];
}
export interface IGroup extends ICreateGroup {
  _id: string;
  location?: ILocation;
}
