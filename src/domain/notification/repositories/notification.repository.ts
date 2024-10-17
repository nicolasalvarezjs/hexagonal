import { IRepository } from "../../../shared/repositories/abstract.repository";
import { INotification } from "../entities/Notification";

export interface INotificationRepository
  extends IRepository<INotification, string> {}
