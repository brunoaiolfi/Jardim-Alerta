import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ILocalStorageImplementation<T> {
    getItem: (key: string) => Promise<T | null>;
    setItem: (key: string, value: T) => Promise<void>;
}

export class LocalStorageImplementation<T> implements ILocalStorageImplementation<T> {
    async getItem(key: string): Promise<T | null> {
        const response = await AsyncStorage.getItem(key);

        if (!response || response === null) return null;
        return JSON.parse(response);
    }

    async setItem(key: string, value: T): Promise<void> {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
}