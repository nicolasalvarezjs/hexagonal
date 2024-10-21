import { IPlayer } from "src/domain/player/entities/Player";
import { IProfile } from "src/shared";
import { IField } from "src/shared/entities/Field";

export interface ICreateUser {
  phone: string;
  isRental: boolean;
}

export interface IUserRental {
  fields: IField[];
  profile: IProfile;
}
export interface IUser extends ICreateUser {
  _id: string;
  playerID?: IPlayer;
  email?: string;
  userRental?: IUserRental | null;
}
