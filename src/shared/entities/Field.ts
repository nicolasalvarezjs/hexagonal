import { IAddress } from "./Address";
import { IAvailableHour } from "./AvailableHour";
import { IProfile } from "./Profile";

export interface IField {
  availableHours: IAvailableHour[];
  address: IAddress;
  profile: IProfile;
}
