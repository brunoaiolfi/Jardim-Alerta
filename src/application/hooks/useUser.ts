import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function useUser() {
    return useContext(UserContext);
}