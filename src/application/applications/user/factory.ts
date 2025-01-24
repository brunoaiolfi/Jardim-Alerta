import { User } from "../../../domain/models/User";
import { FactoryLocalStorageImplementation } from "../../../infra/implementations/localstorage/factory";
import { ILocalStorageImplementation } from "../../../infra/implementations/localstorage/LocalStorage";
import { AplicUser } from "./AplicUser";

const _localStorageImplementation = FactoryLocalStorageImplementation.getLocalStorageImplementation<User>();

export function getAplicUser(storageImplementation: ILocalStorageImplementation<User> = _localStorageImplementation) {
    return new AplicUser(storageImplementation);
}