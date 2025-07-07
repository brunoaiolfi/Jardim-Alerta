import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardRoutes } from "./tabs";
import { AlarmSave } from "../../views/private/alarmSave";

const StackRoutes = createStackNavigator();

export function PrivateRoutes() {
    return (
        <NavigationContainer>
            <StackRoutes.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <StackRoutes.Screen
                    name="Dashboard"
                    component={DashboardRoutes}
                />

                <StackRoutes.Screen
                    name="AlarmSave"
                    component={AlarmSave}
                />
            </StackRoutes.Navigator>
        </NavigationContainer>
    )
}