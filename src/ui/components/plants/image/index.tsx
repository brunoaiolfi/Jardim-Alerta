import { IPlantImage } from "./@types";
import * as Styles from "./styles"
export function PlantImage({ imageUri, ...props }: IPlantImage) {
    return <Styles.PlantImage source={{ uri: imageUri }} {...props} />
}