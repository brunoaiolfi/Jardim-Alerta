import styled from "styled-components/native";
import { EnumTextVariant } from "./@types";

interface IProps {
    variant: EnumTextVariant;
    color?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
}

const TextColor = {
    [EnumTextVariant.Heading]: "textHeading",
    [EnumTextVariant.Subheading]: "textSubheading",
    [EnumTextVariant.Paragraph]: "textParagraph",
}

const FontSize = {
    [EnumTextVariant.Heading]: "large",
    [EnumTextVariant.Subheading]: "medium",
    [EnumTextVariant.Paragraph]: "small",
}

const FontWeight = {
    [EnumTextVariant.Heading]: "bold",
    [EnumTextVariant.Subheading]: "bold",
    [EnumTextVariant.Paragraph]: "400",
}

export const Text = styled.Text<IProps>`
    font-size: ${({ theme, variant, fontSize }) => fontSize ?? theme.fontSize[FontSize[variant]]};
    color: ${({ theme, variant, color }) => color ?? theme.colors[TextColor[variant]]};
    font-weight: ${({ variant, fontWeight }) => fontWeight ?? FontWeight[variant]};
    text-align: ${({ textAlign }) => textAlign ?? "center"};
    flex-wrap: wrap;
`;