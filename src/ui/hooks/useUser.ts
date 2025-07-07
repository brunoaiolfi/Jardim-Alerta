import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export function useUser() {
    return useContext(UserContext);
}