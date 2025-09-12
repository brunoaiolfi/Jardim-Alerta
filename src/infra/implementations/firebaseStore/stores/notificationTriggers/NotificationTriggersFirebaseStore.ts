import { NotificationTriggerDTO } from "../../../../apis/notificationTriggers/DTOs/NotificationTriggerDTO";
import { BaseFirebaseStoreImplementation } from "../base/BaseFirebaseStore";
import { INotificationTriggersFirebaseStore } from "./INotificationTriggersFirebaseStore";

export class NotificationTriggersFirebaseStore extends BaseFirebaseStoreImplementation<NotificationTriggerDTO> implements INotificationTriggersFirebaseStore {
    public constructor() {
        super("NotificationTriggers");
    }
}