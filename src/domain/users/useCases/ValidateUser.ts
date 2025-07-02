import { User } from "../models/User";

export class ValidateUserUseCase {
    public static validate(user: User): boolean {
        if (!user || !user?.name.trim()) {
            throw new Error("Nome de usuário inválido.");
        }

        return true;
    }
}