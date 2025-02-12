import { useNavigation, useRoute } from '@react-navigation/native';
import { PlantImage } from '../../components/plants/image';
import * as Styles from './styles';
import { useEffect, useState } from 'react';
import { Plant } from '../../../domain/models/Plant';
import { getAplicPlants } from '../../../application/applications/plants/factory';
import { LoadingView } from '../loading';
import AntDesign from "react-native-vector-icons/AntDesign";
import { lightTheme } from '../../themes/lightTheme';
import { TextComponent } from '../../components/text';
import { EnumTextVariant } from '../../components/text/@types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function PlantSave() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const aplicPlant = getAplicPlants();

    const [plant, setPlant] = useState<Plant>()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleGetPlant(params?.id || -1);
    }, [])

    async function handleGetPlant(id: number) {
        try {
            const plant = await getPlant(id);
            setPlant(plant[0]);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function getPlant(id: number) {
        return await aplicPlant.get({
            where: {
                id
            },
        });
    }

    if (isLoading) {
        return <LoadingView />
    }

    if (!plant?.id) {
        return <TextComponent text="Planta não encontrada!" variant={EnumTextVariant.Heading} />
    }

    return (
        <Styles.Container>

            <Styles.Header>
                <Styles.ReturnButton
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                >
                    <AntDesign
                        name="left"
                        size={20}
                        color={lightTheme.colors.secondary}
                    />
                </Styles.ReturnButton>
                <PlantImage name={plant?.name || ""} />
            </Styles.Header>
            <Styles.Content>
                <TextComponent
                    text={plant?.name || ""}
                    variant={EnumTextVariant.Subheading}
                />
                <Styles.Info>
                    <TextComponent
                        text={plant?.about || ""}
                    />
                </Styles.Info>
                <Styles.Info>
                    <Styles.WaterContainer>
                        <Styles.WaterIconContainer>
                            <MaterialCommunityIcons name="water" size={40} color="#5DADEC" />
                        </Styles.WaterIconContainer>

                        <Styles.WaterTip>
                            {plant?.waterTips}
                        </Styles.WaterTip>
                    </Styles.WaterContainer>
                </Styles.Info>
                <Styles.Info>
                    <TextComponent
                        text="Escolha o melhor horário para ser lembrado:"
                        fontWeight='300'
                        fontSize='14px'
                        color={"#000000"}
                    />
                </Styles.Info>
            </Styles.Content>
        </Styles.Container>
    )
}