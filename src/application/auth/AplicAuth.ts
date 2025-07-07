import { CommonUserDTO } from "../../common/DTOs/CommonUserDTO";
import { ISocialAuth } from "../../infra/implementations/socialAuth/ISocialAuth";
import { IAplicAuth } from "./IAplicAuth";

export class AplicAuth implements IAplicAuth {

    private readonly _socialAuth: ISocialAuth;

    constructor(socialAuth: ISocialAuth) {
        this._socialAuth = socialAuth;
    }

    async login(): Promise<CommonUserDTO> {
        return await this._socialAuth.login();
    };

    async logout(): Promise<void> {
        return await this._socialAuth.logout();
    };

    async getUser(): Promise<CommonUserDTO | null> {
        return await this._socialAuth.getUser();
    };
}