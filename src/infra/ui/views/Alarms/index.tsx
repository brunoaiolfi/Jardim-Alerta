import { useCallback, useState } from "react";
import { getAplicNotificationTriggers } from "../../../../application/applications/notificationTriggers/factory";
import { TextComponent } from "../../components/text";
import { NotificationTrigger } from "../../../database/entities/NotificationTrigger";
import { Alert } from "react-native";
import { EnumTextVariant } from "../../components/text/@types";
import { FlatList } from "react-native";
import * as Styles from "./styles";
import { PlantImage } from "../../components/plants/image";
import { lightTheme } from "../../themes/lightTheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ButtonComponent } from "../../components/button";
import { EnumButtonVariant } from "../../components/button/@types";
import { useFocusEffect } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

export function Alarms() {

    const aplicNotificationTriggers = getAplicNotificationTriggers();

    const [notificationTriggers, setNotificationTriggers] = useState<NotificationTrigger[]>([]);

    const handleGetNotificationTriggers = useCallback(async () => {
        try {
            const notificationTriggers = await aplicNotificationTriggers.get({
                relations: ["plant"],
            });
            setNotificationTriggers(notificationTriggers);
        } catch (error: any) {
            Alert.alert("Erro ao buscar alarmes", error.message);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        handleGetNotificationTriggers();
    }, [handleGetNotificationTriggers]));

    function renderAlarme(notificationTrigger: NotificationTrigger) {
        const { weekDay, time, plant } = notificationTrigger;

        const daysString = weekDay.map((day) => {
            switch (Number(day)) {
                case 0: return "Domingo";
                case 1: return "Segunda-feira";
                case 2: return "Terça-feira";
                case 3: return "Quarta-feira";
                case 4: return "Quinta-feira";
                case 5: return "Sexta-feira";
                case 6: return "Sábado";
            }
        }).join(", ");

        function handleDeleteAlarm(notificationTrigger: NotificationTrigger) {
            Alert.alert(
                "Deletar alarme",
                "Você tem certeza que deseja deletar esse alarme?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                    {
                        text: "Deletar",
                        style: "destructive",
                        onPress: () => deleteAlarm(notificationTrigger),
                    },
                ]
            );
        }

        async function deleteAlarm(notificationTrigger: NotificationTrigger) {
            try {
                await aplicNotificationTriggers.delete(notificationTrigger);
                const triggers = [...notificationTriggers].filter((trigger) => trigger.id !== notificationTrigger.id);
                setNotificationTriggers(triggers);
            } catch (error: any) {
                Alert.alert("Erro ao deletar alarme", error.message);
            }
        }


        return <Styles.NotificationCard>
            <PlantImage
                name={notificationTrigger.plant.name}
                width="64px"
                height="64px"
                borderRadius={9999}
                borderWidth={1}
                borderColor={lightTheme.colors.borderColor}

            />
            <Styles.AlarmInfos>
                <TextComponent
                    text={plant.name}
                    textAlign="left"
                    variant={EnumTextVariant.Paragraph}
                    fontSize="22px"
                    color={lightTheme.colors.secondary}
                />
                <TextComponent
                    text={daysString}
                    textAlign="left"
                    variant={EnumTextVariant.Paragraph}
                    fontSize="14px"
                />
                <Styles.AlarmInfoFooter>
                    <Ionicons name="water-outline" size={22} color={lightTheme.colors.tint} />
                    <TextComponent
                        text={`às ${time}`}
                        textAlign="left"
                        variant={EnumTextVariant.Paragraph}
                        fontSize="14px"
                        color={lightTheme.colors.tint}
                    />
                </Styles.AlarmInfoFooter>
            </Styles.AlarmInfos>
            <ButtonComponent
                onPress={() => handleDeleteAlarm(notificationTrigger)}
                width="48px"
                height="48px"
                padding="0px"
                variant={EnumButtonVariant.Transparent}
                icon="trash-2"
                iconFamily="Feather"
                iconColor={lightTheme.colors.danger}
                borderRadius="9999px"
            />
        </Styles.NotificationCard>
    }

    return (
        <FlatList
            data={notificationTriggers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(not) => renderAlarme(not.item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
            ListEmptyComponent={<TextComponent text="Nenhum alarme encontrado" textAlign="center" />}
            ListHeaderComponent={() =>
                <Styles.Header>
                    <Feather name="bell" size={24} color={lightTheme.colors.textHeading} />
                    <TextComponent text="Alarmes" textAlign="left" variant={EnumTextVariant.Heading} fontWeight="bold" />
                </Styles.Header>
            }
        />
    )
}