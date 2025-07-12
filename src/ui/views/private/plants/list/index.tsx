import { TextComponent } from "../../../../components/text";
import { EnumTextVariant } from "../../../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../../../hooks/useUser";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { getAplicEnvironments } from "../../../../../application/environments/factory";
import { ButtonComponent } from "../../../../components/button";
import { EnumButtonVariant } from "../../../../components/button/@types";
import { CardPlant } from "../../../../components/plants/card";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAplicAuth } from "../../../../../application/auth/factory";
import { Environments } from "../../../../../infra/database/entities/Environments";
import { Plants } from "../../../../../infra/database/entities/Plants";
import { usePlantsByEnvironment } from "../../../../hooks/queries/plants/usePlants";
import { ActivityIndicator, View } from "react-native";

export function PlantsList() {
    const { user, saveUser } = useUser();
    const aplicAuth = getAplicAuth();

    const navigation = useNavigation();

    const aplicEnvironments = getAplicEnvironments();

    const [environments, setEnvironments] = useState<Environments[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState<Environments>();

    // Usando o hook do TanStack Query
    const { data: plantsResult, isLoading, error } = usePlantsByEnvironment(
        environmentSelected?.id
    );

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
        // Não precisa mais chamar handleGetPlantsByEnvironment manualmente
        // O TanStack Query vai fazer isso automaticamente
    }

    async function handleSelectPlant(plant: Plants) {
        navigation.navigate("PlantCreate" as any, {
            plantId: plant.id,
        } as any);
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
        navigation.navigate("PlantCreate" as any);
    }

    // Loading state
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#52665A" />
            </View>
        );
    }

    // Error state
    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextComponent 
                    text="Erro ao carregar plantas" 
                    variant={EnumTextVariant.Heading} 
                />
            </View>
        );
    }

    const plants = plantsResult?.Content || [];

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
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: { item: any }) => (
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
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }: { item: any }) => (
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