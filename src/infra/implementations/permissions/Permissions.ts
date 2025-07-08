import { IPermissionsImplementation } from "./IPermissions";
import { check, Permission, request, RESULTS } from "react-native-permissions"

export class PermissionsImplementation implements IPermissionsImplementation {

    public async askPermission(permission: Permission) {
        const status = await check(permission);

        if (status === RESULTS.GRANTED) return true;
        if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
            const requestResult = await request(permission);
            return requestResult === RESULTS.GRANTED;
        }

        return false;
    }
}