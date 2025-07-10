import { TextComponent } from "../../../../components/text";
import { EnumTextVariant } from "../../../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../../../hooks/useUser";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { getAplicEnvironments } from "../../../../../application/environments/factory";
import { ButtonComponent } from "../../../../components/button";
import { EnumButtonVariant } from "../../../../components/button/@types";
import { getAplicPlants } from "../../../../../application/plants/factory";
import { CardPlant } from "../../../../components/plants/card";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAplicAuth } from "../../../../../application/auth/factory";
import { Environments } from "../../../../../infra/database/entities/Environments";
import { Plants } from "../../../../../infra/database/entities/Plants";

export function PlantsList() {
    const { user, saveUser } = useUser();
    const aplicAuth = getAplicAuth();

    const navigation = useNavigation();

    const aplicEnvironments = getAplicEnvironments();
    const aplicPlants = getAplicPlants();

    const [environments, setEnvironments] = useState<Environments[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState<Environments>();

    const [plants, setPlants] = useState<Plants[]>([]);

    useFocusEffect(
        useCallback(() => {
            handleGetEnvironments();
        }, [])
    );

    async function handleGetEnvironments() {
        try {
            const res = await aplicEnvironments.get();

            if (!res.Success) {
                Alert.alert("Atenção!", `Ocorreu um erro ao recuperar os dados ${res.Message}`)
            }

            setEnvironments(res.Content);
            handleSelectEnvironment(res.Content[0]);
        } catch (error: any) {
            Alert.alert("Erro ao buscar ambientes", error.message);
        }
    }

    function handleSelectEnvironment(environment: Environments) {
        setEnvironmentSelected(environment);
        handleGetPlantsByEnvironment(environment);
    }

    async function handleGetPlantsByEnvironment(environment: Environments) {
        try {
            const { id } = environment;
            const res = await aplicPlants.get({
                relations: ["environments"],
                where: {
                    environments: {
                        id: id
                    }
                }
            });

            if (!res.Success) {
                return Alert.alert("Atenção!", `Ocorreu ao recuperar os dados! ${res.Message}`);
            }

            setPlants(res.Content);
        } catch (error: any) {
            Alert.alert("Erro ao buscar plantas", error.message);
        }
    }

    async function handleSelectPlant(plant: Plants) {
        navigation.navigate("PlantCreate", {
            plantId: plant.id,
        });
    }

    async function handleLogout() {
        try {
            const res = await aplicAuth.logout();

            if (!res.Success) {
                return Alert.alert("Atenção!", `Ocorreu um erro inesperado ${res.Message}`);
            }

            saveUser(null);
        } catch (error: any) {
            Alert.alert("Erro ao desconectar", error.message);
        }
    }

    function handleCreateEnvironment() {

    }

    function handleCreatePlant() {
        navigation.navigate("PlantCreate");
    }

    return (
        <Styles.Container>

            <Styles.Header>
                <Styles.HeaderWrapper>
                    <TextComponent
                        text={"Olá,"}
                        variant={EnumTextVariant.Heading}
                        fontWeight="300"
                    />
                    <TextComponent
                        text={user?.name ?? "Usuário"}
                        variant={EnumTextVariant.Heading}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    />
                </Styles.HeaderWrapper>

                <ButtonComponent
                    onPress={() => handleLogout()}
                    variant={EnumButtonVariant.Transparent}
                    icon="log-out"
                    iconFamily="Feather"
                    iconSize={24}
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
                ListHeaderComponent={() => (
                    <ButtonComponent
                        onPress={handleCreateEnvironment}
                        variant={EnumButtonVariant.Selected}
                        height="40px"
                        icon="plus"
                        buttonStyle={{
                            marginRight: 10,
                        }}
                    />
                )}
            />

            <Styles.PlantsList
                data={plants}
                numColumns={2}
                keyExtractor={(item: Plants) => item.id.toString()}
                renderItem={({ item }: { item: Plants }) => (
                    <CardPlant
                        plant={item}
                        onSelectPlant={handleSelectPlant}
                    />
                )}
                ListFooterComponent={() => (
                    <ButtonComponent
                        onPress={handleCreatePlant}
                        variant={EnumButtonVariant.Selected}
                        height="150px"
                        width="45%"
                        borderRadius="20px"
                        buttonStyle={{
                            margin: 10,
                        }}
                        icon="plus"
                        iconSize={28}
                    />
                )}
            />
        </Styles.Container>
    );
}