import { ILocalStorageImplementation, LocalStorageImplementation } from "./LocalStorage";

export class FactoryLocalStorageImplementation {
    static getLocalStorageImplementation<T>(): ILocalStorageImplementation<T> {
        return new LocalStorageImplementation<T>();
    }
}