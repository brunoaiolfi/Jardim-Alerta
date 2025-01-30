import { TextComponent } from "../../text"
import { ICardPlants } from "./@types"
import * as Styles from "./styles"

export function CardPlant({ plant }: ICardPlants) {

    // const Image = require(`../../../../assets/svgs/${plant.name}.svg`);
    return (
        <Styles.Container>
            {/* <Image /> */}
            <TextComponent
                text={plant.name}
            />
        </Styles.Container>
    )
}