import { Result } from "../../result/model/Result";
import { NotificationTrigger } from "../models/NotificationTrigger";

export class ValidateNotificationTriggerUseCase {
    public static validate(trigger: NotificationTrigger): Result<boolean> {
        if (!trigger.plantId) {
            return Result.Fail("A notificação deve estar associada a uma planta.");
        }

        if (!trigger.weekDay || trigger.weekDay.length === 0) {
            return Result.Fail("A notificação deve ter pelo menos um dia da semana definido.");
        }

        if (!trigger.time || !/^\d{2}:\d{2}$/.test(trigger.time)) {
            return Result.Fail("O horário da notificação deve estar no formato HH:mm.");
        }

        if (!trigger.triggersId || trigger.triggersId.length === 0) {
            return Result.Fail("A notificação deve ter pelo menos um ID de trigger definido.");
        }

        return Result.Ok(true);
    }
}