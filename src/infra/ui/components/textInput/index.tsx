import { ITextInputProps } from "./@types"
import * as Styles from "./styles"

export function TextInputComponent({ placeholder, width, ...props }: ITextInputProps) {
    return (
        <Styles.TexInput
            width={width}
            placeholder={placeholder}
            {...props}
        />
    )
}