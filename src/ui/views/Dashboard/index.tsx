import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../../application/hooks/useUser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Environment } from "../../../domain/models/Environment";
import { getAplicEnvironments } from "../../../application/applications/environments/factory";

export function Dashboard() {
    const { user } = useUser();
    const aplicEnvironments = getAplicEnvironments();
    const [environments, setEnvironments] = useState<Environment[]>([]);

    useEffect(() => {
        handleGetEnvironments();
    }, []);

    async function handleGetEnvironments() {
        try {
            const environments = await getEnvironments();
            setEnvironments(environments);
        } catch (error: any) {
            Alert.alert("Erro ao buscar ambientes", error.message);
        }
    }

    async function getEnvironments(): Promise<Environment[]> {
        return await aplicEnvironments.get();
    }

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