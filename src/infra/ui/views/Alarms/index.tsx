import { useEffect, useState } from "react";
import { getAplicNotificationTriggers } from "../../../../application/applications/notificationTriggers/factory";
import { TextComponent } from "../../components/text";
import { NotificationTrigger } from "../../../database/entities/NotificationTrigger";
import { Alert } from "react-native";
import { EnumTextVariant } from "../../components/text/@types";
import { FlatList } from "react-native";

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

    function getTitle(notificationTrigger: NotificationTrigger) {
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

        return `${plant?.name} - ${daysString} às ${time}`;
    }

    return (
        <FlatList
            data={notificationTriggers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <TextComponent text={getTitle(item)} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
            ListEmptyComponent={<TextComponent text="Nenhum alarme encontrado" textAlign="center" />}
            ListHeaderComponent={<TextComponent text="Alarmes" textAlign="center" variant={EnumTextVariant.Heading} fontWeight="bold" />}
        />
    )
}