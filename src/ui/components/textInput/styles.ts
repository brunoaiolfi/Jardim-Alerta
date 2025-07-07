import styled from "styled-components/native";

interface TextInputProps {
    width?: string;
}

export const TexInput = styled.TextInput<TextInputProps>`
    width: ${({ width }) => width ?? "auto"};
    min-width: 263px;

    border: ${({ theme }) => `0px solid ${theme.colors.borderColor}`}; 
    border-bottom-width: 1px;

    text-align: center;

    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.colors.textParagraph};
`;