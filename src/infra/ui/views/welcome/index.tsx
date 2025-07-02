import { ButtonComponent } from "../../components/button";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import { getAplicUser } from "../../../../application/user/factory";

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
        </Styles.Container>
    );
}