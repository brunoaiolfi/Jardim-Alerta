import { EnumTextVariant, ITextProps } from "./@types"
import * as Styles from "./styles"

export function TextComponent({ text, textAlign, variant = EnumTextVariant.Paragraph, color, fontSize, fontWeight }: ITextProps) {
    return (
        <Styles.Text
            textAlign={textAlign}
            variant={variant}
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
        >
            {text}
        </Styles.Text>
    )
}