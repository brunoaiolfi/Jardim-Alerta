import { Alert } from "react-native";
import { getAplicAuth } from "../../../../application/auth/factory";
import { ButtonComponent } from "../../../components/button";
import { TextComponent } from "../../../components/text";
import { EnumTextVariant } from "../../../components/text/@types";
import * as Styles from "./styles";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";

export function Login() {

    const AplicAuth = getAplicAuth();
    const { saveUser } = useUser();

    const [isLoading, setIsLoading] = useState(false);

    async function handleLoginWithGoogle() {
        try {
            setIsLoading(true);
            const user = await AplicAuth.login();
            saveUser(user);
        } catch (error) {
            Alert.alert("Ocorreu um erro ao tentar fazer login", `Por favor, tente novamente mais tarde.`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Styles.Container>
            <TextComponent
                text={`Gerencie \n suas plantas de \n forma fácil`}
                variant={EnumTextVariant.Heading}
            />
            <Styles.Ilustration source={require('../../../assets/imgs/ilustration.png')} />

            <ButtonComponent
                onPress={() => handleLoginWithGoogle()}
                icon={"google"}
                iconSize={22}
                text="|   Continuar com o Google"
                width="300px"
                isDisabled={isLoading}
                isLoading={isLoading}
            />

        </Styles.Container>
    );
}