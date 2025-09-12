import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { PendingMethod, PendingRequests } from "../../../../infra/database/entities/PendingRequests";
import { getPendingRequestsAplic } from "../../../../application/pendingRequests/factory";
import { TextComponent } from "../../../components/text";
import { useFocusEffect } from "@react-navigation/native";
import { ButtonComponent } from "../../../components/button";


export function PendingRequestsTestScreen() {
    const [pendingRequests, setPendingRequests] = useState<PendingRequests[]>([])

    const aplic = getPendingRequestsAplic();

    useFocusEffect(
        useCallback(() => {
            getAll()
        }, [])
    )

    async function getAll() {
        const data = await aplic.get({
            order: {
                createdAt: "ASC"
            }
        });
        setPendingRequests(data?.Content ?? [])
    }

    async function sincPendingRequests() {
        const result = await aplic.SyncPendingRequests();
        console.log("Result")
        console.log(result)
    }

    const PendingMethodTitles: Record<PendingMethod, string> = {
        [PendingMethod.CreatePlant]: 'Criar Planta',
        [PendingMethod.EditPlant]: 'Editar Planta',

        [PendingMethod.CreateNotificationTrigger]: 'Criar Gatilho de Notificação',
        [PendingMethod.DeleteNotificationTrigger]: 'Excluir Gatilho de Notificação',
    };

    return (
        <>
            <FlatList
                data={pendingRequests}
                renderItem={(item) => {

                    return <>
                        <TextComponent
                            text={PendingMethodTitles[item.item.method]}
                        />
                         <TextComponent
                            text={item.item.createdAt.toString()}
                        />
                    </>
                }}
            />
            <ButtonComponent
                onPress={sincPendingRequests}
                text="Sincronizar"
            />
        </>
    )
}