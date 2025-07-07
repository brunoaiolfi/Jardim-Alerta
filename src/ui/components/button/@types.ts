import { StyleProp, ViewStyle } from "react-native";

export enum EnumButtonVariant {
    Primary = 1,
    Secondary = 2,
    Selected = 3,
    Transparent = 4
}

export interface IButtonProps {
    text?: string;
    icon?: string;
    onPress: (prop: any) => any;
    width?: string;
    height?: string;
    isDisabled?: boolean;
    variant?: EnumButtonVariant;
    buttonStyle?: StyleProp<ViewStyle>;
    padding?: string;
    borderRadius?: string;
    iconFamily?: "AntDesign" | "Feather";
    iconSize?: number;
    iconColor?: string;
    isLoading?: boolean;
}