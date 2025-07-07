import { ActivityIndicator } from "react-native"
import { TextComponent } from "../text"
import { EnumTextVariant } from "../text/@types"
import { EnumButtonVariant, IButtonProps } from "./@types"
import * as Styles from "./styles"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"

export function ButtonComponent({ text, icon, isDisabled, width, height, onPress, variant = EnumButtonVariant.Primary, buttonStyle, padding, borderRadius, iconColor, iconFamily = "AntDesign", iconSize, isLoading }: IButtonProps) {
    const dictColor = {
        [EnumButtonVariant.Primary]: "#ffffff",
        [EnumButtonVariant.Secondary]: "#52665A",
        [EnumButtonVariant.Selected]: "#33443a",
        [EnumButtonVariant.Transparent]: "#52665A",
    }

    const dictIconFamily = {
        "AntDesign": <AntDesign name={icon} size={iconSize ?? 16} color={iconColor ?? dictColor[variant]} />,
        "Feather": <Feather name={icon} size={iconSize ?? 16} color={iconColor ?? dictColor[variant]} />,
    }

    return (
        <Styles.Button activeOpacity={0.7} onPress={onPress} width={width} height={height} isDisabled={isDisabled || isLoading} variant={variant} padding={padding} borderRadius={borderRadius} style={buttonStyle}>
            {!isLoading && icon && dictIconFamily[iconFamily]}
            {!isLoading && text && <TextComponent text={text} variant={EnumTextVariant.Paragraph} color={dictColor[variant]} />}
            {isLoading && <ActivityIndicator size="small" color={dictColor[variant]} />}
        </Styles.Button>
    )
}