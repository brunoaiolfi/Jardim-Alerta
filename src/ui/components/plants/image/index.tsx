import { IPlantImage } from "./@types";
import * as Styles from "./styles"
export function PlantImage({ name, ...props }: IPlantImage) {
    const images: Record<string, any> = {
        "Aningapara": require('../../../assets/imgs/Aningapara.jpg'),
        "Espada São Jorge": require('../../../assets/imgs/EspadaSaoJorge.jpg'),
        "Frutíferas": require('../../../assets/imgs/Frutíferas.jpg'),
        "Hortênsia": require('../../../assets/imgs/Hortênsia.jpg'),
        "Imbé": require('../../../assets/imgs/Imbé.jpg'),
        "Orquídea": require('../../../assets/imgs/Orquídea.jpg'),
        "Peperomia": require('../../../assets/imgs/Peperomia.jpg'),
        "Violeta": require('../../../assets/imgs/Violeta.jpg'),
        "Yucca": require('../../../assets/imgs/Yucca.jpg'),
        "Zamioculca": require('../../../assets/imgs/Zamioculca.jpg'),
    }


    return <Styles.PlantImage source={images[name]} {...props} />
}