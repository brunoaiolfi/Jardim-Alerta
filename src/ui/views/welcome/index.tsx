import { useNavigation } from "expo-router";
import { ButtonComponent } from "../../components/button";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { AplicUser } from "@/src/application/applications/user";
import { LocalStorageImplementation } from "@/src/infra/implementations/LocalStorage";
import { User } from "@/src/domain/models/User";
import { useUser } from "@/src/application/hooks/useUser";

export function Welcome() {
    
    const aplicUser = new AplicUser(new LocalStorageImplementation<User>());
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
    
    return (
        <Styles.Container>  
            <TextComponent
                text={`Gerencie \n suas plantas de \n forma fácil`}
                variant={EnumTextVariant.Heading}
            />
            <Styles.Ilustration source={require('@/assets/images/ilustration.png')} />
            <TextComponent
                text={`Não esqueça mais de regar suas \n plantas. Nós cuidamos de lembrar você \n sempre que precisar.`}
                variant={EnumTextVariant.Paragraph}
            />
            <ButtonComponent
                onPress={handleContinue}
                icon={"right"}
            />
        </Styles.Container>
    );
}