
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

export interface IWhenTriggerNotification {
    days: number[];
    hours: number;
    minutes: number;
}