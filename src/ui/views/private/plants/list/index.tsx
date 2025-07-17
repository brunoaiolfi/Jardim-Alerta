import { TextComponent } from "../../../../components/text";
import { EnumTextVariant } from "../../../../components/text/@types";
import * as Styles from "./styles";
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ButtonComponent } from "../../../../components/button";
import { EnumButtonVariant } from "../../../../components/button/@types";
import { CardPlant } from "../../../../components/plants/card";
import { useNavigation } from "@react-navigation/native";
import { getAplicAuth } from "../../../../../application/auth/factory";
import { Environments } from "../../../../../infra/database/entities/Environments";
import { Plants } from "../../../../../infra/database/entities/Plants";
import { usePlantsByEnvironmentQuery } from "../../../../hooks/queries/plants/usePlantsByEnvironmentQuery";
import { View } from "react-native";
import { useEnvironmentsQuery } from "../../../../hooks/queries/environments/useEnvironmentsQuery";
import { lightTheme } from "../../../../themes/lightTheme";

export function PlantsList() {
    
    const { user, saveUser } = useUser();
    const aplicAuth = getAplicAuth();

    const navigation = useNavigation();

    const [environmentSelected, setEnvironmentSelected] = useState<Environments>();

    const { data: plantsResult, isLoading: isLoadingPlants, error: plantsError } = usePlantsByEnvironmentQuery(
        environmentSelected?.id
    );

    const { data: environmentsResult, isLoading: isLoadingEnvironments, error: environmentsError } = useEnvironmentsQuery();

    useEffect(() => {
        if (environmentsResult?.Content.length > 0) {
            handleSelectEnvironment(environmentsResult.Content[0]);
        }
    }, [environmentsResult])

    function handleSelectEnvironment(environment: Environments) {
        setEnvironmentSelected(environment);
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

    async function handleSelectPlant(plant: Plants) {
        navigation.navigate("PlantCreate", {
            plantId: plant.id,
        });
    }

    function handleCreatePlant() {
        navigation.navigate("PlantCreate");
    }

    if (plantsError || environmentsError) {
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
    const environments = environmentsResult?.Content || [];

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

            {
                isLoadingEnvironments && (
                    <Styles.LoadingEnvironments>
                        <ActivityIndicator size="small" color={lightTheme.colors.primary} />
                    </Styles.LoadingEnvironments>
                )
            }

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

            {
                isLoadingPlants && (
                    <Styles.LoadingEnvironments>
                        <ActivityIndicator size="small" color={lightTheme.colors.primary} />
                    </Styles.LoadingEnvironments>
                )
            }

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
                ListFooterComponent={() => !isLoadingPlants && (
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