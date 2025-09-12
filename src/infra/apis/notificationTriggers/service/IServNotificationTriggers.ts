import { NotificationTriggerDTO } from "../DTOs/NotificationTriggerDTO";

export interface IServNotificationTriggers {
    createTrigger(dto: NotificationTriggerDTO): Promise<NotificationTriggerDTO>;
    getTriggers(userId: string): Promise<NotificationTriggerDTO[]>;
    updateTrigger(id: string, dto: NotificationTriggerDTO): Promise<NotificationTriggerDTO>;
    deleteTrigger(id: string): Promise<void>;
}