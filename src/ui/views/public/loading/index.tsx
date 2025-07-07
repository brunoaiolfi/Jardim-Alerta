import { ActivityIndicator } from "react-native";
import * as Styles from "./styles";
import { lightTheme } from "../../../themes/lightTheme";

export function LoadingView() {
    return (
        <Styles.Container>
            <ActivityIndicator size="large" color={lightTheme.colors.primary} />
        </Styles.Container>
    )
}