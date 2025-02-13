import notifee from '@notifee/react-native';
export class NotificationsImplementation {
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
        await notifee.requestPermission();
        this.channelId = await notifee.createChannel({
            id: 'jardimAlerta',
            name: 'Jardim alerta',
        });
    }
}