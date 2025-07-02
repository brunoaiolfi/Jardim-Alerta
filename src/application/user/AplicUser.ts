import { User } from '../../domain/models/User';
import { ILocalStorageImplementation } from '../../infra/implementations/localstorage/LocalStorage';
import { IAplicUser } from './IAplicUser';

export class AplicUser implements IAplicUser {
    private readonly localStorage: ILocalStorageImplementation<User>;
    private readonly userKey = "@plantmanager:user"

    constructor(localStorage: ILocalStorageImplementation<User>) {
        this.localStorage = localStorage;
    }

    public async saveUser(user: User): Promise<void> {
        this.localStorage.setItem(this.userKey, user);
    }

    public async getUser(): Promise<User | null> {
        return await this.localStorage.getItem(this.userKey);
    }

    public async removeUser(): Promise<void> {
        await this.localStorage.removeItem(this.userKey);
    }
}