import { CommonUserDTO } from "../../common/DTOs/CommonUserDTO";
import { Result } from "../../domain/result/model/Result";

export interface IAplicAuth {
    login: () => Promise<Result<CommonUserDTO>>;
    logout: () => Promise<Result<null>>;
    getUser: () => Promise<Result<CommonUserDTO | null>>;
}