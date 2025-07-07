import { useNavigation, useRoute } from '@react-navigation/native';
import { PlantImage } from '../../../components/plants/image';
import * as Styles from './styles';
import { useEffect, useState } from 'react';
import { getAplicPlants } from '../../../../application/plants/factory';
import { LoadingView } from '../../public/loading';
import AntDesign from "react-native-vector-icons/AntDesign";
import { lightTheme } from '../../../themes/lightTheme';
import { TextComponent } from '../../../components/text';
import { EnumTextVariant } from '../../../components/text/@types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ButtonComponent } from '../../../components/button';
import { EnumButtonVariant } from '../../../components/button/@types';
import * as Yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'react-native';
import { getAplicNotificationTriggers } from '../../../../application/notificationTriggers/factory';
import { NotificationTrigger } from '../../../../infra/database/entities/NotificationTrigger';
import { Plants } from '../../../../infra/database/entities/Plants';

const dictDays = {
    [0]: 'D',
    [1]: 'S',
    [2]: 'T',
    [3]: 'Q',
    [4]: 'Q',
    [5]: 'S',
    [6]: 'S',
}

interface ISavePlant {
    days: number[];
    hours: number;
    minutes: number;
}

const schema = Yup.object().shape({
    days: Yup.array().of(Yup.number()).required("*"),
    hours: Yup.number().required().min(0).max(23),
    minutes: Yup.number().required().min(0).max(59),
})

export function AlarmSave() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const aplicPlant = getAplicPlants();
    const aplicNotificationTriggers = getAplicNotificationTriggers();

    const { control, setValue, handleSubmit, formState: { errors } } = useForm<ISavePlant>({
        resolver: yupResolver(schema),
    })

    const [plant, setPlant] = useState<Plants>()
    const [isLoading, setIsLoading] = useState(true);
    const [datesSelected, setDatesSelected] = useState<number[]>([]);

    useEffect(() => {
        handleGetData(params?.id || -1);
    }, [])

    async function handleGetData(plantId: number) {
        try {
            const plant = await getPlant(plantId);
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

    function handleSelectDate(date: keyof typeof dictDays) {
        const tempDatesSelected = [...datesSelected];

        if (tempDatesSelected.includes(date)) {
            setDatesSelected(tempDatesSelected.filter(d => d !== date));
            setValue('days', tempDatesSelected.filter(d => d !== date));
        } else {
            setDatesSelected([...tempDatesSelected, date]);
            setValue('days', [...tempDatesSelected, date]);
        }
    }

    function handleChangeHours(value: string) {
        if (Number(value) > 23 || value.length > 2) return setValue('hours', 23);
        if (Number(value) < 0) return setValue('hours', 0);

        setValue('hours', Number(value));
    }

    function handleChangeMinutes(value: string) {
        if (Number(value) > 59 || value.length > 2) return setValue('minutes', 59);
        if (Number(value) < 0) return setValue('minutes', 0);

        setValue('minutes', Number(value));
    }

    async function handleSavePlant(values: ISavePlant) {
        try {
            const newNotificationTrigger = new NotificationTrigger();

            newNotificationTrigger.plantId = plant.id;
            newNotificationTrigger.plant = plant;
            newNotificationTrigger.weekDay = values.days;
            newNotificationTrigger.time = `${values.hours.toString().padStart(2, '0')}:${values.minutes.toString().padStart(2, '0')}`;

            await aplicNotificationTriggers.save(newNotificationTrigger);

            Alert.alert("Sucesso!", "Lembrete salvo com sucesso!");
        } catch (error) {
            Alert.alert("Ops!", `Não foi possível salvar o lembrete, tente novamente mais tarde! ${error.message}`);
        }
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

                <Styles.Formulario>
                    <Styles.Info>
                        <TextComponent
                            text="Escolha o melhor horário para ser lembrado:"
                            fontWeight='300'
                            fontSize='14px'
                            color={"#000000"}
                        />
                    </Styles.Info>
                    <Styles.Info>
                        <Styles.Wrapper>
                            {
                                Object.keys(dictDays).map(key =>
                                    <ButtonComponent
                                        onPress={() => handleSelectDate(key)}
                                        text={dictDays[key]}
                                        width={"40px"}
                                        height={"40px"}
                                        variant={datesSelected.find(d => d === key) ? EnumButtonVariant.Primary : EnumButtonVariant.Secondary}
                                        padding={"0px"}
                                        borderRadius='999px'
                                        key={key}
                                    />
                                )
                            }
                            {
                                errors?.days?.message &&
                                <TextComponent
                                    text={errors?.days?.message}
                                    color={"#FF0000"}
                                />
                            }
                        </Styles.Wrapper>
                    </Styles.Info>
                    <Styles.Info>
                        <Styles.Wrapper>
                            <Controller
                                name="hours"
                                control={control}
                                render={({ field: { value } }) => (
                                    <Styles.InputTime
                                        value={value?.toString()}
                                        onChangeText={handleChangeHours}
                                        maxLength={2}
                                        hasError={!!errors?.hours?.message}
                                    />
                                )}
                            />
                            <TextComponent
                                text=':'
                            />
                            <Controller
                                name="minutes"
                                control={control}
                                render={({ field: { value } }) => (
                                    <Styles.InputTime
                                        value={value?.toString()}
                                        onChangeText={handleChangeMinutes}
                                        maxLength={2}
                                        hasError={!!errors?.minutes?.message}
                                    />
                                )}
                            />
                        </Styles.Wrapper>
                    </Styles.Info>
                </Styles.Formulario>

            </Styles.Content>

            <Styles.Footer>
                <ButtonComponent
                    onPress={handleSubmit(handleSavePlant)}
                    text="Salvar lembrete"
                    variant={EnumButtonVariant.Primary}
                />
            </Styles.Footer>
        </Styles.Container>
    )
}