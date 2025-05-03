import { useNavigation, useRoute } from '@react-navigation/native';
import { PlantImage } from '../../components/plants/image';
import * as Styles from './styles';
import { useEffect, useState } from 'react';
import { Plant } from '../../../../domain/models/Plant';
import { getAplicPlants } from '../../../../application/applications/plants/factory';
import { LoadingView } from '../loading';
import AntDesign from "react-native-vector-icons/AntDesign";
import { lightTheme } from '../../themes/lightTheme';
import { TextComponent } from '../../components/text';
import { EnumTextVariant } from '../../components/text/@types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ButtonComponent } from '../../components/button';
import { EnumButtonVariant } from '../../components/button/@types';
import * as Yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import notifee from '@notifee/react-native';
import { getNotificationImplementation } from '../../../implementations/notifications/factory';
import { Alert } from 'react-native';
import { EnumWaterFrequency } from '../../../database/entities/WaterFrequency';
import { getAplicNotificationTriggers } from '../../../../application/applications/notificationTriggers/factory';
import { NotificationTrigger } from '../../../database/entities/NotificationTrigger';

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
    const notificationsImplementation = getNotificationImplementation();

    const { control, setValue, handleSubmit, formState: { errors } } = useForm<ISavePlant>({
        resolver: yupResolver(schema),
    })

    const [plant, setPlant] = useState<Plant>()
    const [currentNotificationTrigger, setCurrentNotificationTrigger] = useState<NotificationTrigger>();
    const [isLoading, setIsLoading] = useState(true);
    const [datesSelected, setDatesSelected] = useState<number[]>([]);

    const dictWaterFrequency = {
        [EnumWaterFrequency.DAY]: "dia",
        [EnumWaterFrequency.WEEK]: "semana",
        [EnumWaterFrequency.MONTH]: "mês",
    }

    useEffect(() => {
        handleGetData(params?.id || -1);
    }, [])

    async function handleGetData(plantId: number) {
        try {
            const plant = await getPlant(plantId);
            const notification = await getNotificationByPlantId(plantId);

            if (notification[0]) {
                setValue('days', notification[0].weekDay);
                setValue('hours', Number(notification[0].time.split(":")[0]));
                setValue('minutes', Number(notification[0].time.split(":")[1]));
                setDatesSelected(notification[0].weekDay);
            }

            setPlant(plant[0]);
            setCurrentNotificationTrigger(notification[0]);
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
            relations: ["water_frequency"]
        });
    }

    async function getNotificationByPlantId(plantId: number) {
        return await aplicNotificationTriggers.get({
            where: {
                plantId
            }
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

            const bodyNotification = {
                title: "Heeey 🌱",
                body: `Está na hora de cuidar da sua ${plant?.name}! Lembre-se ${plant?.waterTips}!`,
            }

            let id: string[] = [];

            if (currentNotificationTrigger?.id) {
                id = await notificationsImplementation.editTriggerNotification(currentNotificationTrigger.id, bodyNotification, values);
            } else {
                id = await notificationsImplementation.createTriggerNotification(bodyNotification, values);
            }

            const newNotificationTrigger = new NotificationTrigger();
            newNotificationTrigger.plantId = plant.id;
            newNotificationTrigger.id = id[0];
            newNotificationTrigger.weekDay = values.days;
            newNotificationTrigger.time = `${values.hours}:${values.minutes}`;

            await aplicNotificationTriggers.save(newNotificationTrigger);

            Alert.alert("Sucesso!", "Lembrete salvo com sucesso!");
        } catch (error) {
            Alert.alert("Ops!", "Não foi possível salvar o lembrete, tente novamente mais tarde!");
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
                    {
                        plant?.water_frequency?.frequency &&
                        <TextComponent
                            text={`Recomendamos regar ${plant?.frequencyTimes} vezes por ${dictWaterFrequency[plant?.water_frequency?.frequency]}!`}
                            fontWeight='300'
                            fontSize='14px'
                            color={"#000000"}
                        />}
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