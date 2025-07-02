import { User } from "../../domain/models/User";

export interface IAplicUser {
    getUser: () => Promise<User | null>;
    saveUser: (user: User) => Promise<void>;
    removeUser: () => Promise<void>;
}