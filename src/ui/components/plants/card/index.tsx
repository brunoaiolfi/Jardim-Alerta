import { TextComponent } from "../../text"
import { PlantImage } from "../image"
import { ICardPlants } from "./@types"
import * as Styles from "./styles"

export function CardPlant({ plant, onSelectPlant }: ICardPlants) {
    return (
        <Styles.Container
            activeOpacity={0.7}
            onPress={() => onSelectPlant(plant.id)}
        >
            <PlantImage imageUri={plant.imageUri} />
            <Styles.Footer>
                <TextComponent
                    text={plant.name}
                    color="white"
                />
            </Styles.Footer>
        </Styles.Container>
    )
}