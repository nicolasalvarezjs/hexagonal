import { IAddress } from "src/shared";

export interface ICreateMatch {
  firstTeam: string[];
  secondTeam: string[];
  address: IAddress;
}

export interface IMatch {
  _id: string;
}
