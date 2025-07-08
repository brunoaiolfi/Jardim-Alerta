import { Permission } from "react-native-permissions";

export interface IPermissionsImplementation {
    askPermission: (permission: Permission) => Promise<boolean>
}