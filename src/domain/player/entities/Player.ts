import { IGroup } from "src/domain/group/entities/Group";
import { IAddress, IScore, IProfile, IRating, IRatingTo } from "src/shared";

export interface ICreatePlayer {
  groups: IGroup[];
  score: IScore;
  generalRating: IRating;
  ratings: IRatingTo[];
}

export interface IShortPlayer {
  _id: string;
  score: IScore;
  generalRating: IRating;
  ratings: IRatingTo[];
  profile?: IProfile;
  address?: IAddress;
}

export interface IPlayer extends ICreatePlayer {
  _id: string;
  profile?: IProfile;
  address?: IAddress;
}
