import { CommonUserDTO } from "../../../common/DTOs/CommonUserDTO";

export interface ISocialAuth {
    login: () => Promise<CommonUserDTO>;
    logout: () => Promise<void>;
    getUser: () => Promise<CommonUserDTO | null>;
}