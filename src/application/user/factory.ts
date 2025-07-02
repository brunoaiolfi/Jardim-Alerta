import { User } from "../../domain/models/User";
import { getLocalStorageImplementation } from "../../infra/implementations/localstorage/factory";
import { AplicUser } from "./AplicUser";

export function getAplicUser() : AplicUser {
    const _localStorageImplementation = getLocalStorageImplementation<User>();
    return new AplicUser(_localStorageImplementation);
}