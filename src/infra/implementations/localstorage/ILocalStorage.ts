export interface ILocalStorageImplementation<T> {
    getItem: (key: string) => Promise<T | null>;
    setItem: (key: string, value: T) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}