import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { ISocialAuth } from "../ISocialAuth";
import { CommonUserDTO } from '../../../../common/DTOs/CommonUserDTO';
import Config from "react-native-config";

export class GoogleAuth implements ISocialAuth {

    constructor() {
        GoogleSignin.configure({
            webClientId: Config.CLIENT_ID_FIREBASE,
        });
    }

    async login(): Promise<CommonUserDTO> {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const { data } = await GoogleSignin.signIn();

        const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

        const userCredential = await auth().signInWithCredential(googleCredential);

        const firebaseUser = userCredential.user;

        const domainUser: CommonUserDTO = {
            name: firebaseUser.displayName ?? 'Usuário',
            id: firebaseUser.uid,
        };

        return domainUser;
    }

    async logout(): Promise<void> {
        try {
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (error) {
            throw new Error(`Could not logout from Google: ${error.message}`);
        }
    }

    async getUser(): Promise<CommonUserDTO | null> {
        const currentUser = auth().currentUser;

        if (!currentUser) {
            return null;
        }

        return {
            id: currentUser.uid,
            name: currentUser.displayName || 'Usuário',
        };
    }
}
