import { Alert } from "react-native";
import { getAplicPlants } from "../../../../application/plants/factory";
import { Plants } from "../../../../infra/database/entities/Plants";
import { Searchfield } from "../../searchfield";
import { PlantSearchfieldProps } from "./@types";
import * as Styles from "./styles"
import { PlantImage } from "../image";
import { TextComponent } from "../../text";
import { EnumTextVariant } from "../../text/@types";
import { ILike } from "typeorm";

export function PlantSearchfield({ IsOpen, OnSelected, OnClose }: PlantSearchfieldProps) {
    const aplicPlants = getAplicPlants();

    async function getPlants(page: number, limit: number, search?: string) {
        return await aplicPlants.get({
            relations: ['environments'],
            take: limit,
            skip: (page - 1) * limit,
            where: {
                name: search ? ILike(`%${search}%`) : undefined
            },
            order: {
                name: {
                    direction: "ASC"
                }
            }
        });
    }

    return <Searchfield<Plants>
        Title="Selecione uma planta"
        IsOpen={IsOpen}
        OnList={getPlants}
        OnSelect={OnSelected}
        OnClose={OnClose}
        RenderItem={(item: Plants) => (
            <Styles.PlantButton style={{ padding: 12 }}>
                <PlantImage imageUri={item.imageUri}
                    width="64px"
                    height="64px"
                    borderRadius={8}
                />
                <Styles.ColumnWrapper>
                    <TextComponent text={item.name} variant={EnumTextVariant.Heading} fontSize={"22px"} />
                    <TextComponent text={item.environments.map(e => e.name).join(" - ").toString()} textAlign="start" />
                </Styles.ColumnWrapper>
            </Styles.PlantButton>
        )}
    />
}