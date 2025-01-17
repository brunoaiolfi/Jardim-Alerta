import { ITextProps } from "./@types"
import * as Styles from "./styles"

export function TextComponent({ text, textAlign, variant, color, fontSize, fontWeight }: ITextProps) {
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