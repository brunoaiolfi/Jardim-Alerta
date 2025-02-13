import { useNavigation, useRoute } from "@react-navigation/native";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { ButtonComponent } from "../../components/button";

interface ConfirmationProps {
    title: string;
    subtitle: string;
    buttonTitle: string;
    emoji: string;
    nextScreen: string;
}

export function Confirmation() {
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        nextScreen,
        emoji
    } = routes.params as ConfirmationProps;

    const navigation = useNavigation();

    function handleContinue() {
        navigation.navigate(nextScreen);
    }

    return (
        <Styles.Container>

            <TextComponent
                text={emoji}
                variant={EnumTextVariant.Heading}
                fontSize="96px"
            />

            <Styles.TextWrapper>
                <TextComponent
                    text={title}
                    variant={EnumTextVariant.Heading}
                />
                <TextComponent
                    text={subtitle}
                    variant={EnumTextVariant.Paragraph}
                />
            </Styles.TextWrapper>

            <ButtonComponent
                text={buttonTitle}
                onPress={handleContinue}
                width="248px"
            />
        </Styles.Container>
    );
}