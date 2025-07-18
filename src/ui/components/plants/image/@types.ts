export interface IPlantImage {
    imageUri: string;

    width?: string;
    height?: string;

    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";

    position?: "absolute" | "relative" | "fixed";
}