import styled from "styled-components/native";
import { IPlantImage } from "./@types";

export const PlantImage = styled.Image<Omit<IPlantImage, "name">>`
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "100%"};
    
    resize-mode: ${({ resizeMode }) => resizeMode || "cover"};
    position: ${({ position }) => position || "relative"};

    border-width: ${({ borderWidth }) => borderWidth ? `${borderWidth}px` : "0px"};
    border-color: ${({ borderColor }) => borderColor || "transparent"};
    border-style: solid;

    border-radius: ${({ borderRadius }) => borderRadius ? `${borderRadius}px` : "0px"};
`;