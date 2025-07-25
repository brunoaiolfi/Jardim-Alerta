import { NotificationTriggersFirebaseStore } from "../../../implementations/firebaseStore/stores/notificationTriggers/NotificationTriggersFirebaseStore";
import { ServNotificationTriggers } from "./ServNotificationTriggers";

export function getServNotificationTriggers() {
    const notificationTriggersStore = new NotificationTriggersFirebaseStore();
    return new ServNotificationTriggers(notificationTriggersStore);
}