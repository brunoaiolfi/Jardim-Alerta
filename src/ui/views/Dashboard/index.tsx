import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../../application/hooks/useUser";
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Environment } from "../../../domain/models/Environment";
import { getAplicEnvironments } from "../../../application/applications/environments/factory";
import { ButtonComponent } from "../../components/button";
import { EnumButtonVariant } from "../../components/button/@types";
import { getAplicPlants } from "../../../application/applications/plants/factory";
import { Plant } from "../../../domain/models/Plant";

export function Dashboard() {
    const { user } = useUser();
    
    const aplicEnvironments = getAplicEnvironments();
    const aplicPlants = getAplicPlants();

    const [environments, setEnvironments] = useState<Environment[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState<Environment>();

    useEffect(() => {
        handleGetEnvironments();
        handleGetPlants();
    }, []);

    async function handleGetEnvironments() {
        try {
            const environments = await getEnvironments();
            setEnvironments(environments);
            handleSelectEnvironment(environments[0]);
        } catch (error: any) {
            Alert.alert("Erro ao buscar ambientes", error.message);
        }
    }

    async function getEnvironments(): Promise<Environment[]> {
        return await aplicEnvironments.get();
    }

    function handleSelectEnvironment(environment: Environment) {
        setEnvironmentSelected(environment);
    }

    async function handleGetPlants() {
        try {
            const plants = await getPlants();
            console.log(plants);
        } catch (error: any) {
            Alert.alert("Erro ao buscar plantas", error.message);
        }
    }
    
    async function getPlants(): Promise<Plant[]> {
        return await aplicPlants.get();
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

            <Styles.EnvironmentsList
                data={environments}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ButtonComponent
                        onPress={() => handleSelectEnvironment(item)}
                        text={item.name}
                        variant={item.id === environmentSelected?.id ? EnumButtonVariant.Selected : EnumButtonVariant.Secondary}
                        height="40px"
                        buttonStyle={{
                            marginRight: 10,
                            marginTop: 10
                        }}
                    />
                )}
            />

        </Styles.Container>
    );
}