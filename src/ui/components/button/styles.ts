import styled from "styled-components/native";

interface ButtonProps {
    isDisabled?: boolean;
    width?: string
}

export const Button = styled.TouchableOpacity<ButtonProps>`
    width: ${({ width }) => width ?? "auto"};

    height: 56px;

    background: ${({ theme }) => theme.colors.primary};

    justify-content: center;
    align-items: center;

    border-radius: ${({ theme }) => theme.borderRadius};

    opacity: ${({ isDisabled }) => isDisabled ? 0.6 : 1};

    padding: 0 22px;
`;