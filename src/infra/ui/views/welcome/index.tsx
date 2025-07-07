import { ButtonComponent } from "../../components/button";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import { getAplicUser } from "../../../../application/user/factory";
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export function Welcome() {

    const aplicUser = getAplicUser();
    const navigation = useNavigation();
    const { saveUser } = useUser();

    async function handleContinue() {
        const user = await aplicUser.getUser();

        if (!!user) {
            saveUser(user);
            navigate("Dashboard");
        } else {
            navigate("UserNameForm");
        }
    }

    function navigate(view: "UserNameForm" | "Dashboard") {
        navigation.navigate(view);
    }

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();

        // Try the new style of google-sign in result, from v13+ of that module
        let idToken = signInResult.data?.idToken;
        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.data?.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

        // Sign-in the user with the credential
        return signInWithCredential(getAuth(), googleCredential);
    }

    return (
        <Styles.Container>
            <TextComponent
                text={`Gerencie \n suas plantas de \n forma fácil`}
                variant={EnumTextVariant.Heading}
            />
            <Styles.Ilustration source={require('../../../assets/imgs/ilustration.png')} />
            <TextComponent
                text={`Não esqueça mais de regar suas \n plantas. Nós cuidamos de lembrar você \n sempre que precisar.`}
                variant={EnumTextVariant.Paragraph}
            />
            <ButtonComponent
                onPress={handleContinue}
                icon={"right"}
            />
            <ButtonComponent
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                text={"Google Sign-In"}
            />
        </Styles.Container>
    );
}