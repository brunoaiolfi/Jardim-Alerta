import { NotificationTriggerDTO } from "../../../../apis/notificationTriggers/DTOs/NotificationTriggerDTO";
import { BaseFirebaseStore } from "../base/BaseFirebaseStore";
import { INotificationTriggersFirebaseStore } from "./INotificationTriggersFirebaseStore";

export class NotificationTriggersFirebaseStore extends BaseFirebaseStore<NotificationTriggerDTO> implements INotificationTriggersFirebaseStore {
    public constructor() {
        super("notificationTriggers");
    }
}