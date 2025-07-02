import { User } from "../../domain/users/models/User";

export interface IAplicUser {
    getUser: () => Promise<User | null>;
    saveUser: (user: User) => Promise<void>;
    removeUser: () => Promise<void>;
}