import { TextComponent } from "../../components/text";
import { EnumTextVariant } from "../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Environment } from "../../../../domain/plants/models/Environment";
import { getAplicEnvironments } from "../../../../application/environments/factory";
import { ButtonComponent } from "../../components/button";
import { EnumButtonVariant } from "../../components/button/@types";
import { getAplicPlants } from "../../../../application/plants/factory";
import { Plant } from "../../../../domain/plants/models/Plant";
import { CardPlant } from "../../components/plants/card";
import { useNavigation } from "@react-navigation/native";

export function MyPlants() {
    const { user } = useUser();
    const navigation = useNavigation();

    const aplicEnvironments = getAplicEnvironments();
    const aplicPlants = getAplicPlants();

    const [environments, setEnvironments] = useState<Environment[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState<Environment>();

    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        handleGetEnvironments();
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
        handleGetPlantsByEnvironment(environment);
    }

    async function handleGetPlantsByEnvironment(environment: Environment) {
        try {
            const { id } = environment;
            const plants = await getPlantsByEnvironment(id);

            setPlants(plants);
        } catch (error: any) {
            Alert.alert("Erro ao buscar plantas", error.message);
        }
    }

    async function getPlantsByEnvironment(environmentId: number): Promise<Plant[]> {
        return await aplicPlants.get({
            relations: ["environments"],
            where: {
                environments: {
                    id: environmentId
                }
            },
            select: {
                name: true,
                id: true,
            }
        });
    }

    async function handleSelectPlant(id: number) {
        navigation.navigate("AlarmSave", {
            id,
        })
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
                        text={`${item.name}`}
                        variant={item.id === environmentSelected?.id ? EnumButtonVariant.Selected : EnumButtonVariant.Secondary}
                        height="40px"
                        buttonStyle={{
                            marginRight: 10,
                        }}
                    />
                )}
            />

            <Styles.PlantsList
                data={plants}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CardPlant
                        plant={item}
                        onSelectPlant={handleSelectPlant}
                    />
                )}
            />
        </Styles.Container>
    );
}