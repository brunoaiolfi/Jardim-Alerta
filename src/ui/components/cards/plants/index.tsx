import { TextComponent } from "../../text"
import { ICardPlants } from "./@types"
import * as Styles from "./styles"

export function CardPlant({ plant }: ICardPlants) {

    const images: Record<string, any> = {
        "Aningapara": require('../../../../assets/imgs/Aningapara.jpg'),
        "Espada São Jorge": require('../../../../assets/imgs/EspadaSaoJorge.jpg'),
        "Frutíferas": require('../../../../assets/imgs/Frutíferas.jpg'),
        "Hortênsia": require('../../../../assets/imgs/Hortênsia.jpg'),
        "Imbé": require('../../../../assets/imgs/Imbé.jpg'),
        "Orquídea": require('../../../../assets/imgs/Orquídea.jpg'),
        "Peperomia": require('../../../../assets/imgs/Peperomia.jpg'),
        "Violeta": require('../../../../assets/imgs/Violeta.jpg'),
        "Yucca": require('../../../../assets/imgs/Yucca.jpg'),
        "Zamioculca": require('../../../../assets/imgs/Zamioculca.jpg'),
    }

    return (
        <Styles.Container>
            <Styles.PlantImage
                source={images[plant.name]}
            />
            <Styles.Footer>
                <TextComponent
                    text={plant.name}
                    color="white"
                />
            </Styles.Footer>
        </Styles.Container>
    )
}