import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../../application/hooks/useUser";

export function Dashboard() {
    const { user } = useUser();

    return (
        <Styles.Container>

            <Styles.Header>
                <TextComponent
                    text={"Olá,"}
                    variant={EnumTextVariant.Heading}
                    fontWeight="300"
                />
                <TextComponent
                    text={user?.name ?? "Usuário"}
                    variant={EnumTextVariant.Heading}
                />
            </Styles.Header>

            <Styles.Subheading>
                <TextComponent 
                    text={`Em qual ambiente`}
                    variant={EnumTextVariant.Paragraph}
                    textAlign="left"
                    fontWeight="600"
                />
                <TextComponent 
                    text={`você quer colocar sua planta?`}
                    variant={EnumTextVariant.Paragraph}
                    textAlign="left"
                />
            </Styles.Subheading>
        </Styles.Container>
    );
}