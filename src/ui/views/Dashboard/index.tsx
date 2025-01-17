import { useRoute } from "@react-navigation/native";
import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { ButtonComponent } from "../../components/button";
import { useNavigation } from "expo-router";

export function Dashboard() {

    return (
        <Styles.Container>
            <TextComponent
                text={"title"}
                variant={EnumTextVariant.Heading}
            />
        </Styles.Container>
    );
}