export interface ITextProps {
    text: string;
    variant: EnumTextVariant;
    textAlign?: string;
    color?: string;
    fontSize?: string;
}

export enum EnumTextVariant {
    Heading = 1,
    Subheading = 2,
    Paragraph = 3
}
