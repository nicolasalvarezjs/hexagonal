import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IPlayer } from 'src/domain/player/entities/Player';
import { IUser, IUserRental } from 'src/domain/user/entities/User';
import { IAddress, IProfile } from 'src/shared';
import { IAvailableHour } from 'src/shared/entities/AvailableHour';
import { IField } from 'src/shared/entities/Field';
import { ILocation } from 'src/shared/entities/Location';

@Schema()
export class LocationSchema implements ILocation {
  @Prop({ type: String })
  type: string;

  @Prop({ type: [Number] })
  coordinates: number[];
}

@Schema()
export class AddressSchema implements IAddress {
  @Prop({ type: String })
  street: string;
  @Prop({ type: LocationSchema })
  location: ILocation;
}

@Schema()
export class AvailableHourSchema implements IAvailableHour {
  @Prop({ type: String })
  day: string;

  @Prop({ type: String })
  hours: string;

  @Prop({ type: Boolean, default: false })
  available: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Player' })
  playerID: string;
}

@Schema()
export class ProfileSchema implements IProfile {
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  picture: string;
}

@Schema()
export class FieldSchema implements IField {
  @Prop({ type: [AvailableHourSchema] })
  availableHours: IAvailableHour[];
  @Prop({ type: AddressSchema })
  address: IAddress;
  @Prop({ type: ProfileSchema })
  profile: IProfile;
}

@Schema()
export class UserRentalSchema implements IUserRental {
  @Prop({ type: [FieldSchema] })
  fields: IField[];
  @Prop({ type: ProfileSchema })
  profile: IProfile;
}

@Schema()
export class UserSchema implements IUser {
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Player' })
  playerID?: IPlayer;

  @Prop()
  email?: string;

  @Prop({ type: UserRentalSchema })
  userRental?: IUserRental;

  @Prop({ type: String, unique: true })
  phone: string;

  @Prop({ type: Boolean })
  isRental: boolean;
}
