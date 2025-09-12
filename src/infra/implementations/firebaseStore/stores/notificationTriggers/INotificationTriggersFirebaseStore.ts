import { NotificationTriggerDTO } from "../../../../apis/notificationTriggers/DTOs/NotificationTriggerDTO";
import { IBaseFirebaseStoreImplementation } from "../base/IBaseFirebaseStore";

export interface INotificationTriggersFirebaseStore extends IBaseFirebaseStoreImplementation<NotificationTriggerDTO> { }