import { createContext, ReactNode, useState } from "react";
import { User } from "../../../domain/users/models/User";

interface IUserProviderProps {
    children: ReactNode
}

interface IUserContext {
    user?: User;
    saveUser: (user: User) => void;
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider({ children }: IUserProviderProps) {
    const [user, setUser] = useState<User>();

    function saveUser(user: User) {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ user, saveUser }}>
            {children}
        </UserContext.Provider>
    )
} 