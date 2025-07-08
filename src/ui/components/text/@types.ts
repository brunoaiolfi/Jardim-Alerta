import { TextProps } from "react-native";

export interface ITextProps extends TextProps{
    text: string;
    variant?: EnumTextVariant;
    textAlign?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
}

export enum EnumTextVariant {
    Heading = 1,
    Subheading = 2,
    Paragraph = 3
}
