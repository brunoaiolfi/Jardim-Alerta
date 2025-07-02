import { NotificationTrigger } from "../models/NotificationTrigger";

export class ValidateNotificationTriggerUseCase {
    public static validate(trigger: NotificationTrigger): boolean {
        if (!trigger.plantId) {
            throw new Error("A notificação deve estar associada a uma planta.");
        }

        if (!trigger.weekDay || trigger.weekDay.length === 0) {
            throw new Error("A notificação deve ter pelo menos um dia da semana definido.");
        }

        if (!trigger.time || !/^\d{2}:\d{2}$/.test(trigger.time)) {
            throw new Error("O horário da notificação deve estar no formato HH:mm.");
        }

        if (!trigger.triggersId || trigger.triggersId.length === 0) {
            throw new Error("A notificação deve ter pelo menos um ID de trigger definido.");
        }

        return true;
    }
}