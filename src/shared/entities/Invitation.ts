export enum InvitationType {
  SEND = "SEND",
  RECEIVED = "RECEIVED",
}

export interface IInvitation {
  type: InvitationType;
  userID: string;
}
