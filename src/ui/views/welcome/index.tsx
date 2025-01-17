import { useNavigation } from "expo-router";
import { ButtonComponent } from "../../components/button";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";

export function Welcome() {
    
    const navigation = useNavigation();
    
    function handleContinue() {
        navigation.navigate("UserNameForm");
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