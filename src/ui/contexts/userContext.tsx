import { createContext, ReactNode, useState } from "react";
import { CommonUserDTO } from "../../common/DTOs/CommonUserDTO";

interface IUserProviderProps {
    children: ReactNode
}

interface IUserContext {
    user?: CommonUserDTO;
    saveUser: (user: CommonUserDTO) => void;
}

export const UserContext = createContext({} as IUserContext);

export function UserProvider({ children }: IUserProviderProps) {
    const [user, setUser] = useState<CommonUserDTO>();

    function saveUser(user: CommonUserDTO) {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{ user, saveUser }}>
            {children}
        </UserContext.Provider>
    )
} 