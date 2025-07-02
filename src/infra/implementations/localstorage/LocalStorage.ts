import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILocalStorageImplementation } from './ILocalStorage';

export class LocalStorageImplementation<T> implements ILocalStorageImplementation<T> {
    async getItem(key: string): Promise<T | null> {
        const response = await AsyncStorage.getItem(key);

        if (!response || response === null) return null;
        return JSON.parse(response);
    }

    async setItem(key: string, value: T): Promise<void> {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }

    async removeItem(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }
}