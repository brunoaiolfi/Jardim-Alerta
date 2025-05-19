import notifee, { AlarmType, AndroidNotificationSetting, RepeatFrequency, TriggerType } from '@notifee/react-native';

export interface INotificationsImplementation {
    createChannel: () => Promise<void>;
    sendNotification: (bodyNotification: IBodyNotification) => Promise<void>;
    createTriggerNotification: (bodyNotification: IBodyNotification, when: IWhenTriggerNotification) => Promise<string[]>;
    deleteTriggerNotification: (id: string) => Promise<void>;
    editTriggerNotification: (id: string, bodyNotification: IBodyNotification, when: IWhenTriggerNotification) => Promise<string[]>;
}

export interface IBodyNotification {
    title: string;
    body: string;
}

interface IWhenTriggerNotification {
    days: number[];
    hours: number;
    minutes: number;
}

export class NotificationsImplementation implements INotificationsImplementation {
    private static instance: NotificationsImplementation;
    private channelId: string = "";

    private constructor() { };

    public static getInstance(): NotificationsImplementation {
        if (!NotificationsImplementation.instance) {
            NotificationsImplementation.instance = new NotificationsImplementation();
        }

        return NotificationsImplementation.instance;
    }

    async createChannel() {
        const settings = await notifee.getNotificationSettings();

        await notifee.requestPermission();

        if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
            await notifee.openAlarmPermissionSettings();
        }

        this.channelId = await notifee.createChannel({
            id: 'jardimAlerta',
            name: 'Jardim alerta',
        });
    }

    async sendNotification({ title, body }: IBodyNotification) {
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId: this.channelId,
            },
        })
    }

    async createTriggerNotification({ title, body }: IBodyNotification, when: IWhenTriggerNotification) {
        const { days, hours, minutes } = when;
        const ids: string[] = [];

        for (const day of days) {
            const id = await notifee.createTriggerNotification({
                title,
                body,
                android: {
                    channelId: this.channelId,
                },
            }, {
                type: TriggerType.TIMESTAMP,
                timestamp: this.getNextAlarmDate(day, hours, minutes).getTime(),
                repeatFrequency: RepeatFrequency.WEEKLY,
                alarmManager: {
                    type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE
                }
            })

            ids.push(id);
        }

        return ids;
    }

    private getNextAlarmDate(dayOfWeek: number, hour: number, minutes: number): Date {
        const now = new Date();
        const currentDay = now.getDay();

        const daysUntil = (dayOfWeek - currentDay + 7) % 7 || 7;

        now.setDate(now.getDate() + daysUntil);
        now.setHours(hour, minutes, 0, 0);

        return now;
    }

    async deleteTriggerNotification(id: string) {
        await notifee.cancelNotification(id);
    }

    async editTriggerNotification(id: string, { title, body }: IBodyNotification, when: IWhenTriggerNotification) {
        const { days, hours, minutes } = when;
        const ids: string[] = [];

        await this.deleteTriggerNotification(id);

        for (const day of days) {
            const newId = await notifee.createTriggerNotification({
                id,                
                title,
                body,
                android: {
                    channelId: this.channelId,
                },
            }, {
                type: TriggerType.TIMESTAMP,
                timestamp: this.getNextAlarmDate(day, hours, minutes).getTime(),
                repeatFrequency: RepeatFrequency.WEEKLY,
                alarmManager: {
                    type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE
                }
            })

            ids.push(newId);
        }

        return ids;
    }
}