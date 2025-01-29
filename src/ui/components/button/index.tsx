import { TextComponent } from "../text"
import { EnumTextVariant } from "../text/@types"
import { EnumButtonVariant, IButtonProps } from "./@types"
import * as Styles from "./styles"
import AntDesign from "react-native-vector-icons/AntDesign"

export function ButtonComponent({ text, icon, isDisabled, width, height, onPress, variant = EnumButtonVariant.Primary, buttonStyle }: IButtonProps) {
    const dictColor = {
        [EnumButtonVariant.Primary]: "#ffffff",
        [EnumButtonVariant.Secondary]: "#52665A",
        [EnumButtonVariant.Selected]: "#33443a"
    }

    return (
        <Styles.Button activeOpacity={0.7} onPress={onPress} width={width} height={height} isDisabled={isDisabled} variant={variant} style={buttonStyle}>
            {/* @ts-ignore */}
            {icon && <AntDesign name={icon} size={16} color={dictColor[variant]} />}

            {text && <TextComponent text={text} variant={EnumTextVariant.Paragraph} color={dictColor[variant]} />}
        </Styles.Button>
    )
}