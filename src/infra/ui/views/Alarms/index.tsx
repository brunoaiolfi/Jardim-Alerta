import { useEffect, useState } from "react";
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

export function Alarms() {
    const aplicNotificationTriggers = getAplicNotificationTriggers();

    const [notificationTriggers, setNotificationTriggers] = useState<NotificationTrigger[]>([]);

    useEffect(() => {
        handleGetNotificationTriggers();
    }, [])

    async function handleGetNotificationTriggers() {
        try {
            const notificationTriggers = await aplicNotificationTriggers.get({
                relations: ["plant"],
            });
            setNotificationTriggers(notificationTriggers);
        } catch (error: any) {
            Alert.alert("Erro ao buscar alarmes", error.message);
        }
    }

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
                onPress={() => {}}
                variant={EnumButtonVariant.Secondary}
                icon="trash-outline"
                borderRadius="9999px"
            />
            <ButtonComponent
                onPress={() => {}}
                variant={EnumButtonVariant.Secondary}
                icon="edit-outline"
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
            ListHeaderComponent={<TextComponent text="Alarmes" textAlign="center" variant={EnumTextVariant.Heading} fontWeight="bold" />}
        />
    )
}