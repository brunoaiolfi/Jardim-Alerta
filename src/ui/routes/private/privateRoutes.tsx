import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { DashboardRoutes } from "./tabs";
import { AlarmCreate } from "../../views/private/alarms/create";
import { PlantCreate } from "../../views/private/plants/create";

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
                    name="AlarmCreate"
                    component={AlarmCreate}
                />

                <StackRoutes.Screen
                    name="PlantCreate"
                    component={PlantCreate}
                />
            </StackRoutes.Navigator>
        </NavigationContainer>
    )
}