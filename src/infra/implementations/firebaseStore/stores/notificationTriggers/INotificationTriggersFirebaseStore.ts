import { NotificationTriggerDTO } from "../../../../apis/notificationTriggers/DTOs/NotificationTriggerDTO";
import { IBaseFirebaseStore } from "../base/IBaseFirebaseStore";

export interface INotificationTriggersFirebaseStore extends IBaseFirebaseStore<NotificationTriggerDTO> { }