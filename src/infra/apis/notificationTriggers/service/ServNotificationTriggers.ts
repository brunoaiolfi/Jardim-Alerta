import { INotificationTriggersFirebaseStore } from "../../../implementations/firebaseStore/stores/notificationTriggers/INotificationTriggersFirebaseStore";
import { NotificationTriggerDTO } from "../DTOs/NotificationTriggerDTO";
import { IServNotificationTriggers } from "./IServNotificationTriggers";

export class ServNotificationTriggers implements IServNotificationTriggers {
    public constructor(private notificationTriggersStore: INotificationTriggersFirebaseStore) { }

    public async getTriggers(userId: string): Promise<NotificationTriggerDTO[]> {
        const triggers = await this.notificationTriggersStore.read(userId);
        return triggers;
    }

    public async createTrigger(data: NotificationTriggerDTO): Promise<NotificationTriggerDTO> {
        const trigger = await this.notificationTriggersStore.create(data);

        if (trigger.id) {
            data.id = trigger.id;
        }
        
        return data;
    }

    public async updateTrigger(id: string, data: NotificationTriggerDTO): Promise<NotificationTriggerDTO> {
        await this.notificationTriggersStore.update(id, data);
        return data;
    }

    public async deleteTrigger(id: string): Promise<void> {
        await this.notificationTriggersStore.delete(id);
    }

}