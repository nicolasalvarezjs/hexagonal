import { IRepository } from "../../../shared/repositories/abstract.repository";
import { IChannel } from "../entities/Channel";

export interface IChannelRepository extends IRepository<IChannel, string> {}
