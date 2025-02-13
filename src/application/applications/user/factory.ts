import { User } from "../../../domain/models/User";
import { getLocalStorageImplementation } from "../../../infra/implementations/localstorage/factory";
import { ILocalStorageImplementation } from "../../../infra/implementations/localstorage/LocalStorage";
import { AplicUser } from "./AplicUser";

const _localStorageImplementation = getLocalStorageImplementation<User>();

export function getAplicUser(storageImplementation: ILocalStorageImplementation<User> = _localStorageImplementation) {
    return new AplicUser(storageImplementation);
}