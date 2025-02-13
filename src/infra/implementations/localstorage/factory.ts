import { ILocalStorageImplementation, LocalStorageImplementation } from "./LocalStorage";

export function getLocalStorageImplementation<T>(): ILocalStorageImplementation<T> {
    return new LocalStorageImplementation<T>();
}