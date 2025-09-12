import { INotificationTriggersFirebaseStore } from "./INotificationTriggersFirebaseStore";
import { NotificationTriggersFirebaseStore } from "./NotificationTriggersFirebaseStore";

export function getNotificationTriggersFirebaseStore(): INotificationTriggersFirebaseStore {
    return new NotificationTriggersFirebaseStore();
}