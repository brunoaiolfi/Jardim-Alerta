import AntDesign from "@expo/vector-icons/AntDesign"
import { TextComponent } from "../text"
import { EnumTextVariant } from "../text/@types"
import { IButtonProps } from "./@types"
import * as Styles from "./styles"

export function ButtonComponent({ text, icon, isDisabled, width, onPress }: IButtonProps) {
    return (
        <Styles.Button activeOpacity={0.7} onPress={onPress} width={width} isDisabled={isDisabled}>
            {/* @ts-ignore */}
            {icon && <AntDesign name={icon} size={16} color="#ffff" />}
            
            {text && <TextComponent text={text} variant={EnumTextVariant.Paragraph} color="#ffffff" />}
        </Styles.Button>
    )
}