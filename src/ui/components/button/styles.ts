import styled from "styled-components/native";
import { EnumButtonVariant } from "./@types";

interface ButtonProps {
    isDisabled?: boolean;
    width?: string;
    height?: string;
    variant: EnumButtonVariant;
    padding?: string;
    borderRadius?: string;
}

const dictBackground = {
    [EnumButtonVariant.Primary]: "primary",
    [EnumButtonVariant.Secondary]: "transparent",
    [EnumButtonVariant.Selected]: "greenLight",
}

export const Button = styled.TouchableOpacity<ButtonProps>`
    width: ${({ width }) => width ?? "auto"};
    height: ${({ height }) => height ?? "56px"};

    background: ${({ theme, variant }) => variant == EnumButtonVariant.Transparent ? "transparent" : theme.colors[dictBackground[variant]]};

    flex-direction: row;
    
    justify-content: center;
    align-items: center;

    gap: 12px;

    border-radius: ${({ theme, borderRadius }) => borderRadius ?? theme.borderRadius};

    opacity: ${({ isDisabled }) => isDisabled ? 0.6 : 1};

    padding: ${({ padding }) => padding ?? "0 22px"};
`;