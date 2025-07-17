import { CommonUserDTO } from "../../common/DTOs/CommonUserDTO";
import { Result } from "../../domain/result/model/Result";
import { ISocialAuth } from "../../infra/implementations/socialAuth/ISocialAuth";
import { IAplicAuth } from "./IAplicAuth";

export class AplicAuth implements IAplicAuth {

    private readonly _socialAuth: ISocialAuth;

    constructor(socialAuth: ISocialAuth) {
        this._socialAuth = socialAuth;
    }

    async login(): Promise<Result<CommonUserDTO>> {
        try {

            const content = await this._socialAuth.login();
            return Result.Ok(content);
        } catch (e) {
            return Result.Fail(e.message)
        }
    };

    async logout(): Promise<Result<null>> {
        try {
            await this._socialAuth.logout();
            return Result.Ok(null);
        } catch (e) {
            return Result.Fail(e.message)
        }
    };

    async getUser(): Promise<Result<CommonUserDTO | null>> {
        try {
            const content = await this._socialAuth.getUser();
            return Result.Ok(content)
        } catch (e) {
            return Result.Fail(e.message)
        }
    };
}