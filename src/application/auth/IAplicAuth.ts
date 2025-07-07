import { CommonUserDTO } from "../../common/DTOs/CommonUserDTO";

export interface IAplicAuth {
    login: () => Promise<CommonUserDTO>;
    logout: () => Promise<void>;
    getUser: () => Promise<CommonUserDTO | null>;
}