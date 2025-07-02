import { INotificationsImplementation } from "./INotifications";
import { NotificationsImplementation } from "./Notifications";

export function getNotificationImplementation() : INotificationsImplementation {
    return NotificationsImplementation.getInstance();
}