import styled from "styled-components/native";
import { EnumButtonVariant } from "./@types";

interface ButtonProps {
    isDisabled?: boolean;
    width?: string;
    height?: string;
    variant: EnumButtonVariant;
}

const dictBackground = {
    [EnumButtonVariant.Primary]: "primary",
    [EnumButtonVariant.Secondary]: "transparent",
    [EnumButtonVariant.Selected]: "greenLight",
}

export const Button = styled.TouchableOpacity<ButtonProps>`
    width: ${({ width }) => width ?? "auto"};
    height: ${({ height }) => height ?? "56px"};

    background: ${({ theme, variant }) =>  theme.colors[dictBackground[variant]]};

    justify-content: center;
    align-items: center;

    border-radius: ${({ theme }) => theme.borderRadius};

    opacity: ${({ isDisabled }) => isDisabled ? 0.6 : 1};

    padding: 0 22px;
`;