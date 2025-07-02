import { ILocalStorageImplementation } from "./ILocalStorage";
import { LocalStorageImplementation } from "./LocalStorage";

export function getLocalStorageImplementation<T>(): ILocalStorageImplementation<T> {
    return new LocalStorageImplementation<T>();
}