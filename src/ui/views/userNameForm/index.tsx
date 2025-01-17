import { useState } from "react";
import { ButtonComponent } from "../../components/button";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import { TextInputComponent } from "../../components/textInput";
import * as Styles from "./styles";
import { AplicUser } from "@/src/application/applications/user";
import { LocalStorageImplementation } from "@/src/infra/implementations/LocalStorage";
import { User } from "@/src/domain/models/User";
import { useNavigation } from "expo-router";
import { useUser } from "@/src/application/hooks/useUser";

export function UserNameForm() {

    const { saveUser } = useUser();
    const navigation = useNavigation();
    const aplicUser = new AplicUser(new LocalStorageImplementation<User>());

    const [name, setName] = useState("");

    const isNameFilled = Boolean(name.length > 0);
    const emoji = isNameFilled ? "😄" : "😀";

    async function handleSaveUserName(name: string) {
        await aplicUser.saveUser({ name });
        saveUser({ name });
        navigateToConfirmation();
    }

    function navigateToConfirmation() {
        navigation.navigate("Confirmation", {
            title: "Prontinho",
            subtitle: "Agora vamos começar a cuidar das suas \n plantinhas com muito cuidado.",
            buttonTitle: "Começar",
            nextScreen: "Dashboard",
            emoji: "😄"
        });
    }

    return (
        <Styles.Container>
            <TextComponent
                text={`${emoji} \n Como podemos \n chamar você?`}
                variant={EnumTextVariant.Heading}
            />

            <TextInputComponent
                placeholder="Digite um nome"
                onChangeText={val => setName(val)}
            />

            <ButtonComponent
                text="Confirmar"
                onPress={() => handleSaveUserName(name)}
                width={"248px"}
                isDisabled={!isNameFilled}
            />
        </Styles.Container>
    );
}