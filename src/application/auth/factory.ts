import { GoogleAuth } from "../../infra/implementations/socialAuth/google/googleAuth";
import { AplicAuth } from "./AplicAuth";
import { IAplicAuth } from "./IAplicAuth";

export function getAplicAuth(): IAplicAuth {
    return new AplicAuth(new GoogleAuth());
}